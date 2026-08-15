import React from "react";
import { FiCreditCard, FiTruck } from "react-icons/fi";

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

      {/* Header */}
      <h2 className="text-lg font-semibold text-black mb-4">
        Payment Method
      </h2>

      <div className="space-y-3">

        {/* ================================================= */}
        {/* CASH ON DELIVERY */}
        {/* ================================================= */}

        <label
          htmlFor="cash-on-delivery"
          className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
            paymentMethod === "CASH_ON_DELIVERY"
              ? "border-red-500 bg-red-50"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >

          <div className="flex items-center gap-3">

            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                paymentMethod === "CASH_ON_DELIVERY"
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <FiTruck size={20} />
            </div>


            {/* Text */}
            <div>

              <p className="font-medium text-black">
                Cash on Delivery
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Pay when your order is delivered
              </p>

            </div>

          </div>


          {/* Radio */}
          <div className="relative">

            <input
              id="cash-on-delivery"
              type="radio"
              name="paymentMethod"
              value="CASH_ON_DELIVERY"
              checked={
                paymentMethod === "CASH_ON_DELIVERY"
              }
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
              className="sr-only"
            />

            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "CASH_ON_DELIVERY"
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >

              {paymentMethod === "CASH_ON_DELIVERY" && (
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              )}

            </div>

          </div>

        </label>


        {/* ================================================= */}
        {/* ONLINE PAYMENT */}
        {/* ================================================= */}

        <label
          htmlFor="online-payment"
          className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
            paymentMethod === "ONLINE"
              ? "border-red-500 bg-red-50"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >

          <div className="flex items-center gap-3">

            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                paymentMethod === "ONLINE"
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <FiCreditCard size={20} />
            </div>


            {/* Text */}
            <div>

              <p className="font-medium text-black">
                Online Payment
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Pay securely using Razorpay
              </p>

            </div>

          </div>


          {/* Radio */}
          <div className="relative">

            <input
              id="online-payment"
              type="radio"
              name="paymentMethod"
              value="ONLINE"
              checked={
                paymentMethod === "ONLINE"
              }
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
              className="sr-only"
            />

            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "ONLINE"
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >

              {paymentMethod === "ONLINE" && (
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              )}

            </div>

          </div>

        </label>

      </div>

    </div>
  );
};

export default PaymentMethod;