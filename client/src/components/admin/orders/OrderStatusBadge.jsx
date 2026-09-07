import React from "react";

const OrderStatusBadge = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "PLACED":
        return "bg-blue-100 text-blue-700";

      case "CONFIRMED":
        return "bg-indigo-100 text-indigo-700";

      case "SHIPPED":
        return "bg-purple-100 text-purple-700";

      case "OUT_FOR_DELIVERY":
        return "bg-orange-100 text-orange-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle()}`}
    >
      {status || "UNKNOWN"}
    </span>
  );
};

export default OrderStatusBadge;