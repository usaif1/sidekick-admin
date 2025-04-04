import React from "react";
import { Routes, Route } from "react-router";
import Login from "@/modules/auth/login.tsx";
import DashboardLayout from "@/modules/home/layout";
import HomePage from "@/modules/home/screens/Dashboard";
import Credits from "@/modules/credits";
import Users from "@/modules/users";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="credits" element={<Credits />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default Router;
