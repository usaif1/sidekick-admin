import Badge from "@/components/Badge";
import React from "react";

const LiveBadges: React.FC = () => {
  return (
    <div className="flex gap-x-4">
      <Badge data="3" badgeTitle="Users Riding" />
      <Badge data="10" badgeTitle="Active Scooters" />
      <Badge data="55.2km" badgeTitle="Covered by Users Today" />
      <Badge data="2" badgeTitle="Scooters Under Maintenance" />
    </div>
  );
};

export default LiveBadges;
