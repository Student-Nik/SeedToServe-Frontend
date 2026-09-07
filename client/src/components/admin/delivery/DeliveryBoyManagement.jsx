import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaUserPlus,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
} from "react-icons/fa";
import { showToast } from "@/helpers/showToast";

const DeliveryBoyManagement = () => {
  const { token } = useSelector((state) => state.user);

  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
  });

  // =========================
  // GET ALL DELIVERY BOYS
  // =========================
  const fetchDeliveryBoys = useCallback(async () => {
    if (!token) {
      showToast("error", "Authentication token not found");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/admin/delivery/boy",
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch delivery boys");
      }

      const data = await response.json();

      setDeliveryBoys(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching delivery boys:", error);
      showToast("error", "Unable to load delivery boys");
      setDeliveryBoys([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDeliveryBoys();
  }, [fetchDeliveryBoys]);

  // =========================
  // FORM INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD DELIVERY BOY
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      showToast("error", "Authentication token not found");
      return;
    }

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.mobileNo.trim() ||
      !formData.email.trim()
    ) {
      showToast("error", "Please fill all fields");
      return;
    }

    try {
      setAdding(true);

      const response = await fetch(
        "http://localhost:8080/api/admin/delivery/boy",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            mobileNo: formData.mobileNo.trim(),
            email: formData.email.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add delivery boy");
      }

      showToast("success", "Delivery boy added successfully");

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: "",
      });

      // Refresh delivery boy list
      await fetchDeliveryBoys();
    } catch (error) {
      console.error("Error adding delivery boy:", error);
      showToast("error", "Unable to add delivery boy");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* =========================
          ADD DELIVERY BOY FORM
      ========================= */}
      <div className="bg-[#FDF8F3] rounded-2xl border border-[#2F4C3B]/10 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-5 sm:px-6 py-5 border-b border-[#2F4C3B]/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#E24A3B]/10 flex items-center justify-center">
              <FaUserPlus className="text-[#E24A3B] text-lg" />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-black">
                Add Delivery Boy
              </h2>

              <p className="text-sm text-black mt-1">
                Add a new delivery boy to your delivery team
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                First Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2F4C3B]/40" />

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#2F4C3B]/15 rounded-lg text-sm text-black placeholder:text-[#2F4C3B]/35 focus:outline-none focus:ring-2 focus:ring-[#E24A3B]/20 focus:border-[#E24A3B] transition"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Last Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2F4C3B]/40" />

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#2F4C3B]/15 rounded-lg text-sm text-black placeholder:text-[#2F4C3B]/35 focus:outline-none focus:ring-2 focus:ring-[#E24A3B]/20 focus:border-[#E24A3B] transition"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Mobile Number
              </label>

              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2F4C3B]/40" />

                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#2F4C3B]/15 rounded-lg text-sm text-black placeholder:text-[#2F4C3B]/35 focus:outline-none focus:ring-2 focus:ring-[#E24A3B]/20 focus:border-[#E24A3B] transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Email
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2F4C3B]/40" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#2F4C3B]/15 rounded-lg text-sm text-black placeholder:text-[#2F4C3B]/35 focus:outline-none focus:ring-2 focus:ring-[#E24A3B]/20 focus:border-[#E24A3B] transition"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={adding}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#E24A3B] text-white rounded-lg text-sm font-semibold hover:bg-[#c93d31] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {adding ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <FaUserPlus />
                  Add Delivery Boy
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* =========================
          ALL DELIVERY BOYS
      ========================= */}
      <div className="bg-[#FDF8F3] rounded-2xl border border-[#2F4C3B]/10 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-5 sm:px-6 py-5 border-b border-[#2F4C3B]/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#E8A33D]/15 flex items-center justify-center">
                <FaTruck className="text-[#E8A33D] text-lg" />
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold text-black">
                  All Delivery Boys
                </h2>

                <p className="text-sm text-black mt-1">
                  Manage your delivery team
                </p>
              </div>
            </div>

            <span className="text-sm text-black">
              {deliveryBoys.length} member
              {deliveryBoys.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="w-9 h-9 border-4 border-[#2F4C3B]/15 border-t-[#E24A3B] rounded-full animate-spin"></div>

            <p className="mt-4 text-sm text-black">
              Loading delivery boys...
            </p>
          </div>
        ) : deliveryBoys.length === 0 ? (
          /* Empty State */
          <div className="py-12 px-5 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#2F4C3B]/10 flex items-center justify-center">
              <FaTruck className="text-2xl text-[#2F4C3B]/40" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-black">
              No Delivery Boys Found
            </h3>

            <p className="mt-1 text-sm text-black">
              Add your first delivery boy using the form above.
            </p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="bg-[#2F4C3B]/5 border-b border-[#2F4C3B]/10">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">
                      ID
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">
                      Name
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">
                      Mobile
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {deliveryBoys.map((boy) => (
                    <tr
                      key={boy.id}
                      className="border-b border-[#2F4C3B]/10 hover:bg-[#2F4C3B]/5 transition"
                    >
                      {/* ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-black">
                          #{boy.id}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              boy.available
                                ? "bg-[#E24A3B]/10 text-[#E24A3B]"
                                : "bg-[#2F4C3B]/10 text-[#2F4C3B]/40"
                            }`}
                          >
                            <FaUser />
                          </div>

                          <div>
                            <p className="font-semibold text-black">
                              {boy.firstName} {boy.lastName}
                            </p>

                            <p className="text-xs text-black">
                              Delivery Boy
                            </p>
                          </div>
                        </div>
                      </td>


                      {/* Mobile */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-black">
                          <FaPhone className="text-[#2F4C3B]/40 text-xs" />
                          {boy.mobileNo || "N/A"}
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-black">
                          <FaEnvelope className="text-[#2F4C3B]/40 text-xs" />
                          {boy.email || "N/A"}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {boy.available ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2F4C3B]/10 text-black text-xs font-semibold">
                            <FaCheckCircle />
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2F4C3B]/10 text-black text-xs font-semibold">
                            <FaTimesCircle />
                            Busy
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile hint */}
            <div className="block sm:hidden px-4 py-3 bg-[#2F4C3B]/5 border-t border-[#2F4C3B]/10">
              <p className="text-xs text-black text-center">
                ← Swipe horizontally to view all delivery boy details →
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeliveryBoyManagement;