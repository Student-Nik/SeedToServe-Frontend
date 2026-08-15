import React from "react";
import {
  FiCheckCircle,
  FiCreditCard,
  FiTruck,
} from "react-icons/fi";

const PaymentPriceDetails = ({
  mrpTotal,
  deliveryFee,
  savings,
  grandTotal,
  paymentMethod,
  onPay,
  loading,
}) => {
  const productTotal = Number(mrpTotal || 0);
  const shippingFee = Number(deliveryFee || 0);
  const totalSavings = Number(savings || 0);
  const totalAmount = Number(grandTotal || 0);

  const isOnline = paymentMethod === "ONLINE";

  const isCashOnDelivery =
    paymentMethod === "CASH_ON_DELIVERY";

  const isDisabled =
    loading || !paymentMethod;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-5">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <h2 className="text-lg font-semibold text-black mb-5">
        Price Details
      </h2>


      {/* ================================================= */}
      {/* PRICE DETAILS */}
      {/* ================================================= */}

      <div className="space-y-3 text-sm">

        {/* PRODUCT TOTAL */}

        <div className="flex justify-between items-center">

          <span className="text-gray-600">
            Product Total
          </span>

          <span className="font-medium text-black">
            ₹{productTotal.toFixed(2)}
          </span>

        </div>


        {/* DELIVERY FEE */}

        <div className="flex justify-between items-center">

          <span className="text-gray-600">
            Delivery Fee
          </span>

          <span
            className={`font-medium ${
              shippingFee === 0
                ? "text-red-500"
                : "text-black"
            }`}
          >
            {shippingFee === 0
              ? "FREE"
              : `₹${shippingFee.toFixed(2)}`}
          </span>

        </div>


        {/* SAVINGS */}

        {totalSavings > 0 && (

          <div className="flex justify-between items-center">

            <span className="text-gray-600">
              You Save
            </span>

            <span className="font-medium text-red-500">
              -₹{totalSavings.toFixed(2)}
            </span>

          </div>

        )}


        {/* DIVIDER + TOTAL */}

        <div className="border-t border-gray-200 pt-4 mt-4">

          <div className="flex justify-between items-center">

            <span className="font-semibold text-black">
              Total Amount
            </span>

            <span className="text-xl font-bold text-black">
              ₹{totalAmount.toFixed(2)}
            </span>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* SAVINGS MESSAGE */}
      {/* ================================================= */}

      {totalSavings > 0 && (

        <div className="mt-4 bg-red-50 text-red-600 text-xs font-medium rounded-lg px-3 py-2">

          You'll save ₹
          {totalSavings.toFixed(2)}
          {" "}on this order!

        </div>

      )}


      {/* ================================================= */}
      {/* SELECTED PAYMENT METHOD */}
      {/* ================================================= */}

      {paymentMethod && (

        <div className="mt-5 p-3 rounded-lg bg-gray-50 border border-gray-100">

          <div className="flex items-center gap-3">

            {/* ICON */}

            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-red-100 text-red-600">

              {isOnline ? (
                <FiCreditCard size={18} />
              ) : (
                <FiTruck size={18} />
              )}

            </div>


            {/* PAYMENT TEXT */}

            <div>

              <p className="text-xs text-gray-500">
                Payment Method
              </p>

              <p className="text-sm font-medium text-black">

                {isOnline
                  ? "Online Payment"
                  : "Cash on Delivery"}

              </p>

            </div>


            {/* CHECK */}

            <FiCheckCircle
              size={18}
              className="ml-auto text-red-500"
            />

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* PAYMENT BUTTON */}
      {/* ================================================= */}

      <button
        type="button"
        onClick={onPay}
        disabled={isDisabled}
        className={`w-full mt-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
          isDisabled
            ? "bg-red-300 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600 active:bg-red-700"
        }`}
      >

        {loading ? (

          <>
            {/* Loading Spinner */}

            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

            Processing...
          </>

        ) : isOnline ? (

          <>
            <FiCreditCard size={18} />

            Pay ₹{totalAmount.toFixed(2)}
          </>

        ) : isCashOnDelivery ? (

          <>
            <FiTruck size={18} />

            Place Order
          </>

        ) : (

          "Select Payment Method"

        )}

      </button>


      {/* ================================================= */}
      {/* SECURITY MESSAGE */}
      {/* ================================================= */}

      <p className="text-xs text-center text-gray-400 mt-4">
        Your payment information is secure and protected.
      </p>

    </div>
  );
};

export default PaymentPriceDetails;