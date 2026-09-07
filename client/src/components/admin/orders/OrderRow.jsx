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
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
      {/* Order ID */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="font-semibold text-[#1C1C1C]">
          #{order.orderId}
        </span>
      </td>

      {/* Customer */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-gray-700 font-medium">
          {order.customerName || "N/A"}
        </span>
      </td>

      {/* Amount */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="font-semibold text-[#1C1C1C]">
          ₹{Number(order.totalAmount || 0).toFixed(2)}
        </span>
      </td>

      {/* Payment Method */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-600">
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
              ? "bg-green-100 text-green-700"
              : order.paymentStatus === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700"
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
        <span className="text-sm text-gray-500">
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