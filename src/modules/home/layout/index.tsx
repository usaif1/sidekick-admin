import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../../../components/Sidebar";
import Navbar from "@/components/Navbar";

const DashboardLayout: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-white">
      <div className="h-full flex">
        <Sidebar />
        <div className="w-full h-full pt-5 px-10">
          <Navbar />
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
