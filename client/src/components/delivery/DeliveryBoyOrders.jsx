import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDeliveryBoyOrders } from "@/services/deliveryBoyService";
import DeliveryOrderCard from "./DeliveryOrderCard";

const DeliveryBoyOrders = () => {
  // Get JWT token from Redux
  const { token } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("DELIVERY BOY TOKEN:", token);

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const data = await getDeliveryBoyOrders(token);

      setOrders(data);
    } catch (err) {
      console.error("Error fetching delivery orders:", err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FDF8F3]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#2F4C3B]/15 border-t-[#E24A3B] rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-black text-sm">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FDF8F3]">
        <div className="text-center">
          <p className="text-black mb-4">
            {error}
          </p>

          <button
            onClick={fetchOrders}
            className="px-5 py-2 bg-[#E24A3B] text-white rounded-lg font-medium hover:bg-[#c73f31] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#FDF8F3]">
        <div className="text-center">
          <p className="text-black text-lg">
            No orders assigned to you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-[#E24A3B] mb-1 tracking-wide">
            DELIVERY PANEL
          </p>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2F4C3B]">
            My Orders
          </h1>

          <p className="text-black text-sm mt-1">
            All orders currently assigned to you
          </p>
        </div>

        {/* ================= ORDER LIST ================= */}
        <div className="space-y-4">
          {orders.map((order) => (
            <DeliveryOrderCard
              key={order.orderId}
              order={order}
              onStatusUpdated={fetchOrders}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default DeliveryBoyOrders;