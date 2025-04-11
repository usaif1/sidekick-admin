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

const rideColumns: ColumnDef<RideData, any>[] = [
  columnHelper.accessor("s_no", {
    header: () => <div className="flex items-center">S.No.</div>,
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

interface RideTableProps {
  rides: any[]; // ideally type this better based on your schema
}

const RideTable: React.FC<RideTableProps> = ({ rides }) => {
  const rideData: RideData[] = rides.map((ride, index) => ({
    s_no: index + 1,
    scooter: ride.scooter?.registration_number ?? "N/A",
    duration: getDuration(ride.start_time, ride.end_time),
    user: ride.user?.full_name ?? "N/A",
    status: ride.scooter?.status ?? "Unknown",
  }));

  return (
    <Table<RideData>
      data={rideData}
      columns={rideColumns}
      title="Today's Rides"
    />
  );
};

// Helper to calculate duration
function getDuration(start: string, end: string): string {
  if (!start || !end) return "N/A";

  const startTime = new Date(start);
  const endTime = new Date(end);
  const durationMs = endTime.getTime() - startTime.getTime();

  if (isNaN(durationMs)) return "N/A";

  const minutes = Math.floor(durationMs / 1000 / 60);
  return `${minutes} mins`;
}

export default RideTable;
