import React from "react";

const PaymentDetails = ({ order }) => {

  const paymentMethod =
    order?.paymentMethod || "Cash on Delivery";

  const paymentStatus =
    order?.paymentStatus || "Pending";

  const transactionId =
    order?.transactionId ||
    order?.razorpayPaymentId ||
    order?.paymentId ||
    "";

  const isPaid =
    paymentStatus?.toLowerCase() === "paid" ||
    paymentStatus?.toLowerCase() === "successful";

  const isCOD =
    paymentMethod?.toLowerCase().includes("cash") ||
    paymentMethod?.toLowerCase().includes("cod");


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-black">
          Payment Details
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Payment information for this order
        </p>

      </div>


      {/* ========================================= */}
      {/* PAYMENT INFORMATION */}
      {/* ========================================= */}

      <div className="space-y-4">

        {/* ======================================= */}
        {/* PAYMENT METHOD */}
        {/* ======================================= */}

        <div className="flex items-center justify-between gap-4">

          <span className="text-sm text-gray-500">
            Payment Method
          </span>

          <span className="text-sm font-medium text-black text-right">
            {paymentMethod}
          </span>

        </div>


        {/* ======================================= */}
        {/* PAYMENT STATUS */}
        {/* ======================================= */}

        <div className="flex items-center justify-between gap-4">

          <span className="text-sm text-gray-500">
            Payment Status
          </span>

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
                isPaid
                  ? "bg-green-50 text-green-600"
                  : isCOD
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-100 text-gray-600"
              }
            `}
          >
            {paymentStatus}
          </span>

        </div>


        {/* ======================================= */}
        {/* TRANSACTION ID */}
        {/* ======================================= */}

        {transactionId && (

          <div className="flex items-center justify-between gap-4">

            <span className="text-sm text-gray-500">
              Transaction ID
            </span>

            <span
              className="
                text-sm
                font-medium
                text-black
                text-right
                break-all
              "
            >
              {transactionId}
            </span>

          </div>

        )}


        {/* ======================================= */}
        {/* COD MESSAGE */}
        {/* ======================================= */}

        {isCOD && !isPaid && (

          <div
            className="
              border
              border-red-100
              bg-red-50
              rounded-lg
              p-4
              mt-2
            "
          >

            <p className="text-sm font-medium text-red-600">
              Cash on Delivery
            </p>

            <p className="text-xs text-gray-600 mt-1">
              Please keep the required amount ready when your order
              arrives.
            </p>

          </div>

        )}


        {/* ======================================= */}
        {/* ONLINE PAYMENT SUCCESS */}
        {/* ======================================= */}

        {!isCOD && isPaid && (

          <div
            className="
              border
              border-green-100
              bg-green-50
              rounded-lg
              p-4
              mt-2
            "
          >

            <p className="text-sm font-medium text-green-600">
              Payment Successful
            </p>

            <p className="text-xs text-gray-600 mt-1">
              Your online payment has been successfully received.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default PaymentDetails;