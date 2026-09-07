import React from "react";

const OrderStatusBadge = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "PLACED":
        return "bg-[#2F4C3B]/10 text-[#2F4C3B]";

      case "CONFIRMED":
        return "bg-[#2F4C3B]/15 text-[#2F4C3B] border border-[#2F4C3B]/20";

      case "SHIPPED":
        return "bg-[#E8A33D]/15 text-[#E8A33D]";

      case "OUT_FOR_DELIVERY":
        return "bg-[#E8A33D]/25 text-[#b9791f] border border-[#E8A33D]/30";

      case "DELIVERED":
        return "bg-[#2F4C3B] text-white";

      case "CANCELLED":
        return "bg-[#E24A3B]/10 text-[#E24A3B]";

      case "PENDING":
        return "bg-[#E8A33D]/10 text-[#b9791f]";

      default:
        return "bg-[#2F4C3B]/10 text-[#2F4C3B]/60";
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