import React from "react";

type Props = {
  data: any;
};

const UserAddedModal: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-xl">Users Added!</h1>
      <p className="text-sm text-gray-400">
        {"The following user(s) have been added:"}
      </p>
      <div className="mt-2 flex flex-col gap-y-2">
        {data.map((user: any) => (
          <div className="bg-card-background w-full px-4 py-3 rounded-2xl flex justify-between gap-x-8 items-start text-sm font-medium text-[#4F4F4F]">
            <div className="flex flex-col space-y-2 text-gray-400">
              <div>Name</div>
              <div>Unique ID</div>
            </div>
            <div className="flex flex-col space-y-2 text-right">
              <div>{user.user.full_name}</div>
              <div>{user.user_id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAddedModal;
