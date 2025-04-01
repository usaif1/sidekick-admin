import React from "react";

type Props = {
  data: string;
  badgeTitle: string;
};

const Badge: React.FC<Props> = ({ data, badgeTitle }) => {
  return (
    <div className="flex justify-center px-2 py-1 text-sm gap-x-2 border border-black rounded-lg">
      <p className="font-bold">{data}</p>
      <p>{badgeTitle}</p>
    </div>
  );
};

export default Badge;
