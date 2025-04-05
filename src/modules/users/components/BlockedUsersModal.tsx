import React from "react";

const blockedUsers = [
  { name: "David Powell", employeeId: "12345" },
  { name: "Jane Doe", employeeId: "67890" },
  { name: "John Smith", employeeId: "54321" },
];

const BlockedUsersModal: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="font-semibold text-xl">Blocked Users</h1>
      <p className="text-sm text-gray-400">
        Please click on Unblock to reinstate riding rights.
      </p>

      {/* Container for the blocked user rows */}
      <div className="w-[30vw] mt-4 space-y-4">
        {blockedUsers.map((user, index) => (
          <div key={index} className="flex justify-between items-center">
            {/* Left side: Name + Employee ID */}
            <div>
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-sm space-x-1.5">
                <span className="text-icon-primary font-bold">Employee ID</span>
                <span className="text-gray-500">{user.employeeId}</span>
              </p>
            </div>

            {/* Right side: Unblock button */}
            <button className="bg-blue-500 text-white p-4 font-bold rounded-xl hover:bg-blue-600">
              Unblock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockedUsersModal;
