import Logout from "@/pages/Logout";
import { getDeliveryBoyOrders } from "@/services/deliveryBoyService";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const STATUS_STYLES = {
  ASSIGNED: "bg-[#E8A33D]/15 text-[#E8A33D]",
  SHIPPED: "bg-blue-100 text-blue-700",
  OUT_FOR_DELIVERY: "bg-[#E24A3B]/10 text-[#E24A3B]",
  DELIVERED: "bg-[#2F4C3B]/10 text-[#2F4C3B]",
  CANCELLED: "bg-red-100 text-red-700",
};

const DeliveryBoyDashboard = () => {
  const { token } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(
    async (showLoader = false) => {
      try {
        if (showLoader) setLoading(true);
        setError("");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const data = await getDeliveryBoyOrders(token);

        if (!Array.isArray(data)) {
          throw new Error("Invalid orders data received.");
        }

        setOrders(data);
      } catch (err) {
        console.error("Error fetching dashboard orders:", err);
        setError(err.message || "Failed to load dashboard data.");
      } finally {
        if (showLoader) setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) fetchOrders(true);
  }, [token, fetchOrders]);

  useEffect(() => {
    if (!token) return;
    const intervalId = setInterval(() => fetchOrders(false), 5000);
    return () => clearInterval(intervalId);
  }, [token, fetchOrders]);

  const getStatus = (order) => order?.orderStatus?.toUpperCase() || "";

  const totalOrders = orders.length;
  const assignedOrders = orders.filter((o) => getStatus(o) === "ASSIGNED").length;
  const shippedOrders = orders.filter((o) => getStatus(o) === "SHIPPED").length;
  const outForDeliveryOrders = orders.filter((o) => getStatus(o) === "OUT_FOR_DELIVERY").length;
  const deliveredOrders = orders.filter((o) => getStatus(o) === "DELIVERED").length;

  const currentOrder = orders.find((order) => {
    const status = getStatus(order);
    return status === "ASSIGNED" || status === "SHIPPED" || status === "OUT_FOR_DELIVERY";
  });

  const currentStatus = currentOrder ? getStatus(currentOrder) : "";

  const assignedCompleted = ["ASSIGNED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"].includes(currentStatus);
  const shippedCompleted = ["SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"].includes(currentStatus);
  const outForDeliveryCompleted = ["OUT_FOR_DELIVERY", "DELIVERED"].includes(currentStatus);
  const deliveredCompleted = currentStatus === "DELIVERED";

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FDF8F3] px-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#2F4C3B]/15 border-t-[#E24A3B] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FDF8F3] px-4">
        <div className="text-center">
          <p className="text-black mb-4">{error}</p>
          <button
            type="button"
            onClick={() => fetchOrders(true)}
            className="px-5 py-2 bg-[#E24A3B] text-white rounded-lg font-medium hover:bg-[#c73f31] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDF8F3] min-h-screen">
      {/* Header */}
      <div className="border-b border-[#2F4C3B]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-[#E24A3B] mb-1 tracking-wide">
                DELIVERY PANEL
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2F4C3B] truncate">
                Dashboard
              </h1>
              <p className="text-black/70 text-xs sm:text-sm mt-1 hidden sm:block">
                Overview of your assigned orders
              </p>
            </div>

            <div className="shrink-0">
              <Logout />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-4 sm:p-5 shadow-sm hover:shadow-md transition duration-200">
            <p className="text-xs sm:text-sm font-medium text-black">Total Orders</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2F4C3B] mt-1 sm:mt-2">
              {totalOrders}
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-4 sm:p-5 shadow-sm hover:shadow-md transition duration-200">
            <p className="text-xs sm:text-sm font-medium text-black">Assigned</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E8A33D] mt-1 sm:mt-2">
              {assignedOrders}
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-4 sm:p-5 shadow-sm hover:shadow-md transition duration-200">
            <p className="text-xs sm:text-sm font-medium text-black">Shipped</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mt-1 sm:mt-2">
              {shippedOrders}
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-4 sm:p-5 shadow-sm hover:shadow-md transition duration-200">
            <p className="text-xs sm:text-sm font-medium text-black">Out for Delivery</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E24A3B] mt-1 sm:mt-2">
              {outForDeliveryOrders}
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-4 sm:p-5 shadow-sm hover:shadow-md transition duration-200 col-span-2 sm:col-span-1">
            <p className="text-xs sm:text-sm font-medium text-black">Delivered</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2F4C3B] mt-1 sm:mt-2">
              {deliveredOrders}
            </h2>
          </div>
        </div>

        {/* Current order */}
        <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#2F4C3B]">Current Order</h2>
              <p className="text-xs sm:text-sm text-black/70 mt-1">
                Your latest active delivery order
              </p>
            </div>

            <button
              type="button"
              onClick={() => fetchOrders(true)}
              className="self-start sm:self-auto px-4 py-2 border border-[#2F4C3B]/20 rounded-lg text-sm font-medium text-[#2F4C3B] hover:bg-[#FDF8F3] transition"
            >
              Refresh
            </button>
          </div>

          {!currentOrder ? (
            <div className="text-center py-8 border border-dashed border-[#2F4C3B]/20 rounded-xl px-4">
              <p className="text-black font-medium">No active delivery</p>
              <p className="text-sm text-black/60 mt-1">
                You currently have no assigned order to deliver.
              </p>
            </div>
          ) : (
            <div className="border border-[#2F4C3B]/10 rounded-xl p-4 sm:p-5 bg-[#FDF8F3]/40">
              <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-xs text-black/50 uppercase tracking-wide">Order ID</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#2F4C3B] mt-1">
                    #{currentOrder.orderId}
                  </p>
                </div>

                <span
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap ${
                    STATUS_STYLES[currentStatus] || "bg-[#2F4C3B]/10 text-[#2F4C3B]"
                  }`}
                >
                  {currentStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#2F4C3B]/10">
                <div>
                  <p className="text-xs text-black/50 uppercase tracking-wide">Customer</p>
                  <p className="font-semibold text-black mt-1 text-sm sm:text-base break-words">
                    {currentOrder.customerName || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-black/50 uppercase tracking-wide">Order Amount</p>
                  <p className="font-semibold text-[#2F4C3B] mt-1 text-sm sm:text-base">
                    ₹{currentOrder.totalAmount || 0}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-black/50 uppercase tracking-wide">Payment Method</p>
                  <p className="font-semibold text-black mt-1 text-sm sm:text-base">
                    {currentOrder.paymentMethod || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-black/50 uppercase tracking-wide">Payment Status</p>
                  <p className="font-semibold text-black mt-1 text-sm sm:text-base">
                    {currentOrder.paymentStatus || "N/A"}
                  </p>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#2F4C3B]/10">
                <p className="text-sm font-semibold text-[#2F4C3B] mb-4">Delivery Progress</p>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      assignedCompleted ? "bg-[#E8A33D]" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      shippedCompleted ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      outForDeliveryCompleted ? "bg-[#E24A3B]" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      deliveredCompleted ? "bg-[#2F4C3B]" : "bg-gray-200"
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-1 text-[11px] sm:text-xs text-black/60 mt-2">
                  <span>Assigned</span>
                  <span className="text-center">Shipped</span>
                  <span className="sm:text-center">Out for Delivery</span>
                  <span className="text-right">Delivered</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-4 sm:p-6 shadow-sm">
          <div className="mb-4 sm:mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-[#2F4C3B]">Recent Orders</h2>
            <p className="text-xs sm:text-sm text-black/70 mt-1">
              Your latest assigned delivery orders
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-black">No orders assigned to you.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => {
                const status = getStatus(order);

                return (
                  <div
                    key={order.orderId}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 border-b border-[#2F4C3B]/10 last:border-b-0 pb-3 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-black truncate">
                        Order #{order.orderId}
                      </p>
                      <p className="text-sm text-black/60 truncate">
                        {order.customerName || "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                      <span className="font-medium text-[#2F4C3B]">
                        ₹{order.totalAmount || 0}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          STATUS_STYLES[status] || "bg-[#2F4C3B]/10 text-[#2F4C3B]"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyDashboard;