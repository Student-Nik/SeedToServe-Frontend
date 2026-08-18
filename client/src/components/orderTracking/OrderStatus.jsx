import React from "react";

const OrderStatus = ({ orderStatus = "PENDING" }) => {
  const normalizedStatus = orderStatus?.toUpperCase();

  const statuses = [
    {
      key: "PENDING",
      label: "Order Placed",
    },
    {
      key: "CONFIRMED",
      label: "Confirmed",
    },
    {
      key: "SHIPPED",
      label: "Shipped",
    },
    {
      key: "OUT_FOR_DELIVERY",
      label: "Out for Delivery",
    },
    {
      key: "DELIVERED",
      label: "Delivered",
    },
  ];

  const isCancelled = normalizedStatus === "CANCELLED";

  const currentIndex = statuses.findIndex(
    (status) => status.key === normalizedStatus
  );

  const actualIndex =
    normalizedStatus === "PLACED"
      ? 0
      : currentIndex;

  if (isCancelled) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-black">
            Order Status
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Track your order
          </p>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-lg bg-red-50 border border-red-100">
          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold">
            ✕
          </div>

          <div>
            <p className="font-semibold text-red-600">
              Order Cancelled
            </p>

            <p className="text-sm text-gray-500 mt-1">
              This order has been cancelled.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-black">
          Order Status
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Track your order
        </p>
      </div>

      <div className="hidden md:flex items-start">
        {statuses.map((status, index) => {
          const isCompleted = index <= actualIndex;
          const isLast = index === statuses.length - 1;

          return (
            <React.Fragment key={status.key}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`
                    w-9
                    h-9
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-semibold
                    border-2
                    ${
                      isCompleted
                        ? "bg-red-600 border-red-600 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }
                  `}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>

                <p
                  className={`
                    text-xs
                    mt-3
                    text-center
                    ${
                      isCompleted
                        ? "font-medium text-black"
                        : "text-gray-400"
                    }
                  `}
                >
                  {status.label}
                </p>
              </div>

              {!isLast && (
                <div
                  className={`
                    flex-1
                    h-0.5
                    mt-4
                    ${
                      index < actualIndex
                        ? "bg-red-600"
                        : "bg-gray-200"
                    }
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="md:hidden space-y-5">
        {statuses.map((status, index) => {
          const isCompleted = index <= actualIndex;
          const isCurrent = index === actualIndex;

          return (
            <div
              key={status.key}
              className="flex items-center gap-3"
            >
              <div
                className={`
                  w-8
                  h-8
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-xs
                  font-semibold
                  border-2
                  flex-shrink-0
                  ${
                    isCompleted
                      ? "bg-red-600 border-red-600 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }
                `}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              <p
                className={`
                  text-sm
                  ${
                    isCurrent
                      ? "font-semibold text-black"
                      : isCompleted
                        ? "font-medium text-gray-700"
                        : "text-gray-400"
                  }
                `}
              >
                {status.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatus;