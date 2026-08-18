import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET ORDER ID FROM URL
  // =====================================================

  const stateOrderId = location.state?.orderId;

  const searchParams = new URLSearchParams(location.search);
  const queryOrderId = searchParams.get("orderId");

  const requestedOrderId =
    queryOrderId || stateOrderId;


  // =====================================================
  // FORMAT ORDER
  // =====================================================

  const formatOrder = (selectedOrder) => {
    if (!selectedOrder) {
      return null;
    }

    const backendStatus = String(
      selectedOrder?.status || "PENDING"
    ).toUpperCase();

    const statusMap = {
      PENDING: "PLACED",
      PLACED: "PLACED",
      CONFIRMED: "CONFIRMED",
      SHIPPED: "SHIPPED",
      OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
      DELIVERED: "DELIVERED",
      CANCELLED: "CANCELLED",
    };

    const orderStatus =
      statusMap[backendStatus] ||
      backendStatus;


    // ===================================================
    // PAYMENT STATUS
    // ===================================================

    let paymentStatus =
      selectedOrder?.paymentStatus || "";

    if (!paymentStatus) {
      if (
        selectedOrder?.paymentMethod === "ONLINE"
      ) {
        paymentStatus = "Paid";
      } else {
        paymentStatus = "Pending";
      }
    }


    // ===================================================
    // FORMAT ADDRESS
    // ===================================================

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

      // Keep the complete shipping address.
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


  // =====================================================
  // FETCH ALL ORDERS
  // =====================================================

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
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseText =
      await response.text();

    console.log(
      "My Orders Response:",
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


  // =====================================================
  // FETCH ORDERS WHEN PAGE OPENS
  // =====================================================

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);

        const data = await fetchOrders();

        // Save ALL orders.
        setOrders(data);

        if (data.length === 0) {
          setOrder(null);
          return;
        }


        // =================================================
        // IF SPECIFIC ORDER WAS REQUESTED
        // =================================================

        if (requestedOrderId) {
          const selectedOrder =
            data.find(
              (item) =>
                String(item?.orderId) ===
                String(requestedOrderId)
            );

          if (!selectedOrder) {
            throw new Error(
              `Order #${requestedOrderId} was not found.`
            );
          }

          setOrder(
            formatOrder(selectedOrder)
          );

          return;
        }


        // =================================================
        // NO ORDER ID
        //
        // Do NOT select data[0].
        //
        // We want to show ALL orders.
        // =================================================

        setOrder(null);

      } catch (error) {
        console.error(
          "Fetch orders error:",
          error
        );

        showToast(
          "error",
          error.message ||
            "Failed to load orders."
        );

        setOrders([]);
        setOrder(null);

      } finally {
        setLoading(false);
      }
    };

    loadOrders();

  }, [requestedOrderId, navigate]);


  // =====================================================
  // OPEN ORDER DETAILS
  // =====================================================

  const handleViewOrder = (orderId) => {
    navigate(
      `/dashboard/order-details?orderId=${orderId}`
    );
  };


  // =====================================================
  // BACK TO ALL ORDERS
  // =====================================================

  const handleBackToOrders = () => {
    navigate("/dashboard/order-details");
  };


  // =====================================================
  // CANCEL ORDER
  // =====================================================

  const handleCancelOrder = async () => {
    try {
      const token = getToken();

      if (!token) {
        showToast(
          "error",
          "Your session has expired. Please login again."
        );
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

      console.log(
        "Cancel Order Response:",
        responseText
      );

      if (!response.ok) {
        throw new Error(
          responseText ||
            "Failed to cancel order."
        );
      }


      // ================================================
      // UPDATE CURRENT ORDER
      // ================================================

      setOrder(
        (previousOrder) => ({
          ...previousOrder,

          orderStatus:
            "CANCELLED",

          backendStatus:
            "CANCELLED",
        })
      );


      // ================================================
      // UPDATE ORDER IN ALL ORDERS LIST
      // ================================================

      setOrders(
        (previousOrders) =>
          previousOrders.map(
            (item) =>
              String(item.orderId) ===
              String(order.orderId)
                ? {
                    ...item,
                    status:
                      "CANCELLED",
                  }
                : item
          )
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


  // =====================================================
  // CONTINUE SHOPPING
  // =====================================================

  const handleContinueShopping = () => {
    navigate("/dashboard");
  };


  // =====================================================
  // DOWNLOAD INVOICE
  // =====================================================

  const handleDownloadInvoice = () => {
    console.log(
      "Download invoice:",
      order?.orderId
    );

    alert(
      "Invoice API will be connected later."
    );
  };


  // =====================================================
  // LOADING
  // =====================================================

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
            Loading your orders...
          </p>

        </div>

      </div>
    );
  }


  // =====================================================
  // ALL ORDERS PAGE
  //
  // /dashboard/order-details
  // =====================================================

  if (!requestedOrderId) {

    return (
      <div className="min-h-screen bg-gray-50 pb-10">

        <div className="max-w-6xl mx-auto px-4 pt-6">

          {/* ========================================= */}
          {/* PAGE HEADER */}
          {/* ========================================= */}

          <div className="mb-6">

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <h1 className="text-xl font-semibold text-black">
                    My Orders
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    View and track all your orders
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/dashboard")
                  }
                  className="
                    px-4
                    py-2
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    text-sm
                    font-medium
                    text-black
                    hover:bg-gray-50
                    transition
                  "
                >
                  Continue Shopping
                </button>

              </div>

            </div>

          </div>


          {/* ========================================= */}
          {/* NO ORDERS */}
          {/* ========================================= */}

          {orders.length === 0 ? (

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">

              <h2 className="text-lg font-semibold text-black">
                No Orders Yet
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                You have not placed any orders yet.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard")
                }
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
                Start Shopping
              </button>

            </div>

          ) : (

            /* ========================================= */
            /* ALL ORDERS */
            /* ========================================= */

            <div className="space-y-5">

              {orders.map(
                (item, index) => {

                  const formattedOrder =
                    formatOrder(item);

                  if (!formattedOrder) {
                    return null;
                  }

                  return (
                    <div
                      key={
                        item?.orderId ||
                        index
                      }
                      className="
                        bg-white
                        rounded-xl
                        shadow-sm
                        border
                        border-gray-100
                        p-5
                      "
                    >

                      {/* ================================= */}
                      {/* ORDER TOP */}
                      {/* ================================= */}

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                          <h2 className="text-lg font-semibold text-black">
                            Order #
                            {formattedOrder.orderId}
                          </h2>

                          <p className="text-sm text-gray-500 mt-1">
                            {formattedOrder.orderDate}
                          </p>

                        </div>


                        {/* STATUS */}

                        <div>

                          <span
                            className={`
                              inline-flex
                              items-center
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-medium
                              ${
                                formattedOrder.orderStatus ===
                                "DELIVERED"
                                  ? "bg-green-50 text-green-600"
                                  : formattedOrder.orderStatus ===
                                    "CANCELLED"
                                  ? "bg-gray-100 text-gray-600"
                                  : "bg-red-50 text-red-600"
                              }
                            `}
                          >
                            {formattedOrder.orderStatus ===
                            "OUT_FOR_DELIVERY"
                              ? "Out for Delivery"
                              : formattedOrder.orderStatus}
                          </span>

                        </div>

                      </div>


                      {/* ================================= */}
                      {/* ORDER CONTENT */}
                      {/* ================================= */}

                      <div className="border-t border-gray-100 mt-5 pt-5">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                          {/* ITEMS */}

                          <div className="flex items-center gap-4">

                            <div className="flex -space-x-3">

                              {formattedOrder.items
                                .slice(0, 3)
                                .map(
                                  (
                                    orderItem,
                                    itemIndex
                                  ) => {

                                    const image =
                                      orderItem?.productImage ||
                                      orderItem?.image ||
                                      "";

                                    return (
                                      <div
                                        key={
                                          orderItem?.productId ||
                                          itemIndex
                                        }
                                        className="
                                          w-12
                                          h-12
                                          rounded-lg
                                          bg-gray-100
                                          border-2
                                          border-white
                                          overflow-hidden
                                        "
                                      >

                                        {image ? (

                                          <img
                                            src={image}
                                            alt={
                                              orderItem?.productName ||
                                              "Product"
                                            }
                                            className="
                                              w-full
                                              h-full
                                              object-cover
                                            "
                                          />

                                        ) : (

                                          <div className="
                                            w-full
                                            h-full
                                            flex
                                            items-center
                                            justify-center
                                            text-xs
                                            text-gray-400
                                          ">
                                            —
                                          </div>

                                        )}

                                      </div>
                                    );
                                  }
                                )}

                            </div>


                            <div>

                              <p className="text-sm font-medium text-black">

                                {formattedOrder.items.length}{" "}

                                {formattedOrder.items.length ===
                                1
                                  ? "item"
                                  : "items"}

                              </p>

                              <p className="text-xs text-gray-500 mt-1">

                                {formattedOrder.items
                                  .slice(0, 2)
                                  .map(
                                    (
                                      product
                                    ) =>
                                      product?.productName
                                  )
                                  .filter(Boolean)
                                  .join(
                                    ", "
                                  )}

                                {formattedOrder.items
                                  .length > 2
                                  ? "..."
                                  : ""}

                              </p>

                            </div>

                          </div>


                          {/* TOTAL */}

                          <div className="md:text-right">

                            <p className="text-xs text-gray-500">
                              Total Amount
                            </p>

                            <p className="text-lg font-semibold text-black mt-1">
                              ₹
                              {formattedOrder.totalAmount.toFixed(
                                2
                              )}
                            </p>

                          </div>


                          {/* VIEW BUTTON */}

                          <button
                            type="button"
                            onClick={() =>
                              handleViewOrder(
                                formattedOrder.orderId
                              )
                            }
                            className="
                              w-full
                              md:w-auto
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
                            View Order
                          </button>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          )}

        </div>

      </div>
    );
  }


  // =====================================================
  // SELECTED ORDER DETAILS PAGE
  //
  // /dashboard/order-details?orderId=11
  // =====================================================

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
            onClick={
              handleBackToOrders
            }
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


  // =====================================================
  // SELECTED ORDER DETAILS
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 pb-10">

      <div className="max-w-6xl mx-auto px-4 pt-6">

        {/* ============================================= */}
        {/* BACK TO ALL ORDERS */}
        {/* ============================================= */}

        <button
          type="button"
          onClick={
            handleBackToOrders
          }
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


        {/* ============================================= */}
        {/* ORDER HEADER */}
        {/* ============================================= */}

        <div className="mb-5">

          <OrderHeader
            order={order}
            onBack={
              handleBackToOrders
            }
          />

        </div>


        {/* ============================================= */}
        {/* ORDER STATUS */}
        {/* ============================================= */}

        <OrderStatus
          orderStatus={
            order.orderStatus
          }
        />


        {/* ============================================= */}
        {/* ORDER CONTENT */}
        {/* ============================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">

          {/* =========================================== */}
          {/* LEFT */}
          {/* =========================================== */}

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


          {/* =========================================== */}
          {/* RIGHT */}
          {/* =========================================== */}

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