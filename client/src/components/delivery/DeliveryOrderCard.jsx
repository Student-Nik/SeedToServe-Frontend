import React from "react";
import DeliveryStatus from "./DeliveryStatus";

const DeliveryOrderCard = ({ order, onStatusUpdated }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "ASSIGNED":
        return "bg-yellow-100 text-yellow-700";

      case "OUT_FOR_DELIVERY":
        return "bg-blue-100 text-blue-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Order #{order.orderId}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {new Date(order.orderDate).toLocaleString()}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
            order.orderStatus
          )}`}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* Customer Details */}
      <div className="mb-5">
        <h3 className="font-semibold text-gray-700 mb-2">
          Customer Details
        </h3>

        <p className="text-gray-600">
          <span className="font-medium">Name:</span>{" "}
          {order.customerName}
        </p>

        <p className="text-gray-600 mt-1">
          <span className="font-medium">Address:</span>{" "}
          {order.address}
        </p>
      </div>

      {/* Products */}
      <div className="mb-5">
        <h3 className="font-semibold text-gray-700 mb-3">
          Order Items
        </h3>

        <div className="space-y-3">
          {order.items?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b pb-3"
            >
              {/* Product Image */}
              {item.productImage ? (
                <img
                  src={`data:image/jpeg;base64,${item.productImage}`}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-400">
                    No Image
                  </span>
                </div>
              )}

              {/* Product Information */}
              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {item.productName}
                </p>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              {/* Product Price */}
              <p className="font-medium text-gray-700">
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Details */}
      <div className="border-t pt-4 mb-5">

        <div className="flex justify-between mb-2">
          <span className="text-gray-600">
            Payment Method
          </span>

          <span className="font-medium">
            {order.paymentMethod}
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-600">
            Payment Status
          </span>

          <span
            className={
              order.paymentStatus === "PAID"
                ? "text-green-600 font-medium"
                : "text-orange-600 font-medium"
            }
          >
            {order.paymentStatus}
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between text-lg font-semibold mt-3">
          <span>Total</span>

          <span>
            ₹{order.totalAmount}
          </span>
        </div>
      </div>

      {/* Delivery Status */}
      <DeliveryStatus
        order={order}
        onStatusUpdated={onStatusUpdated}
      />

    </div>
  );
};

export default DeliveryOrderCard;
