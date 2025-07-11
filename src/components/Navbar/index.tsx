import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import bell from "@/assets/bell.svg";
import user from "@/assets/user.svg";
import LiveBadges from "@/modules/home/components/LiveBadges";
import homeService from "@/modules/home/service/home.service";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState<any>(null);

  // Determine the title based on the current route pathname
  const getTitle = () => {
    switch (location.pathname) {
      case "/credits":
        return "Credits";
      case "/users":
        return "Users";
      case "/scooters":
        return "Scooters";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await homeService.getManagerProfile();
      setUserDetails(userDetails);
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="flex w-full justify-between items-center">
      {location.pathname === "/" ? (
        <LiveBadges />
      ) : (
        <h1 className="text-3xl font-bold">{getTitle()}</h1>
      )}
      <div className="flex items-end gap-x-4">
        <div className="w-9 h-9 flex items-center bg-card-background justify-center rounded-full border-1 text-center border-border-primary">
          <img width={16} height={16} src={bell} alt="icon" />
        </div>
        <div className="cursor-pointer flex justify-center bg-card-background items-center px-4 py-1 gap-x-2 h-9 border border-border-primary rounded-full">
          <img
            width={16}
            height={16}
            src={user}
            style={{ filter: "brightness(0) saturate(100%)" }}
            alt="icon"
          />
          <span className="font-bold text-sm">
            {userDetails?.full_name || "Dave Adams"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
