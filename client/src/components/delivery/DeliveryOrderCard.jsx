import React from "react";
import DeliveryStatus from "./DeliveryStatus";

const DeliveryOrderCard = ({ order, onStatusUpdated }) => {
  const currentStatus = String(
    order?.orderStatus ?? order?.status ?? ""
  ).toUpperCase();

  const getStatusClass = (status) => {
    switch (status) {
      case "ASSIGNED":
        return "bg-[#E8A33D]/15 text-[#E8A33D]";

      case "SHIPPED":
        return "bg-blue-100 text-blue-700";

      case "OUT_FOR_DELIVERY":
        return "bg-[#E24A3B]/10 text-[#E24A3B]";

      case "DELIVERED":
        return "bg-[#2F4C3B]/10 text-[#2F4C3B]";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-[#2F4C3B]/10 text-black";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#2F4C3B]/10 p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
        <div>
          <h2 className="text-xl font-semibold text-[#2F4C3B]">
            Order #{order.orderId}
          </h2>

          <p className="text-sm text-black/60 mt-1">
            {order.orderDate
              ? new Date(order.orderDate).toLocaleString()
              : "Date not available"}
          </p>
        </div>

        <span
          className={`self-start sm:self-auto px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
            currentStatus
          )}`}
        >
          {currentStatus || "UNKNOWN"}
        </span>
      </div>

      {/* Customer Details */}
      <div className="mb-5">
        <h3 className="font-semibold text-[#2F4C3B] mb-2">
          Customer Details
        </h3>

        <p className="text-black">
          <span className="font-medium">Name:</span>{" "}
          {order.customerName || "N/A"}
        </p>

        <p className="text-black mt-1">
          <span className="font-medium">Address:</span>{" "}
          {order.address || "N/A"}
        </p>
      </div>

      {/* Products */}
      <div className="mb-5">
        <h3 className="font-semibold text-[#2F4C3B] mb-3">
          Order Items
        </h3>

        {order.items?.length > 0 ? (
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={item.itemId || index}
                className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-[#2F4C3B]/10 pb-3"
              >
                {/* Product Image */}
                {item.productImage ? (
                  <img
                    src={`data:image/jpeg;base64,${item.productImage}`}
                    alt={item.productName || "Product"}
                    className="w-16 h-16 object-cover rounded-lg border border-[#2F4C3B]/10"
                  />
                ) : (
                  <div className="w-16 h-16 bg-[#FDF8F3] rounded-lg flex items-center justify-center">
                    <span className="text-xs text-black/40">
                      No Image
                    </span>
                  </div>
                )}

                {/* Product Information */}
                <div className="flex-1">
                  <p className="font-medium text-black">
                    {item.productName || "Product"}
                  </p>

                  <p className="text-sm text-black/60">
                    Quantity: {item.quantity || 0}
                  </p>
                </div>

                {/* Product Price */}
                <p className="font-medium text-[#2F4C3B]">
                  ₹{item.price || 0}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-black/60">
            No items available.
          </p>
        )}
      </div>

      {/* Payment Details */}
      <div className="border-t border-[#2F4C3B]/10 pt-4 mb-5">

        <div className="flex justify-between mb-2">
          <span className="text-black/70">
            Payment Method
          </span>

          <span className="font-medium text-black">
            {order.paymentMethod || "N/A"}
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-black/70">
            Payment Status
          </span>

          <span
            className={
              String(order.paymentStatus).toUpperCase() === "PAID"
                ? "text-[#2F4C3B] font-medium"
                : "text-[#E8A33D] font-medium"
            }
          >
            {order.paymentStatus || "N/A"}
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between text-lg font-semibold mt-3 text-[#2F4C3B]">
          <span>Total</span>

          <span>
            ₹{order.totalAmount || 0}
          </span>
        </div>
      </div>

      {/* Delivery Status */}
      <DeliveryStatus
        order={{
          ...order,
          orderStatus: currentStatus,
        }}
        onStatusUpdated={onStatusUpdated}
      />

    </div>
  );
};

export default DeliveryOrderCard;