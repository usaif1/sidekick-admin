import React from "react";
import { useLocation } from "react-router";
import icon from "@/assets/icon.svg";
import LiveBadges from "@/modules/home/screens/Dashboard/components/LiveBadges";

const Navbar: React.FC = () => {
  const location = useLocation();

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

  return (
    <div className="flex w-full justify-between items-center">
      {location.pathname === "/" ? (
        <LiveBadges />
      ) : (
        <h1 className="text-3xl font-bold">{getTitle()}</h1>
      )}
      <div className="flex gap-x-4">
        <img src={icon} alt="icon" />
        <div className="w-42 flex items-center px-4 py-1 gap-x-2 h-9 border border-black">
          <img width={20} height={20} src={icon} alt="icon" />
          <span className="font-bold text-sm">Dave Adams</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
