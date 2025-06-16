import React, { useMemo } from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import modalStore from "@/globalStore/modalStore";
import UserProfile from "./UserProfileModal";
import { useLazyQuery } from "@apollo/client";
import { FETCH_USER_RIDES_DATA } from "@/graphql/queries/fetchUserRidesData";

type UsersData = {
  s_no: number;
  name: string;
  employee_id: string;
  total_minutes: number;
  last_ride_ended: string;
  credits_spent: number;
  current_balance: number;
  user_id: string;
};

const columnHelper = createColumnHelper<UsersData>();

// Define columns for transaction data
const transactionColumns: ColumnDef<UsersData, any>[] = [
  columnHelper.accessor("s_no", {
    header: () => (
      <div className="flex items-center">
        S.No.
        {/* Add sorting icons if needed */}
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("employee_id", {
    header: "Employee ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("total_minutes", {
    header: "Total Minutes",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_ride_ended", {
    header: "Last Ride Ended",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("credits_spent", {
    header: "Credits Spent",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("current_balance", {
    header: "Current Balance",
    cell: (info) => info.getValue(),
  }),
];

// Generate sample transaction data
interface UserTableProps {
  users: UsersData[];
}

const TransactionTable: React.FC<UserTableProps> = ({ users }) => {
  const { openModal } = modalStore();
  const usersData = useMemo<UsersData[]>(() => {
    if (!users) return [];

    return users.map((item: any, index: number) => {
      const user = item.user;
      const rides = user?.rides || [];
      const latestRideStep = rides[0]?.ride_steps?.[0]?.updated_at;

      return {
        s_no: index + 1,
        name:
          user?.full_name ||
          `${user.first_name ?? ""} ${user.middle_name ?? ""} ${
            user.last_name ?? ""
          }`.trim(),
        employee_id: item.employee_id,
        total_minutes: 0,
        last_ride_ended: latestRideStep
          ? new Date(latestRideStep).toLocaleString()
          : "—",
        credits_spent: 0,
        current_balance: user.wallet?.balance ?? 0,
        user_id: user.id,
      };
    });
  }, [users]);

  const [fetchUserRidesData] = useLazyQuery(FETCH_USER_RIDES_DATA, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log("data", data);

      openModal(() => <UserProfile data={data} />);
    },
    onError: (err) => {
      console.error("Error fetching user ride data:", err);
    },
  });

  const handleRowClick = (rowData: UsersData) => {
    if (rowData.user_id) {
      fetchUserRidesData({ variables: { userId: rowData.user_id } });
    }
  };

  return (
    <Table<UsersData>
      data={usersData}
      columns={transactionColumns}
      pageSize={10}
      onRowClick={handleRowClick}
    />
  );
};

export default TransactionTable;
