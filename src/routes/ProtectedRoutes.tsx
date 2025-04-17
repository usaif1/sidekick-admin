import React from "react";
import { Routes, Route } from "react-router";
import DashboardLayout from "@/modules/home/layout";
import HomePage from "@/modules/home";
import Credits from "@/modules/credits";
import Users from "@/modules/users";
import Scooters from "@/modules/scooters";
// import UserProfile from "@/modules/users/components/userProfile"

const ProtectedRoutes: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<UserProfile />}> */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="credits" element={<Credits />} />
        <Route path="users" element={<Users />} />
        <Route path="scooters" element={<Scooters />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
