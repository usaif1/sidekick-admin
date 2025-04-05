import React from "react";

type Props = {
  data: string;
  badgeTitle: string;
};

const Badge: React.FC<Props> = ({ data, badgeTitle }) => {
  return (
    <div className="flex justify-center px-2 py-1 bg-tabs-primary text-sm gap-x-2 rounded-lg">
      <p className="font-semibold">{data}</p>
      <p>{badgeTitle}</p>
    </div>
  );
};

export default Badge;
