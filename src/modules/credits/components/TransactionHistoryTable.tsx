import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

type TransactionData = {
  s_no: number;
  date: string;
  type: string;
  credits: string;
  user: string;
  updated_balance: number;
  transaction_status: string;
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
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("credits", {
    header: "Credits",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("user", {
    header: "User",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("updated_balance", {
    header: "Updated Balance",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("transaction_status", {
    header: "Transaction Status",
    cell: (info) => info.getValue(),
  }),
];

// Generate sample transaction data
const transactionData: TransactionData[] = [
  {
    s_no: 1,
    date: "2023-04-01",
    type: "Credit",
    credits: "100",
    user: "John Doe",
    updated_balance: 600,
    transaction_status: "Success",
  },
  {
    s_no: 2,
    date: "2023-04-02",
    type: "Debit",
    credits: "50",
    user: "Jane Smith",
    updated_balance: 550,
    transaction_status: "Success",
  },
  {
    s_no: 3,
    date: "2023-04-03",
    type: "Credit",
    credits: "200",
    user: "Alice Johnson",
    updated_balance: 750,
    transaction_status: "Pending",
  },
  {
    s_no: 4,
    date: "2023-04-04",
    type: "Debit",
    credits: "30",
    user: "Bob Brown",
    updated_balance: 720,
    transaction_status: "Failed",
  },
  {
    s_no: 5,
    date: "2023-04-05",
    type: "Credit",
    credits: "150",
    user: "Charlie White",
    updated_balance: 870,
    transaction_status: "Success",
  },
];

const TransactionTable: React.FC = () => {
  return (
    <Table<TransactionData>
      data={transactionData}
      columns={transactionColumns}
    />
  );
};

export default TransactionTable;
