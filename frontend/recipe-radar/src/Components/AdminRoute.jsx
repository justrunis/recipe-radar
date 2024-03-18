import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../Auth/auth";

const AdminRoute = ({ redirectPath = "/", children, token }) => {
  if (getUserRole(token) !== "admin") {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
