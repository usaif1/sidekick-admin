import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// Define your data type
type ScooterData = {
  scooter: number;
  rider: string;
  battery: string;
};

const columnHelper = createColumnHelper<ScooterData>();

// Define columns for scooter data
const scooterColumns: ColumnDef<ScooterData, any>[] = [
  columnHelper.accessor("scooter", {
    header: () => (
      <div className="flex items-center">
        Scooter
        {/* Add sorting icons if needed */}
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("rider", {
    header: "Rider",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("battery", {
    header: "Battery",
    cell: (info) => info.getValue(),
  }),
];

// Example data
const scooterData: ScooterData[] = [
  { scooter: 1, rider: "xxxxx", battery: "xxxxx" },
  { scooter: 2, rider: "xxxxx", battery: "xxxxx" },
  { scooter: 3, rider: "xxxxx", battery: "xxxxx" },
  { scooter: 4, rider: "xxxxx", battery: "xxxxx" },
  { scooter: 5, rider: "xxxxx", battery: "xxxxx" },
];

const ScooterTable: React.FC = () => {
  return (
    <Table<ScooterData>
      data={scooterData}
      columns={scooterColumns}
      title="Currently Active Scooters"
    />
  );
};

export default ScooterTable;
