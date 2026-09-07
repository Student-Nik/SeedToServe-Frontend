import Logout from "@/pages/Logout";
import { getDeliveryBoyOrders } from "@/services/deliveryBoyService";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const STATUS_STYLES = {
  ASSIGNED: "bg-[#E8A33D]/15 text-[#E8A33D]",
  OUT_FOR_DELIVERY: "bg-[#E24A3B]/10 text-[#E24A3B]",
  DELIVERED: "bg-[#2F4C3B]/10 text-[#2F4C3B]",
};

const DeliveryBoyDashboard = () => {
  // Get JWT token from Redux
  const { token } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH ORDERS =================

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

  // ================= STATISTICS =================

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

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FDF8F3]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#2F4C3B]/15 border-t-[#E24A3B] rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-black text-sm">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ================= ERROR =================

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

  // ================= CURRENT ORDER =================

  const currentOrder = orders.find(
    (order) =>
      order.orderStatus === "ASSIGNED" ||
      order.orderStatus === "OUT_FOR_DELIVERY"
  );

  return (
    <div className="bg-[#FDF8F3]">

      {/* ================= HEADER ================= */}

      <div className="border-b border-[#2F4C3B]/10 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {/* Header Title */}

            <div>
              <p className="text-sm font-semibold text-[#E24A3B] mb-1 tracking-wide">
                DELIVERY PANEL
              </p>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2F4C3B]">
                Dashboard
              </h1>

              <p className="text-black text-sm mt-1">
                Overview of your assigned orders
              </p>
            </div>

            {/* Logout Button */}

            <div className="w-fit">
              <Logout />
            </div>

          </div>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ================= STATISTICS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Total Orders */}

          <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-5 shadow-sm hover:shadow-md transition duration-200">

            <p className="text-sm font-medium text-black">
              Total Orders
            </p>

            <h2 className="text-3xl font-extrabold text-[#2F4C3B] mt-2">
              {totalOrders}
            </h2>

          </div>

          {/* Assigned */}

          <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-5 shadow-sm hover:shadow-md transition duration-200">

            <p className="text-sm font-medium text-black">
              Assigned
            </p>

            <h2 className="text-3xl font-extrabold text-[#E8A33D] mt-2">
              {assignedOrders}
            </h2>

          </div>

          {/* Out For Delivery */}

          <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-5 shadow-sm hover:shadow-md transition duration-200">

            <p className="text-sm font-medium text-black">
              Out for Delivery
            </p>

            <h2 className="text-3xl font-extrabold text-[#E24A3B] mt-2">
              {outForDeliveryOrders}
            </h2>

          </div>

          {/* Delivered */}

          <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-5 shadow-sm hover:shadow-md transition duration-200">

            <p className="text-sm font-medium text-black">
              Delivered
            </p>

            <h2 className="text-3xl font-extrabold text-[#2F4C3B] mt-2">
              {deliveredOrders}
            </h2>

          </div>

        </div>

        {/* ================= CURRENT ORDER ================= */}

        <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-6 shadow-sm">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

            <div>

              <h2 className="text-xl font-bold text-[#2F4C3B]">
                Current Order
              </h2>

              <p className="text-sm text-black/70 mt-1">
                Your latest active delivery order
              </p>

            </div>

            <button
              onClick={fetchOrders}
              className="px-4 py-2 border border-[#2F4C3B]/20 rounded-lg text-sm font-medium text-[#2F4C3B] hover:bg-[#FDF8F3] transition"
            >
              Refresh
            </button>

          </div>

          {!currentOrder ? (

            <div className="text-center py-8 border border-dashed border-[#2F4C3B]/20 rounded-xl">

              <p className="text-black font-medium">
                No active delivery
              </p>

              <p className="text-sm text-black/60 mt-1">
                You currently have no assigned order to deliver.
              </p>

            </div>

          ) : (

            <div className="border border-[#2F4C3B]/10 rounded-xl p-5 bg-[#FDF8F3]/40">

              {/* ================= ORDER HEADER ================= */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>

                  <p className="text-xs text-black/50 uppercase tracking-wide">
                    Order ID
                  </p>

                  <p className="text-2xl font-bold text-[#2F4C3B] mt-1">
                    #{currentOrder.orderId}
                  </p>

                </div>

                <span
                  className={`self-start sm:self-auto px-4 py-2 rounded-full text-xs font-semibold ${
                    STATUS_STYLES[currentOrder.orderStatus] ||
                    "bg-[#2F4C3B]/10 text-[#2F4C3B]"
                  }`}
                >
                  {currentOrder.orderStatus}
                </span>

              </div>

              {/* ================= ORDER DETAILS ================= */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6 pt-5 border-t border-[#2F4C3B]/10">

                {/* Customer */}

                <div>

                  <p className="text-xs text-black/50 uppercase tracking-wide">
                    Customer
                  </p>

                  <p className="font-semibold text-black mt-1">
                    {currentOrder.customerName || "N/A"}
                  </p>

                </div>

                {/* Amount */}

                <div>

                  <p className="text-xs text-black/50 uppercase tracking-wide">
                    Order Amount
                  </p>

                  <p className="font-semibold text-[#2F4C3B] mt-1">
                    ₹{currentOrder.totalAmount || 0}
                  </p>

                </div>

                {/* Payment */}

                <div>

                  <p className="text-xs text-black/50 uppercase tracking-wide">
                    Payment Method
                  </p>

                  <p className="font-semibold text-black mt-1">
                    {currentOrder.paymentMethod || "N/A"}
                  </p>

                </div>

                {/* Payment Status */}

                <div>

                  <p className="text-xs text-black/50 uppercase tracking-wide">
                    Payment Status
                  </p>

                  <p className="font-semibold text-black mt-1">
                    {currentOrder.paymentStatus || "N/A"}
                  </p>

                </div>

              </div>

              {/* ================= DELIVERY PROGRESS ================= */}

              <div className="mt-6 pt-5 border-t border-[#2F4C3B]/10">

                <p className="text-sm font-semibold text-[#2F4C3B] mb-4">
                  Delivery Progress
                </p>

                <div className="flex items-center gap-2">

                  {/* Assigned */}

                  <div
                    className={`h-2 flex-1 rounded-full ${
                      [
                        "ASSIGNED",
                        "OUT_FOR_DELIVERY",
                        "DELIVERED",
                      ].includes(currentOrder.orderStatus)
                        ? "bg-[#E8A33D]"
                        : "bg-gray-200"
                    }`}
                  />

                  {/* Out For Delivery */}

                  <div
                    className={`h-2 flex-1 rounded-full ${
                      [
                        "OUT_FOR_DELIVERY",
                        "DELIVERED",
                      ].includes(currentOrder.orderStatus)
                        ? "bg-[#E24A3B]"
                        : "bg-gray-200"
                    }`}
                  />

                  {/* Delivered */}

                  <div
                    className={`h-2 flex-1 rounded-full ${
                      currentOrder.orderStatus === "DELIVERED"
                        ? "bg-[#2F4C3B]"
                        : "bg-gray-200"
                    }`}
                  />

                </div>

                <div className="flex justify-between text-xs text-black/60 mt-2">

                  <span>
                    Assigned
                  </span>

                  <span>
                    Out for Delivery
                  </span>

                  <span>
                    Delivered
                  </span>

                </div>

              </div>

            </div>

          )}

        </div>

        {/* ================= RECENT ORDERS ================= */}

        <div className="bg-white rounded-xl border border-[#2F4C3B]/10 p-6 shadow-sm">

          <div className="mb-5">

            <h2 className="text-xl font-bold text-[#2F4C3B]">
              Recent Orders
            </h2>

            <p className="text-sm text-black/70 mt-1">
              Your latest assigned delivery orders
            </p>

          </div>

          {orders.length === 0 ? (

            <div className="text-center py-8">

              <p className="text-black">
                No orders assigned to you.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {orders.slice(0, 5).map((order) => (

                <div
                  key={order.orderId}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#2F4C3B]/10 last:border-b-0 pb-3 last:pb-0"
                >

                  {/* Order Information */}

                  <div>

                    <p className="font-medium text-black">
                      Order #{order.orderId}
                    </p>

                    <p className="text-sm text-black/60">
                      {order.customerName}
                    </p>

                  </div>

                  {/* Amount and Status */}

                  <div className="flex items-center gap-4">

                    <span className="font-medium text-[#2F4C3B]">
                      ₹{order.totalAmount}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        STATUS_STYLES[order.orderStatus] ||
                        "bg-[#2F4C3B]/10 text-[#2F4C3B]"
                      }`}
                    >
                      {order.orderStatus}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default DeliveryBoyDashboard;