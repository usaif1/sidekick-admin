import React from "react";
import Table from "../../../components/Navbar/components/userProfileTable.tsx";

type Props = {
  data: any;
};

const UserProfile: React.FC<Props> = ({ data }) => {
  return (
    <div className="p-5">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-6">
        {/* User Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold">
              {data.user_organizations[0].user.full_name}
            </h1>
            <span className="h-3 w-3 rounded-full bg-[#18F27A]" />
          </div>

          <div className="flex gap-4 text-sm">
            <span className="text-blue-600 font-semibold">Employee ID</span>
            <span className="text-gray-700">
              {data.user_organizations[0].employee_id}
            </span>
          </div>

          <div className="flex gap-4 text-sm">
            <span className="text-blue-600 font-semibold">Wallet Balance</span>
            <span className="text-gray-700">
              {data.user_organizations[0].user.wallet?.balance ?? "NA"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="bg-red-500 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-red-600 transition">
            Block User
          </button>
          <button className="bg-green-400 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-green-500 transition">
            Assign Credit
          </button>
        </div>
      </div>

      {/* Recent Rides Section */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">
          Recent Rides & Transactions
        </h2>
        <Table />
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-end mt-8">
        <button className="bg-red-500 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-red-600 transition">
          Request Servicing
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
