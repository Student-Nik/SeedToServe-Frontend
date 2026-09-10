import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import OrderHeader from "@/components/orderTracking/OrderHeader";
import OrderStatus from "@/components/orderTracking/OrderStatus";
import OrderItems from "@/components/orderTracking/OrderItems";
import DeliveryAddress from "@/components/orderTracking/DeliveryAddress";
import PaymentDetails from "@/components/orderTracking/PaymentDetails";
import PriceDetails from "@/components/orderTracking/PriceDetails";
import OrderActions from "@/components/orderTracking/OrderActions";

import { showToast } from "@/helpers/showToast";
import { getToken } from "@/utils/auth";

const MY_ORDERS_API = "http://localhost:8080/my/orders";
const CANCEL_ORDER_API = "http://localhost:8080/cancel/order";

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Format order

  const formatOrder = (selectedOrder) => {
    if (!selectedOrder) {
      return null;
    }

    const backendStatus = String(
      selectedOrder?.status ??
        selectedOrder?.orderStatus ??
        "PENDING"
    ).toUpperCase();

    console.log("FORMAT ORDER - BACKEND STATUS:", backendStatus);

    const statusMap = {
      PENDING: "PLACED",
      PLACED: "PLACED",
      ASSIGNED: "ASSIGNED",
      SHIPPED: "SHIPPED",
      OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
      DELIVERED: "DELIVERED",
      CANCELLED: "CANCELLED",
    };

    const orderStatus =
      statusMap[backendStatus] || backendStatus;

    let paymentStatus =
      selectedOrder?.paymentStatus || "";

    if (!paymentStatus) {
      if (
        String(
          selectedOrder?.paymentMethod
        ).toUpperCase() === "ONLINE"
      ) {
        paymentStatus = "Paid";
      } else {
        paymentStatus = "Pending";
      }
    }

    const shippingAddress =
      selectedOrder?.shippingAddress || "";

    return {
      orderId: selectedOrder.orderId,

      orderDate:
        selectedOrder.orderDate || "",

      expectedDeliveryDate:
        selectedOrder.expectedDeliveryDate || "",

      orderStatus,

      backendStatus,

      paymentMethod:
        selectedOrder.paymentMethod ||
        "CASH_ON_DELIVERY",

      paymentStatus,

      transactionId:
        selectedOrder.transactionId ||
        selectedOrder.razorpayPaymentId ||
        selectedOrder.paymentId ||
        "",

      totalAmount:
        Number(selectedOrder.totalAmount) || 0,

      itemsTotal:
        Number(selectedOrder.totalAmount) || 0,

      deliveryCharge:
        Number(selectedOrder.deliveryCharge) || 0,

      discount:
        Number(selectedOrder.discount) || 0,

      tax:
        Number(selectedOrder.tax) || 0,

      address: {
        shippingAddress,
        address: shippingAddress,
      },

      items:
        Array.isArray(selectedOrder.items)
          ? selectedOrder.items
          : [],

      totalItems:
        Number(selectedOrder.totalItems) || 0,
    };
  };

  // Fetch customer orders

  const fetchOrders = async () => {
    const token = getToken();

    if (!token) {
      showToast(
        "error",
        "Your session has expired. Please login again."
      );

      navigate("/login");

      return null;
    }

    const response = await fetch(
      MY_ORDERS_API,
      {
        method: "GET",

        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },

        cache: "no-store",
      }
    );

    const responseText =
      await response.text();

    console.log(
      "MY ORDERS API RESPONSE:",
      responseText
    );

    if (!response.ok) {
      throw new Error(
        responseText ||
          "Failed to fetch orders."
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

    return data;
  };

  // Load selected order

  const loadOrder = async () => {
    try {
      setLoading(true);

      if (!orderId) {
        console.error(
          "Order ID is missing from URL."
        );

        setOrder(null);
        return;
      }

      const data = await fetchOrders();

      if (!data) {
        return;
      }

      console.log(
        "Looking for order:",
        orderId
      );

      console.log(
        "Available orders:",
        data
      );

      const selectedOrder =
        data.find(
          (item) =>
            String(item?.orderId) ===
            String(orderId)
        );

      if (!selectedOrder) {
        throw new Error(
          `Order #${orderId} was not found.`
        );
      }

      console.log(
        "SELECTED ORDER:",
        selectedOrder
      );

      const formattedOrder =
        formatOrder(selectedOrder);

      setOrder(formattedOrder);

      console.log(
        "INITIAL FRONTEND STATUS:",
        formattedOrder.orderStatus
      );

    } catch (error) {
      console.error(
        "Fetch order details error:",
        error
      );

      showToast(
        "error",
        error.message ||
          "Failed to load order details."
      );

      setOrder(null);

    } finally {
      setLoading(false);
    }
  };

  // Initial load

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  // Refresh order status every 5 seconds
  useEffect(() => {
    if (!orderId) {
      return;
    }

    let intervalId;

    const refreshOrderStatus = async () => {
      try {
        const data = await fetchOrders();

        if (!Array.isArray(data)) {
          return;
        }

        const updatedOrder =
          data.find(
            (item) =>
              String(item?.orderId) ===
              String(orderId)
          );

        if (!updatedOrder) {
          console.log(
            "Order not found during refresh:",
            orderId
          );
          return;
        }

        console.log(
          "REFRESHED BACKEND ORDER:",
          updatedOrder
        );

        console.log(
          "REFRESHED BACKEND STATUS:",
          updatedOrder?.status
        );

        console.log(
          "REFRESHED ORDER STATUS:",
          updatedOrder?.orderStatus
        );

        const formattedOrder =
          formatOrder(updatedOrder);

        console.log(
          "FINAL FRONTEND STATUS:",
          formattedOrder?.orderStatus
        );

        setOrder(formattedOrder);

        // Stop polling after final status
        if (
          formattedOrder?.orderStatus ===
            "DELIVERED" ||
          formattedOrder?.orderStatus ===
            "CANCELLED"
        ) {
          clearInterval(intervalId);

          console.log(
            "Order completed. Polling stopped."
          );
        }

      } catch (error) {
        console.error(
          "Auto refresh order status error:",
          error
        );
      }
    };

    // Fetch immediately
    refreshOrderStatus();

    // Then every 5 seconds
    intervalId = setInterval(
      refreshOrderStatus,
      5000
    );

    return () => {
      clearInterval(intervalId);
    };

  }, [orderId]);

  const handleBackToOrders = () => {
    navigate(
      "/dashboard/order-details"
    );
  };

  const handleCancelOrder = async () => {
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

      if (!order?.orderId) {
        showToast(
          "error",
          "Order ID not found."
        );
        return;
      }

      if (
        order.orderStatus ===
        "CANCELLED"
      ) {
        showToast(
          "error",
          "This order is already cancelled."
        );
        return;
      }

      if (
        order.orderStatus === "SHIPPED" ||
        order.orderStatus ===
          "OUT_FOR_DELIVERY" ||
        order.orderStatus ===
          "DELIVERED"
      ) {
        showToast(
          "error",
          "This order cannot be cancelled now."
        );
        return;
      }

      const confirmed =
        window.confirm(
          `Are you sure you want to cancel Order #${order.orderId}?`
        );

      if (!confirmed) {
        return;
      }

      const response =
        await fetch(
          `${CANCEL_ORDER_API}/${order.orderId}`,
          {
            method: "POST",

            headers: {
              Accept: "*/*",
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const responseText =
        await response.text();

      if (!response.ok) {
        throw new Error(
          responseText ||
            "Failed to cancel order."
        );
      }

      setOrder(
        (previousOrder) => ({
          ...previousOrder,

          orderStatus:
            "CANCELLED",

          backendStatus:
            "CANCELLED",
        })
      );

      showToast(
        "success",
        responseText ||
          "Order cancelled successfully."
      );

    } catch (error) {
      console.error(
        "Cancel order error:",
        error
      );

      showToast(
        "error",
        error.message ||
          "Failed to cancel order."
      );
    }
  };

  const handleContinueShopping = () => {
    navigate("/dashboard");
  };

  const handleDownloadInvoice = () => {
    console.log(
      "Download invoice:",
      order?.orderId
    );

    alert(
      "Invoice API will be connected later."
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
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
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-black">
            Order Details Not Found
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            We could not find this order in your orders.
          </p>

          <button
            type="button"
            onClick={handleBackToOrders}
            className="
              mt-5
              px-5
              py-2.5
              rounded-lg
              bg-red-600
              text-white
              text-sm
              font-medium
              hover:bg-red-700
              transition
            "
          >
            Back to My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-6xl mx-auto px-4 pt-6">

        <button
          type="button"
          onClick={handleBackToOrders}
          className="
            mb-4
            text-sm
            font-medium
            text-gray-600
            hover:text-red-600
            transition
          "
        >
          ← Back to My Orders
        </button>

        <div className="mb-5">
          <OrderHeader
            order={order}
            onBack={handleBackToOrders}
          />
        </div>

        <OrderStatus
          orderStatus={order.orderStatus}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">

          <div className="lg:col-span-2 space-y-5">

            <OrderItems
              items={order.items}
            />

            <DeliveryAddress
              address={order.address}
            />

            <PaymentDetails
              order={order}
            />

          </div>

          <div className="space-y-5">

            <PriceDetails
              order={order}
            />

            <OrderActions
              order={order}
              onCancelOrder={
                handleCancelOrder
              }
              onContinueShopping={
                handleContinueShopping
              }
              onDownloadInvoice={
                handleDownloadInvoice
              }
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetailsPage;