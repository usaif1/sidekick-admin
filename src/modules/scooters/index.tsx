import React, { useState } from "react";
import Table from "./components/table.tsx";
import ScootersMap from "../home/components/ScootersMap.tsx";
import { useQuery } from "@apollo/client";
import { FETCH_ALL_SCOOTERS } from "@/graphql/queries/fetchAllScooters.ts";

const Scooters: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "All" | "Active" | "Dormant" | "Servicing"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: scootersData,
    loading: scootersLoading,
    error: scootersError,
  } = useQuery(FETCH_ALL_SCOOTERS);

  const baseTabStyles =
    "px-4 py-0.5 rounded-lg transition-colors duration-200 cursor-pointer";

  if (scootersLoading) return <p>Loading...</p>;
  if (scootersError) return <p>Error loading!</p>;

  return (
    // parent container
    <div>
      {/* <div>Write code for the map part</div> */}

      <ScootersMap scooters={scootersData} />

      <div className="max-h-fit overflow-auto mt-7 mb-3">
        <h2 className="font-semibold text-lg">Active Users</h2>

        <div className="flex justify-between">
          {/* Month Tabs */}
          <div className="flex gap-x-2 mt-2">
            <button
              onClick={() => setActiveTab("All")}
              className={`${baseTabStyles} ${
                activeTab === "All"
                  ? "bg-tabs-primary text-black"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("Active")}
              className={`${baseTabStyles} ${
                activeTab === "Active"
                  ? "bg-tabs-primary text-black"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => setActiveTab("Dormant")}
              className={`${baseTabStyles} ${
                activeTab === "Dormant"
                  ? "bg-tabs-primary text-black"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Dormant
            </button>

            <button
              onClick={() => setActiveTab("Servicing")}
              className={`${baseTabStyles} ${
                activeTab === "Servicing"
                  ? "bg-tabs-primary text-black"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Servicing
            </button>
          </div>

          {/* Search Field */}
          <div className="relative ">
            <input
              type="text"
              placeholder="Search Scooter or User"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full rounded-xl border border-[#296AEB] pl-10 pr-4 text-black
                       placeholder:text-gray-400 focus:outline-none 
                       transition-all duration-200"
            />
            {/* Search Icon (only visible when input is empty) */}
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
          </div>
        </div>
      </div>

      <Table scooters={scootersData.scooters} />

      <div className="flex justify-between w-full mt-6">
        <div>"Click on Scooter to check its status."</div>

        <div>
          <button className=" text-base leading-[100%] font-semibold tracking-[0] font-[Plus_Jakarta_Sans]  gap-3 rounded-[90px] px-5 py-3 bg-[#18f27a]">
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scooters;
