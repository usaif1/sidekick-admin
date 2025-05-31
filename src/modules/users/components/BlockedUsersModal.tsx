import React, { useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { FETCH_BLOCKED_USERS } from "@/graphql/queries/fetchBlockedUsers";
import { ACTIVATE_BLOCKED_USER } from "@/graphql/mutations/activateBlockedUser";
import { getOrgIdFromClaims } from "@/utils/claims";

const BlockedUsersModal: React.FC = () => {
  const [fetchBlockedUsers, { data, loading, error, refetch }] = useLazyQuery(
    FETCH_BLOCKED_USERS,
    {
      fetchPolicy: "network-only",
    }
  );

  const [activateBlockedUser, { loading: activating }] = useMutation(
    ACTIVATE_BLOCKED_USER
  );

  // Trigger the query on mount
  useEffect(() => {
    fetchBlockedUsers();
  }, [fetchBlockedUsers]);

  const blockedUsers =
    data?.user_organizations?.map((org: any) => ({
      name: org.user.full_name,
      employeeId: org.employee_id,
      user_id: org.user.id,
      org_id: org.organization_id,
    })) || [];

  const handleUnblock = async (user_id: string) => {
    try {
      const orgId = await getOrgIdFromClaims();
      await activateBlockedUser({
        variables: {
          user_id,
          organization_id: orgId
        },
      });
      await refetch(); // Refresh list
    } catch (err) {
      console.error("Failed to unblock user:", err);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="font-semibold text-xl">Blocked Users</h1>
      <p className="text-sm text-gray-400">
        Please click on Unblock to reinstate riding rights.
      </p>

      {loading && (
        <p className="text-gray-500 mt-4">Loading blocked users...</p>
      )}
      {error && (
        <p className="text-red-500 mt-4">
          Error loading blocked users: {error.message}
        </p>
      )}

      <div className="w-[30vw] mt-4 space-y-4">
        {!loading && !error && blockedUsers.length === 0 && (
          <p className="text-gray-500">No blocked users found.</p>
        )}

        {blockedUsers.map((user: any, index: number) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-sm space-x-1.5">
                <span className="text-icon-primary font-bold">Employee ID</span>
                <span className="text-gray-500">{user.employeeId}</span>
              </p>
            </div>

            <button
              onClick={() => handleUnblock(user.user_id)}
              disabled={activating}
              className="bg-blue-500 cursor-pointer text-white p-4 font-bold rounded-xl hover:bg-blue-600"
            >
              {activating ? "Unblocking..." : "Unblock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockedUsersModal;
