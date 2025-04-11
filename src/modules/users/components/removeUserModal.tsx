import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { FETCH_ORG_USERS } from "@/graphql/queries/fetchOrgUsers";
import { REMOVE_USER } from "@/graphql/mutations/removeUser";
import Table from "./removeUsersTable.tsx";

const RemoveUserModal: React.FC = () => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const [fetchUsersByOrgId, { data, loading, error, refetch }] = useLazyQuery(
    FETCH_ORG_USERS,
    {
      fetchPolicy: "network-only",
    }
  );

  const [removeUser, { loading: removing }] = useMutation(REMOVE_USER);

  useEffect(() => {
    fetchUsersByOrgId();
  }, [fetchUsersByOrgId]);

  const usersData = data?.user_organizations?.map((orgUser: any) => ({
    name: orgUser.user.full_name,
    user_id: orgUser.user.id,
  }));

  const toggleSelection = (userId: string) => {
    setSelectedUserIds((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleRemove = async () => {
    try {
      await Promise.all(
        selectedUserIds.map((user_id) =>
          removeUser({
            variables: {
              user_id,
            },
          })
        )
      );
      // Refetch users after removal
      await refetch();
      setSelectedUserIds([]);
    } catch (err) {
      console.error("Error removing users:", err);
    }
  };

  return (
    <div className="text-center items-center flex flex-col left-[5833px] rounded-[12px] gap-6 mt-4">
      <div className="w-[672px] h-[49px] gap-1 flex flex-col items-centre">
        <h1 className="w-[672px] h-[25px] font-jakarta font-bold text-[20px] leading-[100%] tracking-[0%] text-center text-xl">
          Remove Users
        </h1>
        <p className="w-[672px] h-[20px] font-jakarta font-normal text-[16px] leading-[100%] tracking-[0%] text-center text-[#86A0CA] text-sm ">
          Please select the users that are to be removed.
        </p>
      </div>

      {/* Search and Select All */}
      <div className="w-full gap-x-2 flex items-center">
        <div className="w-[585px] h-[36px] rounded-[12px] border border-solid gap-3 p-2 flex items-center border-[#296AEB] px-[8px] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search Users"
            className="w-full h-full outline-none bg-transparent text-black placeholder:text-gray-400"
          />
        </div>

        <button className="rounded-lg text-sm px-4 py-2 bg-[#296AEB] font-bold text-white">
          Select All
        </button>
      </div>

      {/* Table area */}
      <div className="w-[672px] h-full rounded-[12px] gap-5">
        {!loading && !error && usersData && (
          <Table
            selectedUserIds={selectedUserIds}
            toggleSelection={toggleSelection}
            users={usersData}
          />
        )}
      </div>

      {/* Remove Button */}
      <div className="w-[672px] h-[44px] gap-[10px] flex justify-center">
        <button
          disabled={removing || selectedUserIds.length === 0}
          onClick={handleRemove}
          className={`w-[104px] h-[44px] rounded-[90px] gap-[12px] px-[20px] py-[12px] text-[16px] leading-[100%] font-semibold tracking-[0] font-[Plus_Jakarta_Sans] text-white ${
            removing || selectedUserIds.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#F84848] hover:bg-[#dc3c3c]"
          }`}
        >
          {removing ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default RemoveUserModal;
