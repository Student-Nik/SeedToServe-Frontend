import { updateOrderStatus } from "@/services/deliveryBoyService";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const DeliveryStatus = ({ order, onStatusUpdated }) => {
  const { token } = useSelector((state) => state.user);

  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const currentStatus = String(
    order?.orderStatus ?? order?.status ?? ""
  ).toUpperCase();

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      setError("");

      console.log("DELIVERY BOY TOKEN:", token);
      console.log("ORDER ID:", order.orderId);
      console.log("CURRENT STATUS:", currentStatus);
      console.log("NEW STATUS:", newStatus);

      if (!token) {
        throw new Error("Authentication token not found");
      }

      await updateOrderStatus(
        order.orderId,
        newStatus,
        token
      );

      if (onStatusUpdated) {
        await onStatusUpdated();
      }
    } catch (err) {
      console.error("Status update error:", err);

      setError(
        err.message || "Failed to update order status."
      );
    } finally {
      setUpdating(false);
    }
  };

  const getStatusStyle = () => {
    switch (currentStatus) {
      case "ASSIGNED":
        return "bg-[#E8A33D]/15 text-[#E8A33D]";

      case "SHIPPED":
        return "bg-blue-100 text-blue-700";

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
          {currentStatus || "UNKNOWN"}
        </span>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mb-3">
          {error}
        </p>
      )}

      {/* ASSIGNED → SHIPPED */}
      {currentStatus === "ASSIGNED" && (
        <button
          type="button"
          onClick={() => handleStatusUpdate("SHIPPED")}
          disabled={updating}
          className="
            w-full
            bg-[#E8A33D]
            hover:bg-[#d18f2f]
            text-white
            py-3
            rounded-lg
            font-medium
            disabled:opacity-50
            transition
          "
        >
          {updating ? "Updating..." : "Ship Order"}
        </button>
      )}

      {/* SHIPPED → OUT_FOR_DELIVERY */}
      {currentStatus === "SHIPPED" && (
        <button
          type="button"
          onClick={() =>
            handleStatusUpdate("OUT_FOR_DELIVERY")
          }
          disabled={updating}
          className="
            w-full
            bg-[#E24A3B]
            hover:bg-[#c73f31]
            text-white
            py-3
            rounded-lg
            font-medium
            disabled:opacity-50
            transition
          "
        >
          {updating ? "Updating..." : "Start Delivery"}
        </button>
      )}

      {/* OUT_FOR_DELIVERY → DELIVERED */}
      {currentStatus === "OUT_FOR_DELIVERY" && (
        <button
          type="button"
          onClick={() =>
            handleStatusUpdate("DELIVERED")
          }
          disabled={updating}
          className="
            w-full
            bg-[#2F4C3B]
            hover:bg-[#243b2f]
            text-white
            py-3
            rounded-lg
            font-medium
            disabled:opacity-50
            transition
          "
        >
          {updating ? "Updating..." : "Mark as Delivered"}
        </button>
      )}

      {/* DELIVERED */}
      {currentStatus === "DELIVERED" && (
        <div className="text-center text-[#2F4C3B] font-medium">
          ✓ Order Delivered
        </div>
      )}

      {/* CANCELLED */}
      {currentStatus === "CANCELLED" && (
        <div className="text-center text-red-600 font-medium">
          Order Cancelled
        </div>
      )}

    </div>
  );
};

export default DeliveryStatus;