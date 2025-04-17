// dependencies
import React from "react";
import { Routes, Route } from "react-router";

// screens
import Auth  from "@/modules/auth/login";

const UnProtectedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index Component={Auth} />
      </Route>
    </Routes>
  );
};

export default UnProtectedRoutes;
