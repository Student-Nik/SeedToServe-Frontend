import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaUsers,
  FaSeedling,
  FaBoxOpen,
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaRupeeSign,
} from "react-icons/fa";
import { showToast } from "@/helpers/showToast";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const { token } = useSelector((state) => state.user);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/admin/dashboard",
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log("ADMIN DASHBOARD:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch dashboard");
      }

      setDashboard(result);
    } catch (error) {
      console.error("Dashboard error:", error);
      showToast("error", "Unable to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboard();
    }
  }, [token]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FDF8F3]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#2F4C3B]/15 border-t-[#E24A3B] rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-black text-sm">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ================= ERROR / NO DATA =================
  if (!dashboard) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FDF8F3]">
        <div className="text-center">
          <p className="text-black mb-4">
            Unable to load dashboard data.
          </p>

          <button
            onClick={fetchDashboard}
            className="px-5 py-2 bg-[#E24A3B] text-white rounded-lg font-medium hover:bg-[#c73f31] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ================= STAT CARDS =================
  const stats = [
    {
      title: "Total Buyers",
      value: dashboard.totalBuyers,
      icon: FaUsers,
      description: "Registered buyers",
    },
    {
      title: "Total Farmers",
      value: dashboard.totalFarmers,
      icon: FaSeedling,
      description: "Registered farmers",
    },
    {
      title: "Total Products",
      value: dashboard.totalProducts,
      icon: FaBoxOpen,
      description: "Available products",
    },
    {
      title: "Total Orders",
      value: dashboard.totalOrders,
      icon: FaShoppingCart,
      description: "Orders placed",
    },
  ];

  const orderStats = [
    {
      title: "Pending Orders",
      value: dashboard.pendingOrders,
      icon: FaClock,
      description: "Waiting for processing",
    },
    {
      title: "Completed Orders",
      value: dashboard.completedOrders,
      icon: FaCheckCircle,
      description: "Successfully delivered",
    },
    {
      title: "Cancelled Orders",
      value: dashboard.cancelledOrders,
      icon: FaTimesCircle,
      description: "Cancelled orders",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#FDF8F3]">

      {/* ================= HEADER ================= */}
      <div className="border-b border-[#2F4C3B]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>
              <p className="text-sm font-semibold text-[#E24A3B] mb-1 tracking-wide">
                ADMIN PANEL
              </p>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2F4C3B]">
                Dashboard
              </h1>

              <p className="text-black text-sm mt-1">
                Overview of your SeedToServe platform
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-black">
              <FaSeedling className="text-[#E24A3B]" />
              SeedToServe
            </div>

          </div>

        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ================= MAIN STATISTICS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-[#2F4C3B]/10 p-5 shadow-sm hover:shadow-md transition duration-200"
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm font-medium text-black">
                      {item.title}
                    </p>

                    <h2 className="text-3xl font-extrabold text-[#2F4C3B] mt-2">
                      {item.value}
                    </h2>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-[#E24A3B]/10 flex items-center justify-center">
                    <Icon className="text-[#E24A3B] text-lg" />
                  </div>

                </div>

                <p className="text-xs text-black mt-4">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

        {/* ================= ORDER STATISTICS ================= */}
        <div className="mt-8">

          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#2F4C3B]">
              Order Overview
            </h2>

            <p className="text-sm text-black mt-1">
              Current order status across the platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            {orderStats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl border border-[#2F4C3B]/10 p-5 shadow-sm hover:shadow-md transition duration-200"
                >
                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-full bg-[#E8A33D]/15 flex items-center justify-center">
                      <Icon className="text-[#E8A33D] text-lg" />
                    </div>

                    <div>
                      <p className="text-sm text-black">
                        {item.title}
                      </p>

                      <p className="text-2xl font-extrabold text-[#2F4C3B]">
                        {item.value}
                      </p>
                    </div>

                  </div>

                  <p className="text-xs text-black mt-4">
                    {item.description}
                  </p>
                </div>
              );
            })}

          </div>

        </div>

        {/* ================= REVENUE ================= */}
        <div className="mt-8">

          <div className="bg-[#2F4C3B] rounded-2xl p-6 sm:p-8 text-white shadow-md">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

              <div>
                <p className="text-sm text-white/60 font-medium tracking-wide">
                  TOTAL REVENUE
                </p>

                <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">
                  ₹{Number(dashboard.totalRevenue || 0).toFixed(2)}
                </h2>

                <p className="text-sm text-white/60 mt-2">
                  Revenue generated from completed orders
                </p>
              </div>

              <div className="w-14 h-14 rounded-xl bg-[#E24A3B] flex items-center justify-center">
                <FaRupeeSign className="text-white text-2xl" />
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;