import DeliveryBoyManagement from "@/components/admin/delivery/DeliveryBoyManagement";
import React from "react";

const AdminDeliveryBoys = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C]">
            Delivery Boys
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Add and manage delivery boys for customer orders
          </p>
        </div>

        <DeliveryBoyManagement />
      </div>
    </div>
  );
};

export default AdminDeliveryBoys;