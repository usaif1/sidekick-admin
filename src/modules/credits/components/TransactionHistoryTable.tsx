import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// Define your data type for transactions
export type TransactionData = {
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
        {/* Sorting icon can be added here */}
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

interface TransactionTableProps {
  transactions: TransactionData[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <Table<TransactionData>
      data={transactions}
      columns={transactionColumns}
      pageSize={10}
    />
  );
};

export default TransactionTable;
