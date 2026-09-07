import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showToast } from "@/helpers/showToast";
import OrderHeader from "@/components/admin/orders/OrderHeader";
import OrderStats from "@/components/admin/orders/OrderStats";
import OrderTable from "@/components/admin/orders/OrderTable";

const AdminOrders = () => {
  const { token } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    if (!token) {
      showToast("error", "Authentication token not found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/admin/orders",
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching admin orders:", error);

      setOrders([]);

      showToast("error", "Unable to load orders");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <OrderHeader
          onRefresh={fetchOrders}
          loading={loading}
        />

        {/* Stats */}
        <div className="mt-6">
          <OrderStats orders={orders} />
        </div>

        {/* Orders Table */}
        <div className="mt-6">
          {loading ? (
            <div className="bg-white rounded-2xl border border-[#2F4C3B]/10 shadow-sm p-8 sm:p-12">
              <div className="flex flex-col items-center justify-center">

                {/* Loading Spinner */}
                <div className="w-10 h-10 border-4 border-[#2F4C3B]/15 border-t-[#E24A3B] rounded-full animate-spin"></div>

                <p className="mt-4 text-sm text-black">
                  Loading orders...
                </p>
              </div>
            </div>
          ) : (
            <OrderTable orders={orders} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;