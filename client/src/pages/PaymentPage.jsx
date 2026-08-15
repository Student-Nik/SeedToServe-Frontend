import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PaymentHeader from "@/components/Payment/PaymentHeader";
import PaymentOrderSummary from "@/components/Payment/PaymentOrderSummary";
import PaymentMethod from "@/components/Payment/PaymentMethod";
import PaymentPriceDetails from "@/components/Payment/PaymentPriceDetails";
import PaymentSuccess from "@/components/Payment/PaymentSuccess";

import { showToast } from "@/helpers/showToast";
import { getToken } from "@/utils/auth";

const CREATE_ORDER_API = "http://localhost:8080/create/order";

const CREATE_PAYMENT_API = "http://localhost:8080/api/payment/create-payment";

const VERIFY_PAYMENT_API = "http://localhost:8080/api/payment/verify-payment";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = getToken();

  // =====================================================
  // DATA RECEIVED FROM ORDER PAGE
  // =====================================================

  const {
    address,
    cartItems = [],
    totals = {},
    grandTotal = 0,
    mrpTotal = 0,
    savings = 0,
    deliveryFee = 0,
  } = location.state || {};

  // =====================================================
  // STATE
  // =====================================================

  const [paymentMethod, setPaymentMethod] = useState("");

  const [loading, setLoading] = useState(false);

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [createdOrderId, setCreatedOrderId] = useState(null);

  // =====================================================
  // VALIDATE PAGE DATA
  // =====================================================

  if (!location.state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Invalid Payment Session
          </h2>

          <p className="text-gray-500 mt-2">
            Please return to your cart and try again.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/cart")}
            className="mt-5 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // CREATE ORDER
  // =====================================================

const createOrder = async () => {
  // =====================================================
  // VALIDATION
  // =====================================================

  if (!token) {
    throw new Error(
      "Your session has expired. Please login again."
    );
  }

  if (!address?.id) {
    throw new Error(
      "Delivery address not found."
    );
  }

  if (!cartItems || cartItems.length === 0) {
    throw new Error(
      "Your cart is empty."
    );
  }

  if (!paymentMethod) {
    throw new Error(
      "Please select a payment method."
    );
  }


  // =====================================================
  // PREPARE CART ITEMS
  // =====================================================

  const items = cartItems.map((item) => {

    const price =
      Number(item?.price || 0);

    const quantity =
      Number(item?.quantity || 0);

    const totalPrice =
      Number(item?.totalPrice || item?.subtotal || 0) ||
      price * quantity;


    return {
      productId:
        Number(
          item?.productId ||
          item?.product?.id
        ),

      productName:
        item?.productName ||
        item?.name ||
        item?.product?.name ||
        "Product",

      quantity,

      price,

      totalPrice,

      // Your cart response is using imageBase64
      productImage:
        item?.productImage ||
        item?.imageBase64 ||
        item?.image ||
        "",
    };
  });


  // =====================================================
  // REQUEST BODY
  // =====================================================

  const requestBody = {

    addressId:
      Number(address.id),

    paymentMethod:
      paymentMethod,

    items:
      items,
  };


  console.log(
    "================================="
  );

  console.log(
    "CREATE ORDER REQUEST"
  );

  console.log(
    JSON.stringify(
      requestBody,
      null,
      2
    )
  );

  console.log(
    "================================="
  );


  // =====================================================
  // API CALL
  // =====================================================

  const response = await fetch(
    CREATE_ORDER_API,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body:
        JSON.stringify(
          requestBody
        ),
    }
  );


  // =====================================================
  // RESPONSE
  // =====================================================

  const responseText =
    await response.text();


  console.log(
    "Create Order Response:",
    responseText
  );


  if (!response.ok) {

    throw new Error(
      responseText ||
      "Failed to create order"
    );
  }


  // =====================================================
  // PARSE RESPONSE
  // =====================================================

  let data;

  try {

    data =
      JSON.parse(
        responseText
      );

  } catch {

    data =
      responseText;
  }


  console.log(
    "Created Order:",
    data
  );


  return data;
};

  // =====================================================
  // EXTRACT ORDER ID
  // =====================================================

  const extractOrderId = (data) => {
    if (!data) {
      return null;
    }

    if (typeof data === "string") {
      return null;
    }

    return (
      data?.orderId ||
      data?.id ||
      data?.order?.id ||
      data?.data?.orderId ||
      data?.data?.id ||
      null
    );
  };

  // =====================================================
  // LOAD RAZORPAY SCRIPT
  // =====================================================

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);

        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // =====================================================
  // CREATE RAZORPAY PAYMENT
  // =====================================================

  const createRazorpayPayment = async (orderId) => {
    console.log("Creating Razorpay payment for order:", orderId);

    const response = await fetch(`${CREATE_PAYMENT_API}/${orderId}`, {
      method: "POST",

      headers: {
        Accept: "*/*",

        Authorization: `Bearer ${token}`,
      },
    });

    const responseText = await response.text();

    console.log("Create Payment Response:", responseText);

    if (!response.ok) {
      throw new Error(responseText || "Failed to create Razorpay payment");
    }

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }

    return data;
  };

  // =====================================================
  // EXTRACT RAZORPAY DETAILS
  // =====================================================

  const extractRazorpayDetails = (paymentData) => {
    const razorpayOrderId =
      paymentData?.razorpayOrderId ||
      paymentData?.razorpay_order_id ||
      paymentData?.razorpayOrder?.id ||
      paymentData?.orderId ||
      paymentData?.id ||
      paymentData?.data?.razorpayOrderId ||
      paymentData?.data?.razorpay_order_id ||
      paymentData?.data?.id;

    const amount =
      paymentData?.amount ||
      paymentData?.data?.amount ||
      Number(grandTotal) * 100;

    const currency =
      paymentData?.currency || paymentData?.data?.currency || "INR";

    const key =
      paymentData?.key ||
      paymentData?.keyId ||
      paymentData?.razorpayKey ||
      paymentData?.razorpayKeyId ||
      paymentData?.data?.key ||
      paymentData?.data?.keyId;

    return {
      razorpayOrderId,

      amount,

      currency,

      key,
    };
  };

  // =====================================================
  // VERIFY PAYMENT
  // =====================================================

  const verifyPayment = async ({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  }) => {
    const requestBody = {
      razorpayOrderId,

      razorpayPaymentId,

      razorpaySignature,
    };

    console.log("Verify Payment Request:", requestBody);

    const response = await fetch(VERIFY_PAYMENT_API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();

    console.log("Verify Payment Response:", responseText);

    if (!response.ok) {
      throw new Error(responseText || "Payment verification failed");
    }

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }

    return data;
  };

  // =====================================================
  // OPEN RAZORPAY
  // =====================================================

  const openRazorpay = async (orderId) => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      throw new Error("Razorpay SDK failed to load.");
    }

    // ================================================
    // Create Razorpay payment
    // ================================================

    const paymentData = await createRazorpayPayment(orderId);

    console.log("Razorpay Data:", paymentData);

    // ================================================
    // Extract Razorpay details
    // ================================================

    const { razorpayOrderId, amount, currency, key } =
      extractRazorpayDetails(paymentData);

    if (!razorpayOrderId) {
      throw new Error("Razorpay Order ID not received from server.");
    }

    if (!key) {
      throw new Error("Razorpay Key not received from server.");
    }

    // ================================================
    // Razorpay Options
    // ================================================

    const options = {
      key,

      amount,

      currency,

      name: "SeedToServe",

      description: `Payment for Order #${orderId}`,

      order_id: razorpayOrderId,

      // ==============================================
      // SUCCESS
      // ==============================================

      handler: async function (response) {
        try {
          setLoading(true);

          console.log("Razorpay Success:", response);

          await verifyPayment({
            razorpayOrderId: response.razorpay_order_id,

            razorpayPaymentId: response.razorpay_payment_id,

            razorpaySignature: response.razorpay_signature,
          });

          // ========================================
          // Payment verified
          // ========================================

          setCreatedOrderId(orderId);

          setOrderSuccess(true);

          showToast("success", "Payment successful and order confirmed!");
        } catch (error) {
          console.error("Payment verification error:", error);

          showToast("error", error.message || "Payment verification failed");
        } finally {
          setLoading(false);
        }
      },

      // ==============================================
      // PREFILL
      // ==============================================

      prefill: {
        name: address?.fullName || "",

        contact: address?.mobileNo || "",
      },

      // ==============================================
      // NOTES
      // ==============================================

      notes: {
        orderId: String(orderId),
      },

      // ==============================================
      // THEME
      // ==============================================

      theme: {
        color: "#000000",
      },

      // ==============================================
      // MODAL
      // ==============================================

      modal: {
        ondismiss: function () {
          setLoading(false);

          showToast("error", "Payment cancelled");
        },
      },
    };

    // ================================================
    // Razorpay object
    // ================================================

    const razorpay = new window.Razorpay(options);

    // ================================================
    // PAYMENT FAILED
    // ================================================

    razorpay.on("payment.failed", function (response) {
      console.error("Razorpay payment failed:", response);

      setLoading(false);

      showToast("error", response?.error?.description || "Payment failed");
    });

    // ================================================
    // OPEN RAZORPAY
    // ================================================

    razorpay.open();
  };

  // =====================================================
  // HANDLE CASH ON DELIVERY
  // =====================================================

  const handleCashOnDelivery = async () => {
    try {
      setLoading(true);

      const orderData = await createOrder();

      console.log("COD Order Created:", orderData);

      const orderId = extractOrderId(orderData);

      setCreatedOrderId(orderId);

      setOrderSuccess(true);

      showToast("success", "Order placed successfully!");
    } catch (error) {
      console.error("COD order error:", error);

      showToast("error", error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HANDLE ONLINE PAYMENT
  // =====================================================

  const handleOnlinePayment = async () => {
    try {
      setLoading(true);

      // ===============================================
      // STEP 1
      // Create application order
      // ===============================================

      const orderData = await createOrder();

      console.log("Online Order Created:", orderData);

      // ===============================================
      // STEP 2
      // Get order ID
      // ===============================================

      const orderId = extractOrderId(orderData);

      if (!orderId) {
        throw new Error("Order ID was not returned by create order API.");
      }

      // ===============================================
      // STEP 3
      // Open Razorpay
      // ===============================================

      await openRazorpay(orderId);
    } catch (error) {
      console.error("Online payment error:", error);

      showToast("error", error.message || "Unable to start online payment");

      setLoading(false);
    }
  };

  // =====================================================
  // HANDLE PAYMENT
  // =====================================================

  const handlePayment = async () => {
    if (!token) {
      showToast("error", "Your session has expired. Please login again.");

      return;
    }

    if (!paymentMethod) {
      showToast("error", "Please select a payment method");

      return;
    }

    if (!address?.id) {
      showToast("error", "Delivery address not found.");

      return;
    }

    if (!cartItems.length) {
      showToast("error", "Your cart is empty.");

      return;
    }

    // ================================================
    // COD
    // ================================================

    if (paymentMethod === "CASH_ON_DELIVERY") {
      await handleCashOnDelivery();

      return;
    }

    // ================================================
    // ONLINE
    // ================================================

    if (paymentMethod === "ONLINE") {
      await handleOnlinePayment();

      return;
    }
  };

  // =====================================================
  // ORDER SUCCESS SCREEN
  // =====================================================

  if (orderSuccess) {
    return (
      <PaymentSuccess
        orderId={createdOrderId}
        paymentMethod={paymentMethod}
        onContinue={() => navigate("/dashboard")}
      />
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-6xl mx-auto px-4 pt-6">
        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}

        <PaymentHeader onBack={() => navigate(-1)} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* ========================================== */}
          {/* LEFT SECTION */}
          {/* ========================================== */}

          <div className="lg:col-span-2 space-y-5">
            {/* ORDER SUMMARY */}

            <PaymentOrderSummary cartItems={cartItems} />

            {/* DELIVERY ADDRESS */}
            {/* DELIVERY ADDRESS */}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-semibold text-black mb-3">
                Delivery Address
              </h2>

              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-black">{address?.fullName}</p>

                <p>{address?.mobileNo}</p>

                <p>{address?.houseNoOrStreet}</p>

                <p>
                  {address?.villageOrTown}, {address?.district}
                </p>

                <p>
                  {address?.state} -{" "}
                  <span className="font-medium text-red-500">
                    {address?.pincode}
                  </span>
                </p>
              </div>
            </div>

            {/* PAYMENT METHOD */}

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>

          {/* ========================================== */}
          {/* RIGHT SECTION */}
          {/* ========================================== */}

          <div>
            <PaymentPriceDetails
              mrpTotal={mrpTotal}
              deliveryFee={deliveryFee}
              savings={savings}
              grandTotal={grandTotal}
              paymentMethod={paymentMethod}
              onPay={handlePayment}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
