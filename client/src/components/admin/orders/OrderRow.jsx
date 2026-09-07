import React from "react";
import { useNavigate } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";

const OrderRow = ({ order }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/admin/orders/${order.orderId}`);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <tr className="border-b border-[#2F4C3B]/10 hover:bg-[#2F4C3B]/5 transition">
      {/* Order ID */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="font-semibold text-[#2F4C3B]">
          #{order.orderId}
        </span>
      </td>

      {/* Customer */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-[#2F4C3B]/80 font-medium">
          {order.customerName || "N/A"}
        </span>
      </td>

      {/* Amount */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="font-semibold text-[#2F4C3B]">
          ₹{Number(order.totalAmount || 0).toFixed(2)}
        </span>
      </td>

      {/* Payment Method */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-[#2F4C3B]/70">
          {order.paymentMethod === "CASH_ON_DELIVERY"
            ? "Cash on Delivery"
            : order.paymentMethod || "N/A"}
        </span>
      </td>

      {/* Payment Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            order.paymentStatus === "PAID"
              ? "bg-[#2F4C3B]/10 text-[#2F4C3B]"
              : order.paymentStatus === "PENDING"
              ? "bg-[#E8A33D]/15 text-[#E8A33D]"
              : "bg-[#2F4C3B]/10 text-[#2F4C3B]/60"
          }`}
        >
          {order.paymentStatus || "UNKNOWN"}
        </span>
      </td>

      {/* Order Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <OrderStatusBadge status={order.orderStatus} />
      </td>

      {/* Order Date */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-[#2F4C3B]/60">
          {formatDate(order.orderDate)}
        </span>
      </td>

      {/* Action */}
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={handleViewDetails}
          className="px-4 py-2 bg-[#E24A3B] text-white text-sm font-semibold rounded-lg hover:bg-[#c93d31] transition"
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;