import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { showToast } from "@/helpers/showToast";
import { getToken } from "@/utils/auth";

const MY_ORDERS_API = "http://localhost:8080/my/orders";

const MyOrdersPage = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = getToken();

      if (!token) {
        showToast(
          "error",
          "Your session has expired. Please login again."
        );
        navigate("/login");
        return;
      }

      const response = await fetch(MY_ORDERS_API, {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseText = await response.text();

      console.log("My Orders Response:", responseText);

      if (!response.ok) {
        throw new Error(
          responseText || "Failed to fetch orders."
        );
      }

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Invalid response received from orders API."
        );
      }

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid orders data received from server."
        );
      }

      setOrders(data);
    } catch (error) {
      console.error("Fetch my orders error:", error);

      showToast(
        "error",
        error.message || "Failed to load your orders."
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatus = (order) => {
    const status = String(
      order?.status ??
        order?.orderStatus ??
        "PENDING"
    ).toUpperCase();

    switch (status) {
      case "PENDING":
      case "PLACED":
        return "PLACED";

      case "ASSIGNED":
        return "ASSIGNED";

      case "SHIPPED":
        return "SHIPPED";

      case "OUT_FOR_DELIVERY":
        return "OUT_FOR_DELIVERY";

      case "DELIVERED":
        return "DELIVERED";

      case "CANCELLED":
        return "CANCELLED";

      default:
        return status;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-gray-100 text-gray-700";

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
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewOrder = (orderId) => {
    if (!orderId) {
      showToast("error", "Order ID not found.");
      return;
    }

    console.log("Opening order:", orderId);

    navigate(`/dashboard/order-details/${orderId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div
            className="
              w-10
              h-10
              border-4
              border-gray-200
              border-t-red-600
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="text-sm text-gray-500 mt-4">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-6xl mx-auto px-4 pt-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2F4C3B]">
            My Orders
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mt-1">
            View and track all your orders.
          </p>
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="text-5xl mb-4">
              📦
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No Orders Found
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              You have not placed any orders yet.
            </p>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="
                mt-5
                px-5
                py-2.5
                rounded-lg
                bg-[#E24A3B]
                hover:bg-[#c73f31]
                text-white
                text-sm
                font-medium
                transition
              "
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Orders */
          <div className="space-y-5">
            {orders.map((order) => {
              const status = getStatus(order);

              return (
                <div
                  key={order.orderId}
                  className="
                    bg-white
                    rounded-xl
                    shadow-sm
                    border
                    border-gray-100
                    p-5
                    sm:p-6
                  "
                >
                  {/* Top */}
                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-3
                      mb-5
                    "
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-[#2F4C3B]">
                        Order #{order.orderId}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {order.orderDate
                          ? new Date(
                              order.orderDate
                            ).toLocaleString()
                          : "Date not available"}
                      </p>
                    </div>

                    <span
                      className={`
                        self-start
                        sm:self-auto
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                        ${getStatusStyle(status)}
                      `}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Order Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-5">

                    <div>
                      <p className="text-sm text-gray-500">
                        Total Amount
                      </p>

                      <p className="text-lg font-semibold text-[#2F4C3B] mt-1">
                        ₹{Number(order.totalAmount) || 0}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Payment
                      </p>

                      <p className="font-medium text-gray-800 mt-1">
                        {order.paymentMethod ||
                          "CASH_ON_DELIVERY"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Items
                      </p>

                      <p className="font-medium text-gray-800 mt-1">
                        {Array.isArray(order.items)
                          ? order.items.length
                          : order.totalItems || 0}
                      </p>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-4
                      border-t
                      border-gray-100
                      mt-5
                      pt-5
                    "
                  >
                    <div>
                      {order.expectedDeliveryDate && (
                        <p className="text-sm text-gray-500">
                          Expected Delivery:{" "}
                          <span className="font-medium text-gray-700">
                            {new Date(
                              order.expectedDeliveryDate
                            ).toLocaleDateString()}
                          </span>
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleViewOrder(
                          order.orderId
                        )
                      }
                      className="
                        w-full
                        sm:w-auto
                        px-5
                        py-2.5
                        rounded-lg
                        bg-[#E24A3B]
                        hover:bg-[#c73f31]
                        text-white
                        text-sm
                        font-medium
                        transition
                      "
                    >
                      View Order →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;