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
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">
          Loading orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">
          {error}
        </p>

        <button
          onClick={fetchOrders}
          className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">
          No orders assigned to you.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <DeliveryOrderCard
          key={order.orderId}
          order={order}
          onStatusUpdated={fetchOrders}
        />
      ))}
    </div>
  );
};

export default DeliveryBoyOrders;