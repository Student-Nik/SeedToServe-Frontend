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
        return "bg-yellow-100 text-yellow-700";

      case "OUT_FOR_DELIVERY":
        return "bg-blue-100 text-blue-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="border-t pt-4 mt-4">

      {/* Current Status */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 font-medium">
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium disabled:opacity-50"
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
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {updating
            ? "Updating..."
            : "Mark as Delivered"}
        </button>
      )}

      {/* DELIVERED */}
      {order.orderStatus === "DELIVERED" && (
        <div className="text-center text-green-600 font-medium">
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
