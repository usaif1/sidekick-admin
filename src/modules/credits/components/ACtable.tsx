// UsersTable.tsx
import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export type UsersData = {
  name: string;
  user_id: string;
};

interface UsersTableProps {
  users: UsersData[];
  selectedUserIds: string[];
  toggleSelection: (userId: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, selectedUserIds, toggleSelection }) => {
  const columnHelper = createColumnHelper<UsersData>();

  // Define columns for user data. We use a "display" column for checkboxes.
  const columns: ColumnDef<UsersData, any>[] = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("user_id", {
      header: "User ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "select",
      header: () => (
        <div className="flex items-center justify-center">
          <p>Select</p>
        </div>
      ),
      cell: (info) => {
        const userId = info.row.original.user_id;
        const isChecked = selectedUserIds.includes(userId);
        return (
          <div className="flex items-center justify-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                checked={isChecked}
                onChange={() => toggleSelection(userId)}
              />
            </label>
          </div>
        );
      },
    }),
  ];

  return <Table<UsersData> data={users} columns={columns} />;
};

export default UsersTable;
