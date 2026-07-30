import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyFarmerAllowed = () => {
  const { role } = useSelector(
    (state) => state.user
  );

  if (role !== "FARMER") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default OnlyFarmerAllowed;