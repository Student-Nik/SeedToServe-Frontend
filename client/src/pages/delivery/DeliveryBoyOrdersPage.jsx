import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getDeliveryBoyOrders } from "@/services/deliveryBoyService";
import DeliveryOrderCard from "@/components/delivery/DeliveryOrderCard";

const DeliveryBoyOrdersPage = () => {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Get normalized order status
  const getOrderStatus = (order) => {
    return String(order?.orderStatus ?? order?.status ?? "").toUpperCase();
  };

  // Fetch orders
  const fetchOrders = useCallback(
    async (showLoader = false) => {
      try {
        if (showLoader) setLoading(true);
        setError("");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const data = await getDeliveryBoyOrders(token);

        if (!Array.isArray(data)) {
          throw new Error("Invalid orders data received.");
        }

        setOrders(data);
      } catch (err) {
        console.error("Error fetching delivery orders:", err);
        setError(err.message || "Failed to load orders.");
      } finally {
        if (showLoader) setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) fetchOrders(true);
  }, [token, fetchOrders]);

  // Auto refresh orders every 5 seconds
  useEffect(() => {
    if (!token) return;

    const intervalId = setInterval(() => {
      fetchOrders(false);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [token, fetchOrders]);

  // Filter + Search
  const filteredOrders = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return orders.filter((order) => {
      const orderStatus = getOrderStatus(order);

      const matchesStatus =
        statusFilter === "ALL" || orderStatus === statusFilter;

      const orderId = order?.orderId?.toString().toLowerCase();
      const customerName = order?.customerName?.toLowerCase() || "";

      const matchesSearch =
        search === "" ||
        orderId?.includes(search) ||
        customerName.includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [orders, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Keep page valid
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF8F3] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-16 sm:py-20">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-[#2F4C3B]/15 border-t-[#E24A3B] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-black text-base sm:text-lg">Loading orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDF8F3] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          <button
            type="button"
            onClick={() => navigate("/delivery/dashboard")}
            className="mb-5 sm:mb-6 px-4 py-2 bg-[#2F4C3B]/10 hover:bg-[#2F4C3B]/15 text-[#2F4C3B] rounded-lg text-sm font-medium transition"
          >
            ← Back to Dashboard
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-[#2F4C3B]/10 p-6 sm:p-8 text-center">
            <p className="text-red-500 text-base sm:text-lg mb-4">{error}</p>

            <button
              type="button"
              onClick={() => fetchOrders(true)}
              className="px-5 py-2 bg-[#E24A3B] hover:bg-[#c73f31] text-white rounded-lg font-medium transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F3] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-[#E24A3B] mb-1 tracking-wide">
              DELIVERY PANEL
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#2F4C3B]">
              My Orders
            </h1>

            <p className="text-black/70 text-sm sm:text-base mt-1">
              View and manage all your assigned delivery orders.
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate("/delivery/dashboard")}
              className="flex-1 sm:flex-none px-4 py-2 bg-[#2F4C3B]/10 hover:bg-[#2F4C3B]/15 text-[#2F4C3B] rounded-lg text-sm font-medium transition whitespace-nowrap"
            >
              ← Dashboard
            </button>

            <button
              type="button"
              onClick={() => fetchOrders(true)}
              className="flex-1 sm:flex-none px-4 py-2 bg-[#E24A3B] hover:bg-[#c73f31] text-white rounded-lg text-sm font-medium transition whitespace-nowrap"
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-[#2F4C3B]/10 p-4 sm:p-5 mb-5 sm:mb-6">

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Search Orders
            </label>

            <input
              type="text"
              placeholder="Search by Order ID or Customer Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 border border-[#2F4C3B]/20 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#2F4C3B]/40"
            />
          </div>

          {/* Status Filters */}
          <div className="mt-4 sm:mt-5">
            <p className="text-sm font-medium text-black mb-3">Filter by Status</p>

            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">

              <button
                type="button"
                onClick={() => setStatusFilter("ALL")}
                className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                  statusFilter === "ALL"
                    ? "bg-[#2F4C3B] text-white"
                    : "bg-[#2F4C3B]/10 text-black hover:bg-[#2F4C3B]/15"
                }`}
              >
                All
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter("ASSIGNED")}
                className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                  statusFilter === "ASSIGNED"
                    ? "bg-[#E8A33D] text-white"
                    : "bg-[#2F4C3B]/10 text-black hover:bg-[#2F4C3B]/15"
                }`}
              >
                Assigned
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter("SHIPPED")}
                className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                  statusFilter === "SHIPPED"
                    ? "bg-blue-600 text-white"
                    : "bg-[#2F4C3B]/10 text-black hover:bg-[#2F4C3B]/15"
                }`}
              >
                Shipped
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter("OUT_FOR_DELIVERY")}
                className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                  statusFilter === "OUT_FOR_DELIVERY"
                    ? "bg-[#E24A3B] text-white"
                    : "bg-[#2F4C3B]/10 text-black hover:bg-[#2F4C3B]/15"
                }`}
              >
                Out for Delivery
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter("DELIVERED")}
                className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                  statusFilter === "DELIVERED"
                    ? "bg-[#2F4C3B] text-white"
                    : "bg-[#2F4C3B]/10 text-black hover:bg-[#2F4C3B]/15"
                }`}
              >
                Delivered
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter("CANCELLED")}
                className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
                  statusFilter === "CANCELLED"
                    ? "bg-red-600 text-white"
                    : "bg-[#2F4C3B]/10 text-black hover:bg-[#2F4C3B]/15"
                }`}
              >
                Cancelled
              </button>

            </div>
          </div>

        </div>

        {/* Order Count */}
        <div className="mb-4 sm:mb-5">
          <p className="text-black/70 text-sm sm:text-base">
            Showing{" "}
            <span className="font-semibold text-black">
              {filteredOrders.length}
            </span>{" "}
            order{filteredOrders.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Orders */}
        {currentOrders.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {currentOrders.map((order) => (
              <DeliveryOrderCard
                key={order.orderId}
                order={order}
                onStatusUpdated={() => fetchOrders(false)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-[#2F4C3B]/10 p-6 sm:p-10 text-center">
            {orders.length === 0 ? (
              <>
                <h2 className="text-lg sm:text-xl font-semibold text-[#2F4C3B]">
                  No Orders Assigned
                </h2>

                <p className="text-black/70 text-sm sm:text-base mt-2">
                  You currently don't have any orders assigned to you.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-lg sm:text-xl font-semibold text-[#2F4C3B]">
                  No Matching Orders
                </h2>

                <p className="text-black/70 text-sm sm:text-base mt-2">
                  No orders match your current search or status filter.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("ALL");
                  }}
                  className="mt-4 px-5 py-2 bg-[#2F4C3B] hover:bg-[#243b2f] text-white rounded-lg text-sm sm:text-base transition"
                >
                  Clear Filters
                </button>
              </>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 sm:mt-8">
            <p className="text-sm text-black/60 order-2 sm:order-1">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-2 overflow-x-auto max-w-full order-1 sm:order-2">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="shrink-0 px-3 sm:px-4 py-2 bg-white border border-[#2F4C3B]/20 rounded-lg text-sm text-black hover:bg-[#2F4C3B]/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-[#2F4C3B] text-white"
                      : "bg-white border border-[#2F4C3B]/20 text-black hover:bg-[#2F4C3B]/5"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="shrink-0 px-3 sm:px-4 py-2 bg-white border border-[#2F4C3B]/20 rounded-lg text-sm text-black hover:bg-[#2F4C3B]/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DeliveryBoyOrdersPage;