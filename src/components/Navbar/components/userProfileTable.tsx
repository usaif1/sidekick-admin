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
    header: "Employee ID",
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
const ridesAndTransactionData: RidesAndTransactionData[] = [
    {
      s_no: 1,
      scooterID: "XXXX",
      duration: "XXXX",
      creditsUsed: "XXXX",
      walletBalance: "XXXX",
    },
    {
      s_no: 2,
      scooterID: "XXXX",
      duration: "XXXX",
      creditsUsed: "XXXX",
      walletBalance: "XXXX",
    },
    {
      s_no: 3,
      scooterID: "XXXX",
      duration: "XXXX",
      creditsUsed: "XXXX",
      walletBalance: "XXXX",
    },
    {
      s_no: 4,
      scooterID: "XXXX",
      duration: "XXXX",
      creditsUsed: "XXXX",
      walletBalance: "XXXX",
    },
    {
      s_no: 5,
      scooterID: "XXXX",
      duration: "XXXX",
      creditsUsed: "XXXX",
      walletBalance: "XXXX",
    },
    {
      s_no: 6,
      scooterID: "XXXX",
      duration: "XXXX",
      creditsUsed: "XXXX",
      walletBalance: "XXXX",
    },
    {
      s_no: 7,
      scooterID: "XXXX",
      duration: "XXXX",
      creditsUsed: "XXXX",
      walletBalance: "XXXX",
    },
    {
      s_no: 8,
      scooterID: "XXXX",
      duration: "XXXX",
      creditsUsed: "XXXX",
      walletBalance: "XXXX",
    },
    {
      s_no: 9,
      scooterID: "XXXX",
      duration: "XXXX",
      creditsUsed: "XXXX",
      walletBalance: "XXXX",
    },
    {
      s_no: 10,
      scooterID: "XXXX",
      duration: "XXXX",
      creditsUsed: "XXXX",
      walletBalance: "XXXX",
    },
  ];
  

const TransactionTable: React.FC = () => {
  return (
    <Table<RidesAndTransactionData>
      data={ridesAndTransactionData}
      columns={ridesAndTransactionColumns}
    />
  );
};

export default TransactionTable;
