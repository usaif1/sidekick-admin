import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// Define your updated data type
export type ScooterData = {
  id: string;
  registration_number: string;
  is_active: boolean;
};

const columnHelper = createColumnHelper<ScooterData>();

// Define columns for scooter data based on actual data fields
const scooterColumns: ColumnDef<ScooterData, any>[] = [
  columnHelper.accessor("registration_number", {
    header: () => (
      <div className="flex items-center">
        Scooter
        {/* Add sorting icons if needed */}
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("is_active", {
    header: "Active",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  }),
  // Optionally, you can display the id if needed:
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
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
