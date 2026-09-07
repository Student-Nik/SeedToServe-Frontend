import React from "react";

const OrderStats = ({ orders = [] }) => {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.orderStatus === "PLACED" ||
      order.orderStatus === "CONFIRMED" ||
      order.orderStatus === "SHIPPED" ||
      order.orderStatus === "OUT_FOR_DELIVERY"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.orderStatus === "DELIVERED"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.orderStatus === "CANCELLED"
  ).length;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a3 3 0 116 0"
          />
        </svg>
      ),
      iconBg: "bg-red-100",
      iconColor: "text-[#E24A3B]",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Completed Orders",
      value: completedOrders,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Cancelled Orders",
      value: cancelledOrders,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {stat.title}
              </p>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mt-2">
                {stat.value}
              </h3>
            </div>

            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg} ${stat.iconColor}`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;