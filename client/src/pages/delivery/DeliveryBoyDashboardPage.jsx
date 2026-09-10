import DeliveryBoyDashboard from "@/components/delivery/DeliveryBoyDashboard";
import React from "react";
import { useNavigate } from "react-router-dom";

const DeliveryBoyDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF8F3]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">

        {/* Dashboard Overview */}
        <DeliveryBoyDashboard />

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-sm border border-[#2F4C3B]/10 p-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <p className="text-sm font-semibold text-[#E24A3B] mb-1 tracking-wide">
                DELIVERY PANEL
              </p>

              <h2 className="text-2xl font-bold text-[#2F4C3B]">
                My Orders
              </h2>

              <p className="text-black/70 mt-1">
                View and manage all your assigned delivery orders.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/delivery/dashboard/orders")
              }
              className="
                w-fit
                px-5
                py-3
                bg-[#E24A3B]
                hover:bg-[#c73f31]
                text-white
                rounded-lg
                font-medium
                transition
              "
            >
              View All Orders →
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default DeliveryBoyDashboardPage;