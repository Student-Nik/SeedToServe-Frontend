import React from "react";

const OrderActions = ({
  order,
  onCancelOrder,
  onContinueShopping,
  onDownloadInvoice,
}) => {
  const orderStatus = order?.orderStatus?.toUpperCase() || "PENDING";

  const canCancel =
    orderStatus === "PENDING" ||
    orderStatus === "PLACED" ||
    orderStatus === "CONFIRMED";

  const canDownloadInvoice =
    orderStatus === "DELIVERED";

  const isCancelled =
    orderStatus === "CANCELLED";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-black">
          Order Actions
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Manage your order
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">

        <button
          type="button"
          onClick={onContinueShopping}
          className="
            w-full
            sm:w-auto
            px-5
            py-2.5
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

        {canCancel && (
          <button
            type="button"
            onClick={onCancelOrder}
            className="
              w-full
              sm:w-auto
              px-5
              py-2.5
              rounded-lg
              border
              border-red-200
              bg-white
              text-sm
              font-medium
              text-red-600
              hover:bg-red-50
              transition
            "
          >
            Cancel Order
          </button>
        )}

        {canDownloadInvoice && (
          <button
            type="button"
            onClick={onDownloadInvoice}
            className="
              w-full
              sm:w-auto
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
            Download Invoice
          </button>
        )}

        {isCancelled && (
          <div
            className="
              w-full
              sm:w-auto
              px-5
              py-2.5
              rounded-lg
              bg-red-50
              text-red-600
              text-sm
              font-medium
              text-center
            "
          >
            Order Cancelled
          </div>
        )}

      </div>
    </div>
  );
};

export default OrderActions;