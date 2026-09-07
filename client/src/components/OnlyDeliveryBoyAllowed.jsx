import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyDeliveryBoyAllowed = () => {
  const { role } = useSelector((state) => state.user);

  if (role !== "DELIVERY_BOY") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default OnlyDeliveryBoyAllowed;
