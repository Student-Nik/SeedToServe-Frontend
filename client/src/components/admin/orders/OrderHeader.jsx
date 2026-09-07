import React from "react";

const OrderHeader = ({ onRefresh, loading }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2F4C3B]">
          Orders
        </h1>

        <p className="text-sm sm:text-base text-black mt-1">
          Manage and monitor all customer orders
        </p>
      </div>

      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E24A3B] text-white rounded-lg font-semibold text-sm hover:bg-[#c93d31] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>

            Refreshing...
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h5M20 20v-5h-5M5.05 9A7 7 0 0117.95 7M18.95 15A7 7 0 016.05 17"
              />
            </svg>

            Refresh
          </>
        )}
      </button>
    </div>
  );
};

export default OrderHeader;