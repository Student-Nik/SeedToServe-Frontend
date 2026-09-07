import { updateOrderStatus } from "@/services/deliveryBoyService";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const DeliveryStatus = ({ order, onStatusUpdated }) => {
  // Get JWT token from Redux
  const { token } = useSelector((state) => state.user);

  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      setError("");

      console.log("DELIVERY BOY TOKEN:", token);

      if (!token) {
        throw new Error("Authentication token not found");
      }

      await updateOrderStatus(
        order.orderId,
        newStatus,
        token
      );

      // Refresh orders after successful status update
      if (onStatusUpdated) {
        await onStatusUpdated();
      }

    } catch (err) {
      console.error("Status update error:", err);
      setError("Failed to update order status.");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusStyle = () => {
    switch (order.orderStatus) {
      case "ASSIGNED":
        return "bg-[#E8A33D]/15 text-[#E8A33D]";

      case "OUT_FOR_DELIVERY":
        return "bg-[#E24A3B]/10 text-[#E24A3B]";

      case "DELIVERED":
        return "bg-[#2F4C3B]/10 text-[#2F4C3B]";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-[#2F4C3B]/10 text-black";
    }
  };

  return (
    <div className="border-t border-[#2F4C3B]/10 pt-4 mt-4">

      {/* Current Status */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-black/70 font-medium">
          Order Status
        </span>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle()}`}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mb-3">
          {error}
        </p>
      )}

      {/* Status Actions */}

      {/* ASSIGNED → OUT_FOR_DELIVERY */}
      {order.orderStatus === "ASSIGNED" && (
        <button
          onClick={() =>
            handleStatusUpdate("OUT_FOR_DELIVERY")
          }
          disabled={updating}
          className="w-full bg-[#E24A3B] hover:bg-[#c73f31] text-white py-3 rounded-lg font-medium disabled:opacity-50 transition"
        >
          {updating
            ? "Updating..."
            : "Start Delivery"}
        </button>
      )}

      {/* OUT_FOR_DELIVERY → DELIVERED */}
      {order.orderStatus === "OUT_FOR_DELIVERY" && (
        <button
          onClick={() =>
            handleStatusUpdate("DELIVERED")
          }
          disabled={updating}
          className="w-full bg-[#2F4C3B] hover:bg-[#243b2f] text-white py-3 rounded-lg font-medium disabled:opacity-50 transition"
        >
          {updating
            ? "Updating..."
            : "Mark as Delivered"}
        </button>
      )}

      {/* DELIVERED */}
      {order.orderStatus === "DELIVERED" && (
        <div className="text-center text-[#2F4C3B] font-medium">
          ✓ Order Delivered
        </div>
      )}

      {/* CANCELLED */}
      {order.orderStatus === "CANCELLED" && (
        <div className="text-center text-red-600 font-medium">
          Order Cancelled
        </div>
      )}

    </div>
  );
};

export default DeliveryStatus;