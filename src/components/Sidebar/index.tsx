import React from "react";
import logo from "@/assets/logo.png";
import { links } from "./data";
import { Link } from "react-router";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-sidebar-primary flex flex-col items-center justify-center px-2 py-1">
      <div className="h-[70vh] flex flex-col items-center gap-y-12">
        <img width={80} height={105} src={logo} alt="logo" />
        <div className="flex flex-col gap-y-4">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.route}
              className="text-white font-bold"
            >
              <div className="flex gap-x-4">
                <img src={link.icon} alt="no_icon" />
                <span>{link.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
