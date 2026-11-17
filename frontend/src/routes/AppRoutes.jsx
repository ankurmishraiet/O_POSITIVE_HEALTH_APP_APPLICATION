
import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "../pages/Admin/AdminLogin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
    </Routes>
  );
};

export default AppRoutes;
