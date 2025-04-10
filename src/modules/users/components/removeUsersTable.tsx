import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

type TransactionData = {

    name: string;
    userID: string;
    select: string;
};

const columnHelper = createColumnHelper<TransactionData>();

// Define columns for transaction data
const transactionColumns: ColumnDef<TransactionData, any>[] = [
    //   columnHelper.accessor("s_no", {
    //     header: () => (
    //       <div className="flex items-center">
    //         S.No.
    //         {/* Add sorting icons if needed */}
    //       </div>
    //     ),
    //     cell: (info) => info.getValue(),
    //   }),
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("userID", {
        header: "User ID",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("select", {
        header: () => (
            <div className="flex items-center">
                <p>Select</p>

                {/* Add sorting icons if needed */}
            </div>
        ),
        cell: () => (
            <div className="flex items-center">
                <label className="flex items-center gap-[20px] w-[60px] h-[40px] px-[20px] py-[12px] cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                    
                </label>


                {/* Add sorting icons if needed */}
            </div>
        )
    }),
    
];

// Generate sample transaction data
const transactionData: TransactionData[] = [
    {
        name: "XXXX",
        userID: "XXXX",
        select: "XXXX",
    },
    {
        name: "XXXX",
        userID: "XXXX",
        select: "XXXX",
    },
    {
        name: "XXXX",
        userID: "XXXX",
        select: "XXXX",
    },
    {
        name: "XXXX",
        userID: "XXXX",
        select: "XXXX",
    },
    {
        name: "XXXX",
        userID: "XXXX",
        select: "XXXX",
    },
    {
        name: "XXXX",
        userID: "XXXX",
        select: "XXXX",
    },
    {
        name: "XXXX",
        userID: "XXXX",
        select: "XXXX",
    },
    {
        name: "XXXX",
        userID: "XXXX",
        select: "XXXX",
    },
    
];


const TransactionTable: React.FC = () => {
    return (
        <Table<TransactionData>
            data={transactionData}
            columns={transactionColumns}
            
            initialState={{
                pagination: {
                    pageSize: transactionData.length, // Show all items
                }
            }}
            manualPagination={true} // Disable pagination controls
            className="min-h-full" // Ensure table fills available space
        />
    );
};

export default TransactionTable;
