import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminLoggedIn } from "../../utils/storage";

export default function AdminRoute() {
  const isLoggedIn = isAdminLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
