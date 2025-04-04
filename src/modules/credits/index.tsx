import React, { useState } from "react";
import CurrentBalanceCard from "./components/CurrentBalanceCard";
import ModalStore from "@/globalStore/modalStore";
import AddCreditsModal from "./components/AddCreditsModal";
import TransactionTable from "./components/TransactionHistoryTable";
import AssignCreditsModal from "./components/AssignCreditsModal";

const Credits: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"This Month" | "Last Month">(
    "This Month"
  );
  const { openModal } = ModalStore();

  // Default styles for the tab buttons
  const baseTabStyles =
    "px-4 py-0.5 rounded-lg transition-colors duration-200 cursor-pointer";

  return (
    <div className="flex flex-col gap-y-4">
      <CurrentBalanceCard />
      <div className="flex justify-end gap-x-2">
        <button
          onClick={() => openModal(AddCreditsModal)}
          className="bg-btn-secondary px-4 py-1.5 text-sm font-medium rounded-full"
        >
          Add Credits
        </button>
        <button
          onClick={() => openModal(AssignCreditsModal)}
          className="bg-btn-primary px-4 py-1.5 text-sm font-medium rounded-full"
        >
          Assign Credits
        </button>
      </div>
      <div className="max-h-fit overflow-auto">
        <h2 className="font-semibold text-lg">Transaction History</h2>
        <div className="flex gap-x-2 mt-2">
          {/* This Month Tab */}
          <button
            onClick={() => setActiveTab("This Month")}
            className={`${baseTabStyles} ${
              activeTab === "This Month"
                ? "bg-tabs-primary text-black"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            This Month
          </button>
          {/* Last Month Tab */}
          <button
            onClick={() => setActiveTab("Last Month")}
            className={`${baseTabStyles} ${
              activeTab === "Last Month"
                ? "bg-tabs-primary text-black"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Last Month
          </button>
        </div>
        <div className="w-full mt-2">
          <TransactionTable />
        </div>
        <div className="flex w-full justify-end mt-2">
          <button className="bg-btn-primary px-4 py-1.5 text-sm font-medium rounded-full">
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default Credits;
