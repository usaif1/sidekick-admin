import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

type TransactionData = {
  s_no: number;
  Name: string;
  Employee_ID: number;
  Total_minutes: number;
  Last_Ride_Ended: string;
  Credits_Spent: number;
  Current_Balance: number;
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
  columnHelper.accessor("Name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Employee_ID", {
    header: "Employee ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Total_minutes", {
    header: "Total Minutes",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Last_Ride_Ended", {
    header: "Last Ride Ended",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Credits_Spent", {
    header: "Credits Spent",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Current_Balance", {
    header: "Current Balance",
    cell: (info) => info.getValue(),
  }),
];

// Generate sample transaction data
const transactionData: TransactionData[] = [
    {
      s_no: 1,
      Name: "2023-04-01",
      Employee_ID: 100,
      Total_minutes: 747,
      Last_Ride_Ended: "12:34",
      Credits_Spent: 600,
      Current_Balance: 0,
    },
    {
      s_no: 2,
      Name: "2023-04-01",
      Employee_ID: 100,
      Total_minutes: 747,
      Last_Ride_Ended: "12:34",
      Credits_Spent: 600,
      Current_Balance: 0,
    },
    {
      s_no: 3,
      Name: "2023-04-01",
      Employee_ID: 100,
      Total_minutes: 747,
      Last_Ride_Ended: "12:34",
      Credits_Spent: 600,
      Current_Balance: 0,
    },
    {
      s_no: 4,
      Name: "2023-04-01",
      Employee_ID: 100,
      Total_minutes: 747,
      Last_Ride_Ended: "12:34",
      Credits_Spent: 600,
      Current_Balance: 0,
    },
    {
      s_no: 5,
      Name: "2023-04-01",
      Employee_ID: 100,
      Total_minutes: 747,
      Last_Ride_Ended: "12:34",
      Credits_Spent: 600,
      Current_Balance: 0,
    },
    {
      s_no: 6,
      Name: "2023-04-01",
      Employee_ID: 100,
      Total_minutes: 747,
      Last_Ride_Ended: "12:34",
      Credits_Spent: 600,
      Current_Balance: 0,
    },
    {
      s_no: 7,
      Name: "2023-04-01",
      Employee_ID: 100,
      Total_minutes: 747,
      Last_Ride_Ended: "12:34",
      Credits_Spent: 600,
      Current_Balance: 0,
    },
    {
      s_no: 8,
      Name: "2023-04-01",
      Employee_ID: 100,
      Total_minutes: 747,
      Last_Ride_Ended: "12:34",
      Credits_Spent: 600,
      Current_Balance: 0,
    },
    {
      s_no: 9,
      Name: "2023-04-01",
      Employee_ID: 100,
      Total_minutes: 747,
      Last_Ride_Ended: "12:34",
      Credits_Spent: 600,
      Current_Balance: 0,
    },
    {
      s_no: 10,
      Name: "2023-04-01",
      Employee_ID: 100,
      Total_minutes: 747,
      Last_Ride_Ended: "12:34",
      Credits_Spent: 600,
      Current_Balance: 0,
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
