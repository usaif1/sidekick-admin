import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

type ScootersData = {
  s_no: number;
  scooter_id: string;
  battery_status: string;
  last_ride_ended: string;
  last_used_by: string;
  last_charge: number;
  current_status: string;
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
  columnHelper.accessor("scooter_id", {
    header: "Scooter ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("battery_status", {
    header: "Battery Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_ride_ended", {
    header: "Last Ride Ended",
    cell: (info) => info.getValue(),
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
  console.log(scooters);
  const scootersData: ScootersData[] = scooters?.map((scooter, index) => ({
    s_no: index + 1,
    scooter_id: scooter.id,
    battery_status: scooter.battery_status ?? "XXXX",
    last_ride_ended: scooter.rides[0]?.ride_steps[0]?.updated_at ?? "-",
    last_used_by: scooter.rides[0]?.user?.full_name ?? "NA",
    last_charge: scooter.last_charge ?? "-",
    current_status: scooter.status
  }))
  return (
    <Table<ScootersData>
      data={scootersData}
      columns={scooterColumns}
      pageSize={10}
    />
  );
};

export default ScooterTable;
