import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useLazyQuery } from "@apollo/client";
import { FETCH_RECENT_RIDES } from "@/graphql/queries/fetchRecentRides";
import modalStore from "@/globalStore/modalStore";
import ScooterDetailsModal from "@/modules/scooters/components/ScooterDetailsModal";
import { scooterService } from "@/modules/scooters/service/scooterService";
import { getOrgIdFromClaims } from "@/utils/claims";

// Update the type to include rides with user details and add id and imei
export type ScooterData = {
  battery: string;
  registration_number: string;
  is_active: boolean;
  id: string;
  imei: string;
  ride_details: {
    user: {
      full_name: string;
    };
  }[];
};

const columnHelper = createColumnHelper<ScooterData>();

// Define columns based on the updated type
const scooterColumns: ColumnDef<ScooterData, any>[] = [
  columnHelper.accessor("registration_number", {
    header: () => <div className="flex items-center">Scooter</div>,
    cell: (info) => info.getValue(),
  }),
  // New column: display user full name from the first ride
  columnHelper.accessor((row) => row.ride_details?.[0]?.user?.full_name, {
    id: "name", // a unique id for the accessor column
    header: "Rider",
    cell: (info) => info.getValue() || "NA",
  }),
  // Optionally display the id column
  columnHelper.accessor("battery", {
    header: "Battery",
    cell: () => <p>NA</p>,
  }),
  // New column: Scooter details button with no header
  columnHelper.display({
    id: "scooter_details",
    header: "",
    cell: ({ row }) => (
      <ViewButton rowData={row.original} />
    ),
  }),
];

interface ScooterTableProps {
  scooters: ScooterData[];
}

// Extract button component to have access to hooks
const ViewButton: React.FC<{ rowData: ScooterData }> = ({ rowData }) => {
  const { openModal } = modalStore();
  
  const [fetchRecentRides] = useLazyQuery(FETCH_RECENT_RIDES, {
    fetchPolicy: "network-only",
    onCompleted: async (data) => {
      console.log("data", data);
      const response = await scooterService.getScooterDetails(
        data?.scooters[0]?.imei
      );
      console.log("response", response);

      if (response) {
        openModal(() => (
          <ScooterDetailsModal data={data} extraData={response.data} />
        ));
      } else {
        openModal(() => <ScooterDetailsModal data={data} />);
      }
    },
    onError: (err) => {
      console.error("Error fetching user ride data:", err);
    },
  });

  const handleViewClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const orgId = await getOrgIdFromClaims();

    if (rowData.id) {
      fetchRecentRides({
        variables: { scooterId: rowData.id, organization_id: orgId },
      });
    }
  };

  return (
    <button
      className="bg-blue-500 text-white font-bold px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
      onClick={handleViewClick}
    >
      View
    </button>
  );
};

const ScooterTable: React.FC<ScooterTableProps> = ({ scooters }) => {
  return (
    <Table<ScooterData>
      data={scooters}
      columns={scooterColumns}
      title="Currently Active Scooters"
    />
  );
};

export default ScooterTable;
