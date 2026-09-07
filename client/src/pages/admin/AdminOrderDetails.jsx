import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";
import { showToast } from "@/helpers/showToast";
import OrderStatusBadge from "@/components/admin/orders/OrderStatusBadge";
import DeliveryBoyAssignment from "@/components/admin/delivery/DeliveryBoyAssignment";


const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.user);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================
  // FETCH ORDER DETAILS
  // =========================================

  const fetchOrderDetails = useCallback(async () => {
    if (!token) {
      showToast("error", "Authentication token not found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8080/api/admin/orders/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const data = await response.json();

      setOrder(data);
    } catch (error) {
      console.error("Error fetching order details:", error);

      showToast("error", "Unable to load order details");

      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  // =========================================
  // FORMAT DATE
  // =========================================

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

  // =========================================
  // PAYMENT STATUS STYLE
  // =========================================

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // =========================================
  // PAYMENT METHOD
  // =========================================

  const formatPaymentMethod = (method) => {
    if (method === "CASH_ON_DELIVERY") {
      return "Cash on Delivery";
    }

    if (method === "ONLINE") {
      return "Online Payment";
    }

    return method || "N/A";
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 sm:p-16">
            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[#E24A3B] rounded-full animate-spin"></div>

              <p className="mt-4 text-sm text-gray-500">
                Loading order details...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================
  // ORDER NOT FOUND
  // =========================================

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
              <FaBoxOpen className="text-2xl text-[#E24A3B]" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#1C1C1C]">
              Order Not Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              We couldn't find the requested order.
            </p>

            <button
              onClick={() => navigate("/admin/orders")}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#E24A3B] text-white rounded-lg font-semibold text-sm hover:bg-[#c93d31] transition"
            >
              <FaArrowLeft />
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">

        {/* =========================================
            TOP HEADER
        ========================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <button
              onClick={() => navigate("/admin/orders")}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#E24A3B] transition mb-3"
            >
              <FaArrowLeft />
              Back to Orders
            </button>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C]">
              Order #{order.orderId}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              View complete information about this order
            </p>
          </div>

          <div>
            <OrderStatusBadge status={order.orderStatus} />
          </div>
        </div>

        {/* =========================================
            ORDER SUMMARY
        ========================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* Customer */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                <FaUser className="text-[#E24A3B]" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium">
                  Customer
                </p>

                <p className="text-base font-bold text-[#1C1C1C] truncate">
                  {order.customerName || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                <FaMoneyBillWave className="text-green-600" />
              </div>

              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Total Amount
                </p>

                <p className="text-xl font-bold text-[#1C1C1C]">
                  ₹{Number(order.totalAmount || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                <FaCreditCard className="text-blue-600" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium">
                  Payment
                </p>

                <p className="text-sm font-bold text-[#1C1C1C]">
                  {formatPaymentMethod(order.paymentMethod)}
                </p>

                <span
                  className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${getPaymentStatusStyle(
                    order.paymentStatus
                  )}`}
                >
                  {order.paymentStatus || "UNKNOWN"}
                </span>
              </div>
            </div>
          </div>

          {/* Order Date */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                <FaCalendarAlt className="text-purple-600" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium">
                  Order Date
                </p>

                <p className="text-sm font-bold text-[#1C1C1C]">
                  {formatDate(order.orderDate)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            MAIN CONTENT
        ========================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* =====================================
              ORDER ITEMS
          ===================================== */}

          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            <div className="px-5 sm:px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <FaBoxOpen className="text-[#E24A3B]" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#1C1C1C]">
                    Order Items
                  </h2>

                  <p className="text-sm text-gray-500">
                    Products included in this order
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {order.items && order.items.length > 0 ? (
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                    >

                      {/* Product Image */}
                      <div className="w-full sm:w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-white border border-gray-200">
                        {item.productImage ? (
                          <img
                            src={`data:image/jpeg;base64,${item.productImage}`}
                            alt={item.productName || "Product"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaBoxOpen className="text-2xl text-gray-300" />
                          </div>
                        )}
                      </div>

                      {/* Product Information */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1C1C1C]">
                          {item.productName || "Product"}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Product included in order
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaBoxOpen className="mx-auto text-3xl text-gray-300" />

                  <p className="mt-3 text-sm text-gray-500">
                    No items found for this order.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* =====================================
              DELIVERY ADDRESS
          ===================================== */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            <div className="px-5 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-[#E24A3B]" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#1C1C1C]">
                    Delivery Address
                  </h2>

                  <p className="text-sm text-gray-500">
                    Customer delivery location
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">

              {order.address ? (
                <div className="space-y-4">

                  {/* Name */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Name
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#1C1C1C]">
                      {order.address.fullName || "N/A"}
                    </p>
                  </div>

                  {/* Mobile */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Mobile
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <FaPhone className="text-[#E24A3B] text-xs" />

                      <p className="text-sm font-semibold text-[#1C1C1C]">
                        {order.address.mobileNo || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Address
                    </p>

                    <p className="mt-1 text-sm text-gray-700 leading-6">
                      {order.address.houseNoOrStreet},{" "}
                      {order.address.villageOrTown},{" "}
                      {order.address.district},{" "}
                      {order.address.state} -{" "}
                      {order.address.pincode}
                    </p>
                  </div>

                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Delivery address not available.
                </p>
              )}

            </div>
          </div>
        </div>

        {/* =========================================
            DELIVERY BOY ASSIGNMENT
        ========================================= */}

        <DeliveryBoyAssignment
          orderId={order.orderId}
          orderStatus={order.orderStatus}
        />

      </div>
    </div>
  );
};

export default AdminOrderDetails;