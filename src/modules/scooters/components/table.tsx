import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

type TransactionData = {
  s_no: number;
  scooter_ID: number;
  batteryStatus: string;
  lastRideEnded: string;
  lastUsedBy: string;
  lastCharge: number;
  currentStatus: string;
};

const columnHelper = createColumnHelper<TransactionData>();

// Define columns for transaction data
const transactionColumns: ColumnDef<TransactionData, any>[] = [
  columnHelper.accessor("s_no", {
    header: () => (
      <div className="flex items-center">
        S.No.
        {/* Add sorting icons if needed */}
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("scooter_ID", {
    header: "Scooter ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("batteryStatus", {
    header: "Baterry Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastRideEnded", {
    header: "Last Ride Ended",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastUsedBy", {
    header: "Last Used By",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastCharge", {
    header: "Last Charge",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("currentStatus", {
    header: "Current Status",
    cell: (info) => info.getValue(),
  }),
];

// Generate sample transaction data
const transactionData: TransactionData[] = [
    {
      s_no: 1,
      scooter_ID: 35,
      batteryStatus: "charged",
      lastRideEnded: "today",
      lastUsedBy: "12:34",
      lastCharge: 600,
      currentStatus: "NA",
    },
    {
      s_no: 2,
      scooter_ID: 35,
      batteryStatus: "charged",
      lastRideEnded: "today",
      lastUsedBy: "12:34",
      lastCharge: 600,
      currentStatus: "NA",
    },
    {
      s_no: 3,
      scooter_ID: 35,
      batteryStatus: "charged",
      lastRideEnded: "today",
      lastUsedBy: "12:34",
      lastCharge: 600,
      currentStatus: "NA",
    },
    {
      s_no: 4,
      scooter_ID: 35,
      batteryStatus: "charged",
      lastRideEnded: "today",
      lastUsedBy: "12:34",
      lastCharge: 600,
      currentStatus: "NA",
    },
    {
      s_no: 5,
      scooter_ID: 35,
      batteryStatus: "charged",
      lastRideEnded: "today",
      lastUsedBy: "12:34",
      lastCharge: 600,
      currentStatus: "NA",
    },
    {
      s_no: 6,
      scooter_ID: 35,
      batteryStatus: "charged",
      lastRideEnded: "today",
      lastUsedBy: "12:34",
      lastCharge: 600,
      currentStatus: "NA",
    },
    {
      s_no: 7,
      scooter_ID: 35,
      batteryStatus: "charged",
      lastRideEnded: "today",
      lastUsedBy: "12:34",
      lastCharge: 600,
      currentStatus: "NA",
    },
    {
      s_no: 8,
      scooter_ID: 35,
      batteryStatus: "charged",
      lastRideEnded: "today",
      lastUsedBy: "12:34",
      lastCharge: 600,
      currentStatus: "NA",
    },
    {
      s_no: 9,
      scooter_ID: 35,
      batteryStatus: "charged",
      lastRideEnded: "today",
      lastUsedBy: "12:34",
      lastCharge: 600,
      currentStatus: "NA",
    },
    {
      s_no: 10,
      scooter_ID: 35,
      batteryStatus: "charged",
      lastRideEnded: "today",
      lastUsedBy: "12:34",
      lastCharge: 600,
      currentStatus: "NA",
    },
  ];
  

const TransactionTable: React.FC = () => {
  return (
    <Table<TransactionData>
      data={transactionData}
      columns={transactionColumns}
      pageSize={10}
    />
  );
};

export default TransactionTable;
