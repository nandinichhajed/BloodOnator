import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedUserRoutes = () => {
  const { token } = useSelector((state) => state.user);

  // If user is not authenticated navigating to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedUserRoutes;
