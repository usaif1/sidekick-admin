import React from 'react'
import Table from "./ACtable";

const AssignCreditsModal: React.FC = () => {
  return (
    //parend div

    <div className=" w-full overflow-hidden flex flex-col items-center  text-center h-full">
      <div className="w-full">
        <h1 className="font-semibold text-xl">Assign Credit</h1>
        <p className="text-sm text-gray-400">Please enter the amount.</p>
      </div>
      {/* second component */}
      <div className="gap-[8px] mb-4">
        <div className="flex items-center w-[672px] h-[60px] rounded-[12px] border  border-[#296AEB] gap-[20px] px-[20px] py-[10px] my-[12px]">
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
            placeholder="XXXX"
            className="flex-1 outline-none text-black placeholder:text-gray-400"
          />
        </div>
        {/* buttons to add money */}
        <div className="flex flex-row-reverse gap-[12px]">
          <button className=" font-semibold w-[100px] h-[36px] rounded-[12px] px-[12px] py-[8px] bg-[#72FFB1] text-black-100">
            +500
          </button>
          <button className=" font-semibold w-[100px] h-[36px] rounded-[12px] px-[12px] py-[8px] bg-[#72FFB1] text-black">
            +200
          </button>
          <button className="font-semibold w-[100px] h-[36px] text-centre rounded-[12px] px-[12px] py-[8px] bg-[#72FFB1] text-black">
            +100
          </button>
        </div>
      </div>

      {/* input and button */}
      <div className="flex items-center gap-[12px] mb-5">
        {/* Input with search icon */}
        <div className="flex items-center w-[585px] h-[36px] rounded-[12px] border border-[#296AEB] px-[8px] gap-[8px]">
          {/* Search Icon */}
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

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search Scooter or User"
            className="w-full h-full outline-none bg-transparent text-black placeholder:text-gray-400"
          />
        </div>

        {/* Button */}
        <button
          className=" h-[36px] font-[Plus Jakarta Sans] font-bold text-[12px] leading-[100%] tracking-[0%] bg-blue-600 text-white px-4 py-1.5 rounded-lg  font-[Plus Jakarta Sans] "
        >
          Select All
        </button>
      </div>

      <div className="w-full">
      <Table />
      </div>

      <div className="flex justify-between w-full mt-6">
        <div className="flex flex-col gap-[8px]">
          <div className=" flex gap-x-[20px]">
            <p className="text-[#296AEB] font-[Plus Jakarta Sans] font-bold text-[14px] leading-[100%] tracking-[0%]">Assignees</p>
            <p className="font-[Plus Jakarta Sans] font-normal text-[14px] leading-[100%] tracking-[0%] text-right">5</p>
          </div>
          <div className="flex gap-[20px] ">
            <p className="text-[#296AEB] font-[Plus Jakarta Sans] font-bold text-[14px] leading-[100%] tracking-[0%]">Total credits</p>
            <p className="font-[Plus Jakarta Sans] font-normal text-[14px] leading-[100%] tracking-[0%] text-right">XXXX</p>
          </div>
        </div>

        <div>
          <button className=" h-full text-[16px] leading-[100%] font-semibold tracking-[0] font-[Plus_Jakarta_Sans]  gap-3 rounded-[90px] px-5 py-3 bg-[#18f27a]">
            {" "}
            Proceed
          </button>
        </div>
      </div>
    </div>

  )
}

export default AssignCreditsModal