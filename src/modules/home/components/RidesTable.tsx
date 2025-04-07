import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// Define your data type for rides
type RideData = {
  s_no: number;
  scooter: string;
  duration: string;
  user: string;
  status: string;
};

const columnHelper = createColumnHelper<RideData>();

// Define columns for ride data
const rideColumns: ColumnDef<RideData, any>[] = [
  columnHelper.accessor("s_no", {
    header: () => (
      <div className="flex items-center">
        S.No.
        {/* Sorting icon can be added here */}
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("scooter", {
    header: "Scooter",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("duration", {
    header: "Duration",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("user", {
    header: "User",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
];

const rideData: RideData[] = [
  {
    s_no: 1,
    scooter: "Scooter A",
    duration: "15 mins",
    user: "John Doe",
    status: "Active",
  },
  {
    s_no: 2,
    scooter: "Scooter B",
    duration: "20 mins",
    user: "Jane Smith",
    status: "Completed",
  },
  {
    s_no: 3,
    scooter: "Scooter C",
    duration: "10 mins",
    user: "Alice Johnson",
    status: "Active",
  },
  {
    s_no: 4,
    scooter: "Scooter D",
    duration: "25 mins",
    user: "Bob Brown",
    status: "Cancelled",
  },
  {
    s_no: 5,
    scooter: "Scooter E",
    duration: "30 mins",
    user: "Charlie White",
    status: "Active",
  },
];

const RideTable: React.FC = () => {
  return (
    <Table<RideData>
      data={rideData}
      columns={rideColumns}
      title="Today's Rides"
    />
  );
};

export default RideTable;
