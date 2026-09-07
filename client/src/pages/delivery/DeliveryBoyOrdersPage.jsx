import React, { useEffect, useMemo, useState } from "react";
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

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const data = await getDeliveryBoyOrders(token);

      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching delivery orders:", err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Filter + Search
  const filteredOrders = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return orders.filter((order) => {
      // Status filter
      const matchesStatus =
        statusFilter === "ALL" ||
        order.orderStatus === statusFilter;

      // Search filter
      const matchesSearch =
        search === "" ||
        order.orderId?.toString().includes(search) ||
        order.customerName?.toLowerCase().includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [orders, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(
    filteredOrders.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-lg">
              Loading orders...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          <button
            onClick={() => navigate("/delivery/dashboard")}
            className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
          >
            ← Back to Dashboard
          </button>

          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-red-500 text-lg mb-4">
              {error}
            </p>

            <button
              onClick={fetchOrders}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              Try Again
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Orders
            </h1>

            <p className="text-gray-500 mt-1">
              View and manage all your assigned delivery orders.
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/delivery/dashboard")}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium"
            >
              ← Dashboard
            </button>

            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
            >
              ↻ Refresh
            </button>

          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">

          <div className="flex flex-col lg:flex-row gap-4">

            {/* Search Input */}
            <div className="flex-1">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Orders
              </label>

              <input
                type="text"
                placeholder="Search by Order ID or Customer Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

          </div>

          {/* Status Filters */}
          <div className="mt-5">

            <p className="text-sm font-medium text-gray-700 mb-3">
              Filter by Status
            </p>

            <div className="flex flex-wrap gap-2">

              <button
                onClick={() => setStatusFilter("ALL")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  statusFilter === "ALL"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setStatusFilter("ASSIGNED")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  statusFilter === "ASSIGNED"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Assigned
              </button>

              <button
                onClick={() => setStatusFilter("OUT_FOR_DELIVERY")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  statusFilter === "OUT_FOR_DELIVERY"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Out for Delivery
              </button>

              <button
                onClick={() => setStatusFilter("DELIVERED")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  statusFilter === "DELIVERED"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Delivered
              </button>

              <button
                onClick={() => setStatusFilter("CANCELLED")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  statusFilter === "CANCELLED"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Cancelled
              </button>

            </div>
          </div>

        </div>

        {/* Order Count */}
        <div className="mb-5">

          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">
              {filteredOrders.length}
            </span>{" "}
            order{filteredOrders.length !== 1 ? "s" : ""}
          </p>

        </div>

        {/* Orders */}
        {currentOrders.length > 0 ? (
          <div className="space-y-6">

            {currentOrders.map((order) => (
              <DeliveryOrderCard
                key={order.orderId}
                order={order}
                onStatusUpdated={fetchOrders}
              />
            ))}

          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">

            {orders.length === 0 ? (
              <>
                <h2 className="text-xl font-semibold text-gray-700">
                  No Orders Assigned
                </h2>

                <p className="text-gray-500 mt-2">
                  You currently don't have any orders assigned to you.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-700">
                  No Matching Orders
                </h2>

                <p className="text-gray-500 mt-2">
                  No orders match your current search or status filter.
                </p>

                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("ALL");
                  }}
                  className="mt-4 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Clear Filters
                </button>
              </>
            )}

          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">

            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-2">

              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium ${
                    currentPage === page
                      ? "bg-green-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
