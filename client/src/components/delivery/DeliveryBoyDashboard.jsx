import { getDeliveryBoyOrders } from "@/services/deliveryBoyService";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DeliveryBoyDashboard = () => {
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
      console.error("Error fetching dashboard orders:", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Calculate dashboard statistics
  const totalOrders = orders.length;

  const assignedOrders = orders.filter(
    (order) => order.orderStatus === "ASSIGNED"
  ).length;

  const outForDeliveryOrders = orders.filter(
    (order) => order.orderStatus === "OUT_FOR_DELIVERY"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "DELIVERED"
  ).length;

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">
          {error}
        </p>

        <button
          onClick={fetchOrders}
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Dashboard Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Delivery Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of your assigned orders
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Total Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {totalOrders}
          </h2>
        </div>

        {/* Assigned */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500">
            Assigned
          </p>

          <h2 className="text-3xl font-bold text-yellow-600 mt-2">
            {assignedOrders}
          </h2>
        </div>

        {/* Out for Delivery */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500">
            Out for Delivery
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {outForDeliveryOrders}
          </h2>
        </div>

        {/* Delivered */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500">
            Delivered
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {deliveredOrders}
          </h2>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your latest assigned orders
            </p>
          </div>

          <button
            onClick={fetchOrders}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No orders assigned to you.
            </p>
          </div>
        ) : (
          <div className="space-y-3">

            {orders.slice(0, 5).map((order) => (
              <div
                key={order.orderId}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b last:border-b-0 pb-3 last:pb-0"
              >

                {/* Order Information */}
                <div>
                  <p className="font-medium text-gray-800">
                    Order #{order.orderId}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.customerName}
                  </p>
                </div>

                {/* Amount and Status */}
                <div className="flex items-center gap-4">

                  <span className="font-medium text-gray-700">
                    ₹{order.totalAmount}
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {order.orderStatus}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default DeliveryBoyDashboard;
