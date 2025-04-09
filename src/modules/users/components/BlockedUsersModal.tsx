import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { FETCH_BLOCKED_USERS } from "@/graphql/queries/fetchBlockedUsers";

const BlockedUsersModal: React.FC = () => {
  const [fetchBlockedUsers, { data, loading, error }] = useLazyQuery(FETCH_BLOCKED_USERS, {
    fetchPolicy: "network-only",
  });

  // Trigger the query as soon as the modal is mounted/open
  useEffect(() => {
    fetchBlockedUsers();
  }, [fetchBlockedUsers]);

  // Prepare the blocked users list from fetched data
  const blockedUsers =
    data?.user_organizations?.map((org: any) => ({
      name: org.user.full_name,
      employeeId: org.employee_id,
      user_id: org.user.id,
      org_id: org.organization_id
    })) || [];

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="font-semibold text-xl">Blocked Users</h1>
      <p className="text-sm text-gray-400">
        Please click on Unblock to reinstate riding rights.
      </p>

      {/* Show loading or error states if necessary */}
      {loading && <p className="text-gray-500 mt-4">Loading blocked users...</p>}
      {error && (
        <p className="text-red-500 mt-4">Error loading blocked users: {error.message}</p>
      )}

      {/* Container for the blocked user rows */}
      <div className="w-[30vw] mt-4 space-y-4">
        {(!loading && !error && blockedUsers.length === 0) && (
          <p className="text-gray-500">No blocked users found.</p>
        )}

        {blockedUsers.map((user: any, index: number) => (
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
            <button className="bg-blue-500 cursor-pointer text-white p-4 font-bold rounded-xl hover:bg-blue-600">
              Unblock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockedUsersModal;
