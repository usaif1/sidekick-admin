import React, { useState } from "react";
import Table from "./components/table.tsx";

const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"This Month" | "Last Month">("This Month");
  const [searchQuery, setSearchQuery] = useState("");
  
  const baseTabStyles = "px-4 py-0.5 rounded-lg transition-colors duration-200 cursor-pointer";

  return (
    <div>
      {/* Quick Actions Section */}
      <div className="max-h-fit overflow-auto w-[469px] h-[89px] gap-5">
        <h2 className="font-semibold text-lg">Quick Actions</h2>
        <div className="mt-3 flex gap-x-2">
          <button className="font-bold text-sm rounded-full px-4 py-2 bg-[#18f27a]">
            Add User
          </button>
          <button className="font-bold text-sm rounded-full px-4 py-2 text-white bg-[#F84848]">
            Remove User
          </button>
          <button className="font-bold text-sm rounded-full px-4 py-2 bg-gray-200">
            View Block User
          </button>
        </div>
      </div>

      {/* Active Users Section */}
      <div className="max-h-fit overflow-auto mt-7 mb-3">
        <h2 className="font-semibold text-lg">Active Users</h2>

        <div className="flex justify-between">
          {/* Month Tabs */}
          <div className="flex gap-x-2 mt-2">
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

          {/* Search Field */}
          <div className="relative w-[240px] h-[36px]">
            <input
              type="text"
              placeholder="Search Scooter or User"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full rounded-[12px] border border-[#296AEB] pl-10 pr-4 text-black
                       placeholder:text-gray-400 focus:outline-none 
                       transition-all duration-200"
            />
            {/* Search Icon (only visible when input is empty) */}
            {searchQuery === "" && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#296AEB]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      <Table />
    </div>
  );
};

export default Users;