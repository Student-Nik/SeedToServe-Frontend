import React from "react";
import { FiArrowLeft, FiCreditCard } from "react-icons/fi";

const PaymentHeader = ({ onBack }) => {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-4 rounded-xl shadow-sm border border-gray-100">

      {/* Left Section */}
      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-full hover:bg-red-50 text-gray-700 hover:text-red-500 transition"
          aria-label="Go back"
        >
          <FiArrowLeft size={22} />
        </button>

        <div>
          <h1 className="text-2xl font-semibold text-black">
            Payment
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Choose your preferred payment method
          </p>
        </div>

      </div>


      {/* Right Section */}
      <div className="hidden sm:flex items-center gap-2 text-gray-500">

        <FiCreditCard
          size={20}
          className="text-red-500"
        />

        <span className="text-sm">
          Secure Payment
        </span>

      </div>

    </div>
  );
};

export default PaymentHeader;