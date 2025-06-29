import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// Update the type to include rides with user details
export type ScooterData = {
  battery: string;
  registration_number: string;
  is_active: boolean;
  rides: {
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
  columnHelper.accessor((row) => row.rides?.[0]?.user?.full_name, {
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
    cell: () => (
      <button
        className="bg-blue-500 text-white font-bold px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          // Add your click handler logic here
        }}
      >
        View
      </button>
    ),
  }),
];

interface ScooterTableProps {
  scooters: ScooterData[];
}

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
