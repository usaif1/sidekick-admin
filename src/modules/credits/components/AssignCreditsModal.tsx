import React, { useEffect, useState } from "react";
import Table from "./ACtable";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_USER_BALANCE } from "@/graphql/mutations/updateUserBalance";
import modalStore from "@/globalStore/modalStore";
import { FETCH_ORG_USERS } from "@/graphql/queries/fetchOrgUsers";

const AssignCreditsModal: React.FC = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const { closeModal } = modalStore();

  const [fetchUsersByOrgId, { data, loading, error }] = useLazyQuery(
    FETCH_ORG_USERS,
    {
      fetchPolicy: "network-only",
    }
  );

  const [updateUserBalance] = useMutation(UPDATE_USER_BALANCE, {
    onCompleted: () => {
      closeModal();
    },
    onError: (err) => {
      console.error("Error assigning credit:", err);
    },
  });

  // Trigger the query as soon as the modal is mounted/open
  useEffect(() => {
    fetchUsersByOrgId();
  }, [fetchUsersByOrgId]);

  // Prepare the users data for display in the table
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

  const handleProceed = async () => {
    try {
      const amt = amount === "" ? 0 : amount;
      await updateUserBalance({
        variables: { _in: selectedUserIds, balance: amt },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto text-center">
      {/* Header Section */}
      <div className="w-full">
        <h1 className="font-semibold text-xl">Assign Credit</h1>
        <p className="text-sm text-gray-400">Please enter the amount.</p>
      </div>

      {/* Amount Input Section */}
      <div className="gap-2 mb-4 w-full">
        <div className="flex items-center rounded-xl border border-[#296AEB] gap-5 px-5 py-[10px] my-3">
          {/* Wallet Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a4 4 0 00-4-4H6a4 4 0 00-4 4v10a4 4 0 004 4h7a4 4 0 004-4v-2m-4 0h6m0 0l-2 2m2-2l-2-2"
            />
          </svg>
          {/* Input Field */}
          <input
            type="text"
            value={amount}
            placeholder="XXXX"
            onChange={(e) => {
              // Set the amount directly to allow an empty input.
              // Ensure that only numeric values are allowed.
              const newValue = e.target.value;
              if (newValue === "" || /^[0-9]+$/.test(newValue)) {
                setAmount(newValue === "" ? "" : Number(newValue));
              }
            }}
            className="flex-1 outline-none text-black placeholder:text-gray-400"
          />
        </div>
        {/* Buttons to Add Money */}
        <div className="flex flex-row-reverse gap-x-3">
          <button
            onClick={() => setAmount(500)}
            className="font-semibold  rounded-[12px] px-[12px] py-[8px] bg-[#72FFB1] text-black"
          >
            +500
          </button>
          <button
            onClick={() => setAmount(200)}
            className="font-semibold  rounded-[12px] px-[12px] py-[8px] bg-[#72FFB1] text-black"
          >
            +200
          </button>
          <button
            onClick={() => setAmount(100)}
            className="font-semibold rounded-[12px] px-[12px] py-[8px] bg-[#72FFB1] text-black"
          >
            +100
          </button>
        </div>
      </div>

      {/* Search Input & Select All Button */}
      <div className="flex items-center justify-center gap-3 mb-5 w-full">
        {/* Search Input */}
        <div className="h-full w-full flex items-center rounded-xl border border-[#296AEB] px-2 gap-2 py-2">
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
            placeholder="Search Scooter or User"
            className=" h-full outline-none bg-transparent text-black placeholder:text-gray-400"
          />
        </div>
        {/* Select All Button */}
        <button className=" font-bold text-xs bg-blue-600 text-white px-4 py-1 rounded-lg  ">
          Select All
        </button>
      </div>

      {/* Table Section */}
      <div className="w-full">
        {/* Handle Loading */}
        {loading && (
          <p className="text-gray-500 text-center">Loading users...</p>
        )}
        {/* Handle Error */}
        {error && (
          <p className="text-red-500 text-center">Error: {error.message}</p>
        )}
        {/* Render Table if data is available and not loading */}
        {!loading && !error && usersData && (
          <Table
            selectedUserIds={selectedUserIds}
            toggleSelection={toggleSelection}
            users={usersData}
          />
        )}
      </div>

      {/* Footer Section */}
      <div className="flex justify-between w-full mt-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-x-2">
            <p className="text-[#296AEB] font-bold text-xs">Assignees</p>
            <p className="font-normal text-xs text-right">
              {selectedUserIds.length ? selectedUserIds.length : "XXXX"}
            </p>
          </div>
          <div className="flex gap-x-2">
            <p className="text-[#296AEB] font-bold text-xs">
              Total credits
            </p>
            <p className="font-normal text-xs text-right">
              {amount ? amount : "XXXX"}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={handleProceed}
            className="text-base font-semibold rounded-[90px] px-5 py-3 bg-[#18f27a]"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignCreditsModal;
