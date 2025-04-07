import React from "react";
import Table from "./userProfileTable.tsx";

const UserProfile: React.FC = () => {
    return (
        // parent
        <div className="">
            <div className="w-full h-[95px] gap-[12px] pr-[20px] pl-[20px] flex justify-between mt-6  ">
                <div className="flex flex-col gap-[8px]">
                    <div className="gap[12px] flex">
                        <h1 className="w-[213px] h-[43px] font-[Plus Jakarta Sans] font-bold text-[34px] leading-[100%] tracking-[0%]">David Powell</h1>
                        <div className="ml-2 mt-2.5 rounded-full h-[12px] w-[12px] bg-[#18F27A]"></div>
                    </div>
                    <div className=" w-[237px] h-[18px] flex gap-[20px]">

                        <p className="text-[#296AEB] font-[Plus Jakarta Sans] font-bold text-[14px] leading-[100%] tracking-[0%]">Employee ID</p>
                        <p className="font-[Plus Jakarta Sans] font-normal text-[14px] leading-[100%] tracking-[0%] text-right">XXXX</p>
                    </div>
                    <div className="w-[237px] h-[18px] flex gap-[20px] ">
                        <p className="text-[#296AEB] font-[Plus Jakarta Sans] font-bold text-[14px] leading-[100%] tracking-[0%]">Wallet Balance</p>
                        <p className="font-[Plus Jakarta Sans] font-normal text-[14px] leading-[100%] tracking-[0%] text-right">XXXX</p>
                    </div>
                </div>

                <div className=" flex items-center">
                    <button className="mr-[8px] bg-[#F84848] text-white w-[152px] h-[44px] rounded-[90px] gap-[12px] pt-[12px] pr-[20px] pb-[12px] pl-[20px]">
                        {" "}
                        Block User
                    </button>
                    <button className="bg-[#18F27A] w-[152px] h-[44px] rounded-[90px] gap-[12px] pt-[12px] pr-[20px] pb-[12px] pl-[20px]">
                        Assign Credit
                    </button>
                </div>
            </div>

            <div className="pr-[20px] pl-[20px] mt-8 gap-[16px]">
                <h2 className="font-[Plus Jakarta Sans] font-bold text-[20px] leading-[100%] tracking-[0%]">Recent Rides & Transactions</h2>
                <div className="mt-4">
                    <Table />
                </div>

            </div>

            <div className="pr-[20px] pl-[20px] flex flex-row-reverse justify-between w-full mt-6">
                {/* <div>"Click on Scooter to check its status."</div> */}

                <div>
                    <button className=" bg-[#F84848] text-white text-[16px] leading-[100%] font-semibold tracking-[0] font-[Plus_Jakarta_Sans]  gap-3 rounded-[90px] px-5 py-3">
                        {" "}
                        Request Servicing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile