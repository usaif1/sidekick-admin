import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useLazyQuery } from "@apollo/client";
import { FETCH_RECENT_RIDES } from "@/graphql/queries/fetchRecentRides";
import modalStore from "@/globalStore/modalStore";
import ScooterDetailsModal from "./ScooterDetailsModal";
import { DateTime } from "luxon";
import { scooterService } from "../service/scooterService";
import { getOrgIdFromClaims } from "@/utils/claims";

type ScootersData = {
  s_no: number;
  scooter_reg_no: string;
  scooter_id: string;
  // battery_status: string;
  last_ride_ended: string;
  last_used_by: string;
  last_charge: number;
  current_status: string;
  imei: string;
};

const columnHelper = createColumnHelper<ScootersData>();

// Define columns for transaction data
const scooterColumns: ColumnDef<ScootersData, any>[] = [
  columnHelper.accessor("s_no", {
    header: () => (
      <div className="">
        S.No.
        {/* Add sorting icons if needed */}
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("scooter_reg_no", {
    header: "Scooter ID",
    cell: (info) => info.getValue(),
  }),
  // columnHelper.accessor("battery_status", {
  //   header: "Battery Status",
  //   cell: (info) => info.getValue(),
  // }),
  columnHelper.accessor("last_ride_ended", {
    header: "Last Ride Ended",
    cell: (info) => {
      const value = info.getValue();
      if (!value || value === "-") return "-";

      try {
        return DateTime.fromISO(value).toFormat("dd-MM-yyyy");
      } catch (error) {
        console.log("error", error);
        return value; // Return original value if parsing fails
      }
    },
  }),
  columnHelper.accessor("last_used_by", {
    header: "Last Used By",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_charge", {
    header: "Last Charge",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("current_status", {
    header: "Current Status",
    cell: (info) => info.getValue(),
  }),
];

interface ScootersTableProps {
  scooters: any[];
}

const ScooterTable: React.FC<ScootersTableProps> = ({ scooters }) => {
  const { openModal } = modalStore();
  const scootersData: ScootersData[] = scooters?.map((scooter, index) => ({
    s_no: index + 1,
    scooter_reg_no: scooter?.registration_number,
    scooter_id: scooter?.id,
    battery_status: scooter.battery_status ?? "XXXX",
    last_ride_ended: scooter.ride_details[0]?.ride_steps[0]?.updated_at ?? "-",
    last_used_by: scooter.ride_details[0]?.user?.full_name ?? "NA",
    last_charge: scooter.last_charge ?? "-",
    current_status: scooter.status,
    imei: scooter.imei,
  }));

  const [fetchRecentRides] = useLazyQuery(FETCH_RECENT_RIDES, {
    fetchPolicy: "network-only",
    onCompleted: async (data) => {
      console.log("data", data);
      const response = await scooterService.getScooterDetails(
        data?.scooters[0]?.imei
      );
      // const response = await scooterService.toggleScooter(data.imei, true);
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

  const handleRowClick = async (rowData: ScootersData) => {
    const orgId = await getOrgIdFromClaims();

    if (rowData.scooter_id) {
      fetchRecentRides({
        variables: { scooterId: rowData.scooter_id, organization_id: orgId },
      });
    }
  };
  return (
    <Table<ScootersData>
      data={scootersData}
      columns={scooterColumns}
      pageSize={10}
      onRowClick={handleRowClick}
    />
  );
};

export default ScooterTable;
