import React from "react";

const OrderHeader = ({ order }) => {
  const orderStatus =
    order?.orderStatus?.toUpperCase() || "PENDING";

  const getStatusText = () => {
    switch (orderStatus) {
      case "PENDING":
        return "Order Placed";

      case "PLACED":
        return "Order Placed";

      case "CONFIRMED":
        return "Order Confirmed";

      case "SHIPPED":
        return "Order Shipped";

      case "OUT_FOR_DELIVERY":
        return "Out for Delivery";

      case "DELIVERED":
        return "Order Delivered";

      case "CANCELLED":
        return "Order Cancelled";

      default:
        return "Order Details";
    }
  };

  const paymentMethod =
    order?.paymentMethod === "CASH_ON_DELIVERY"
      ? "Cash on Delivery"
      : order?.paymentMethod === "ONLINE"
        ? "Online Payment"
        : order?.paymentMethod || "Payment Pending";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h1 className="text-xl font-semibold text-black">
            {getStatusText()}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Order ID: {order?.orderId || "—"}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {order?.orderDate || "—"}
          </p>

          {order?.expectedDeliveryDate && (
            <p className="text-sm text-gray-500 mt-1">
              Expected Delivery:{" "}
              <span className="font-medium text-black">
                {order.expectedDeliveryDate}
              </span>
            </p>
          )}

        </div>

        <div className="text-left sm:text-right">

          <p className="text-sm text-gray-500">
            Total Amount
          </p>

          <p className="text-lg font-semibold text-black mt-1">
            ₹{Number(order?.totalAmount || 0).toFixed(2)}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {paymentMethod}
          </p>

        </div>

      </div>

    </div>
  );
};

export default OrderHeader;