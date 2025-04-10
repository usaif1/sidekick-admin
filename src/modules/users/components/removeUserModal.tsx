import Table from "./removeUsersTable.tsx"
const RemoveUserModal: React.FC = () => {
    return (
        // parent ......we can remove mt-[-20px]. for testing only
        <div className="text-center items-center flex flex-col left-[5833px] rounded-[12px] gap-6 mt-[-25px]">
            <div className="w-[672px] h-[49px] gap-1 flex flex-col items-centre">
                <h1 className="w-[672px] h-[25px] font-jakarta font-bold text-[20px] leading-[100%] tracking-[0%] text-center text-xl">Remove Users</h1>
                <p className="w-[672px] h-[20px] font-jakarta font-normal text-[16px] leading-[100%] tracking-[0%] text-center text-[#86A0CA] text-sm ">Please select the users that are to be removed.</p>
            </div>

            {/* second componenet  */}
            <div className="w-[672px] h-[36px] gap-2 flex items-center">
                {/* Input with search icon */}
                <div className="w-[585px] h-[36px] rounded-[12px] border border-solid gap-3 p-2 flex items-center border-[#296AEB] px-[8px] ">
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
                        placeholder="Search Users"
                        className="w-full h-full outline-none bg-transparent text-black placeholder:text-gray-400"
                    />
                </div>

                {/* Button */}
                <button
                    className="w-[79px] h-[36px] rounded-[12px] gap-3 px-3 py-2 bg-[#296AEB] font-[Plus Jakarta Sans] font-bold text-[12px] leading-[100%] tracking-[0%] bg-blue-600 text-white px-4 py-1.5 font-[Plus Jakarta Sans] "
                >
                    Select All
                </button>
            </div>

            {/* table  */}
            <div className="w-[672px] h-full rounded-[12px] gap-5  ">
                <Table />
            </div>
            {/* mt-[-300px] */}
            <div className="w-[672px] h-[44px] gap-[10px]  flex justify-center"> 
                <button className="w-[104px] h-[44px] rounded-[90px] gap-[12px] px-[20px] py-[12px] bg-[#F84848] text-[16px] leading-[100%] font-semibold tracking-[0] font-[Plus_Jakarta_Sans] text-white">
                    {" "}
                    Remove
                </button>
            </div>
        </div>
    );
};

export default RemoveUserModal