import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

type RidesAndTransactionData = {
  s_no: number;
  scooterID: string;
  duration: string;
  creditsUsed: string;
  walletBalance: string;
};

const columnHelper = createColumnHelper<RidesAndTransactionData>();

// Define columns for transaction data
const ridesAndTransactionColumns: ColumnDef<RidesAndTransactionData, any>[] = [
  columnHelper.accessor("s_no", {
    header: () => (
      <div className="flex items-center">
        S.No.
        {/* Add sorting icons if needed */}
      </div>
    ),
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("scooterID", {
    header: "Scooter ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("duration", {
    header: "Duration",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("creditsUsed", {
    header: "Credits Used",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("walletBalance", {
    header: "Credit Balance",
    cell: (info) => info.getValue(),
  }),
];

// Generate sample transaction data
function getDuration(start: string, end: string): string {
  if (!start || !end) return "N/A";

  const startTime = new Date(start);
  const endTime = new Date(end);
  const durationMs = endTime.getTime() - startTime.getTime();

  if (isNaN(durationMs)) return "N/A";

  const minutes = Math.floor(durationMs / 1000 / 60);
  return `${minutes} mins`;
}

const UserRidesTable: React.FC<{ userRides: any[] }> = ({ userRides }) => {
  console.log("userRides", userRides);

  if (userRides.length === 0) {
    return <div>No rides found</div>;
  }

  const formattedRides = userRides.map((ride, index) => ({
    s_no: index + 1,
    scooterID: ride.scooter.registration_number,
    duration: getDuration(ride.start_time, ride.end_time),
    creditsUsed: ride?.total_cost,
    walletBalance: "0",
  }));

  return (
    <Table<RidesAndTransactionData>
      //   data={ridesAndTransactionData}
      data={formattedRides}
      columns={ridesAndTransactionColumns}
    />
  );
};

export default UserRidesTable;
