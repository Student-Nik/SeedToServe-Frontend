import React from "react";
import OrderRow from "./OrderRow";

const OrderTable = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-[#FDF8F3] rounded-2xl shadow-sm border border-[#2F4C3B]/10 p-8 sm:p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2F4C3B]/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-[#2F4C3B]/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-[#2F4C3B]">
          No Orders Found
        </h3>

        <p className="text-sm text-[#2F4C3B]/60 mt-1">
          There are currently no orders to display.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FDF8F3] rounded-2xl shadow-sm border border-[#2F4C3B]/10 overflow-hidden">
      {/* Table Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-[#2F4C3B]/10">
        <h2 className="text-lg sm:text-xl font-bold text-[#2F4C3B]">
          All Orders
        </h2>

        <p className="text-sm text-[#2F4C3B]/60 mt-1">
          Manage and view all customer orders
        </p>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="bg-[#2F4C3B]/5 border-b border-[#2F4C3B]/10">
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2F4C3B]/60 uppercase tracking-wider">
                Order
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2F4C3B]/60 uppercase tracking-wider">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2F4C3B]/60 uppercase tracking-wider">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2F4C3B]/60 uppercase tracking-wider">
                Payment
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2F4C3B]/60 uppercase tracking-wider">
                Payment Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2F4C3B]/60 uppercase tracking-wider">
                Order Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2F4C3B]/60 uppercase tracking-wider">
                Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2F4C3B]/60 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <OrderRow key={order.orderId} order={order} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile scroll hint */}
      <div className="block sm:hidden px-4 py-3 bg-[#2F4C3B]/5 border-t border-[#2F4C3B]/10">
        <p className="text-xs text-[#2F4C3B]/60 text-center">
          ← Swipe horizontally to view all order details →
        </p>
      </div>
    </div>
  );
};

export default OrderTable;