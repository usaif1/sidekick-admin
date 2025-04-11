// UsersTable.tsx
import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export type RemoveUsersData = {
  name: string;
  user_id: string;
};

interface UsersTableProps {
  users: RemoveUsersData[];
  selectedUserIds: string[];
  toggleSelection: (userId: string) => void;
}

const RemoveUsersTable: React.FC<UsersTableProps> = ({
  users,
  selectedUserIds,
  toggleSelection,
}) => {
  const columnHelper = createColumnHelper<RemoveUsersData>();

  // Define columns for user data. We use a "display" column for checkboxes.
  const columns: ColumnDef<RemoveUsersData, any>[] = [
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

  return <Table<RemoveUsersData> data={users} columns={columns} />;
};

export default RemoveUsersTable;
