import React from "react";
import {
  FiCheckCircle,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";

const PaymentSuccess = ({
  orderId,
  paymentMethod,
  onContinue,
}) => {
  const isCashOnDelivery =
    paymentMethod === "CASH_ON_DELIVERY";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">

        {/* ============================================ */}
        {/* SUCCESS ICON */}
        {/* ============================================ */}

        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <FiCheckCircle
              size={48}
              className="text-green-600"
            />
          </div>
        </div>

        {/* ============================================ */}
        {/* TITLE */}
        {/* ============================================ */}

        <h1 className="text-2xl font-bold text-gray-800">
          Order Confirmed!
        </h1>

        <p className="text-gray-500 mt-2 leading-relaxed">
          Your order has been placed successfully.
          {isCashOnDelivery
            ? " Please keep the payment amount ready when your order is delivered."
            : " Your payment has been successfully verified."}
        </p>

        {/* ============================================ */}
        {/* ORDER ID */}
        {/* ============================================ */}

        {orderId && (
          <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Order ID
            </p>

            <p className="font-semibold text-gray-800 mt-1">
              #{orderId}
            </p>
          </div>
        )}

        {/* ============================================ */}
        {/* PAYMENT METHOD */}
        {/* ============================================ */}

        <div className="mt-4 flex items-center justify-center gap-2">
          {isCashOnDelivery ? (
            <FiShoppingBag
              size={17}
              className="text-green-600"
            />
          ) : (
            <FiCheckCircle
              size={17}
              className="text-green-600"
            />
          )}

          <p className="text-sm text-gray-500">
            Payment Method:
          </p>

          <span className="text-sm font-medium text-gray-800">
            {isCashOnDelivery
              ? "Cash on Delivery"
              : "Online Payment"}
          </span>
        </div>

        {/* ============================================ */}
        {/* STATUS */}
        {/* ============================================ */}

        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50">
          <span className="w-2 h-2 rounded-full bg-green-500" />

          <span className="text-sm font-medium text-green-700">
            {isCashOnDelivery
              ? "Order Placed"
              : "Payment Verified"}
          </span>
        </div>

        {/* ============================================ */}
        {/* CONTINUE SHOPPING */}
        {/* ============================================ */}

        <button
          type="button"
          onClick={onContinue}
          className="w-full mt-7 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 active:bg-gray-900 transition flex items-center justify-center gap-2"
        >
          Continue Shopping

          <FiArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
