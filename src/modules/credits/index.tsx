import React from "react";
import CurrentBalanceCard from "./components/CurrentBalanceCard";
import ModalStore from "@/globalStore/modalStore";
import AddCreditsModal from "./components/AddCreditsModal";
import TransactionTable from "./components/TransactionHistoryTable";
import AssignCreditsModal from "./components/AssignCreditsModal";

const Credits: React.FC = () => {
  const { openModal } = ModalStore();
  return (
    <div className="flex flex-col gap-y-2">
      <CurrentBalanceCard />
      <div className="flex justify-end gap-x-2">
        <button
          onClick={() => openModal(AddCreditsModal)}
          className="bg-btn-secondary px-4 py-1.5 cursor-pointer text-sm font-medium rounded-full"
        >
          Add Credits
        </button>
        <button onClick={() => openModal(AssignCreditsModal)} className="bg-btn-primary px-4 py-1.5 cursor-pointer text-sm font-medium rounded-full">
          Assign Credits
        </button>
      </div>
      <h2 className="font-semibold text-lg mt-2">Transaction History</h2>
      <div className="flex-1 max-w-full">
        <TransactionTable />
      </div>
      <div className="flex w-full justify-end">
        <button className="bg-btn-primary px-4 py-1.5 cursor-pointer text-sm font-medium rounded-full">
          Export
        </button>
      </div>
    </div>
  );
};

export default Credits;
