import React from "react";
import { Routes, Route } from "react-router";
import DashboardLayout from "../modules/home/layout";
import HomePage from "@/modules/home/screens/Dashboard";
import Credits from "@/modules/credits";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="credits" element={<Credits />} />
      </Route>
    </Routes>
  );
};

export default Router;
