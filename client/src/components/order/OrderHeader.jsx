import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const OrderHeader = ({ onBack }) => {
  return (
    <>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="
          flex
          items-center
          gap-2
          text-sm
          text-gray-500
          hover:text-red-500
          mb-4
          transition
        "
      >
        <FiArrowLeft size={16} />
        Back
      </button>

      {/* Step Indicator */}
      <span
        className="
          text-xs
          font-medium
          text-gray-600
          bg-gray-100
          px-2.5
          py-1
          rounded-full
        "
      >
        STEP 2 — REVIEW ORDER
      </span>

      {/* Page Title */}
      <h1
        className="
          text-2xl
          sm:text-3xl
          font-bold
          text-black
          mt-2
        "
      >
        Confirm Your Order
      </h1>
    </>
  );
};

export default OrderHeader;