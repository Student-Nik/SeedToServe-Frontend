import DeliveryBoyDashboard from "@/components/delivery/DeliveryBoyDashboard";
import React from "react";
import { useNavigate } from "react-router-dom";

const DeliveryBoyDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Dashboard Overview */}
        <DeliveryBoyDashboard />

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                My Orders
              </h2>

              <p className="text-gray-500 mt-1">
                View and manage all your assigned delivery orders.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/delivery/dashboard/orders")
              }
              className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
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
