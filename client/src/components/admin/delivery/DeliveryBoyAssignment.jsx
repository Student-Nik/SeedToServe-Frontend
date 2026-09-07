import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaTruck,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { showToast } from "@/helpers/showToast";

const DeliveryBoyAssignment = ({ orderId }) => {
  const { token } = useSelector((state) => state.user);

  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedBoy, setSelectedBoy] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  // =========================================
  // FETCH DELIVERY BOYS
  // =========================================

  const fetchDeliveryBoys = async () => {
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

      const responseText = await response.text();

      console.log("=================================");
      console.log("FETCH DELIVERY BOYS");
      console.log("Status:", response.status);
      console.log("Status Text:", response.statusText);
      console.log("Response:", responseText);
      console.log("=================================");

      if (!response.ok) {
        throw new Error(
          responseText || "Failed to fetch delivery boys"
        );
      }

      let data = [];

      try {
        data = responseText ? JSON.parse(responseText) : [];
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Invalid response received from server");
      }

      console.log("Delivery Boys:", data);

      setDeliveryBoys(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching delivery boys:", error);

      showToast(
        "error",
        error.message || "Unable to load delivery boys"
      );

      setDeliveryBoys([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveryBoys();
  }, [token]);

  // =========================================
  // SELECT DELIVERY BOY
  // =========================================

  const handleSelectBoy = (boy) => {
    console.log("Selected Delivery Boy:", boy);

    if (assigning) {
      return;
    }

    if (!boy.available) {
      showToast("error", "This delivery boy is currently busy");
      return;
    }

    setSelectedBoy(String(boy.id));
  };

  // =========================================
  // ASSIGN DELIVERY BOY
  // =========================================

  const handleAssign = async () => {
    if (!selectedBoy) {
      showToast("error", "Please select a delivery boy");
      return;
    }

    if (!orderId) {
      showToast("error", "Order ID not found");
      return;
    }

    if (!token) {
      showToast("error", "Authentication token not found");
      return;
    }

    try {
      setAssigning(true);

      const url = `http://localhost:8080/api/admin/orders/${orderId}/assign-delivery-boy/${selectedBoy}`;

      console.log("=================================");
      console.log("ASSIGN DELIVERY BOY");
      console.log("Order ID:", orderId);
      console.log("Delivery Boy ID:", selectedBoy);
      console.log("API:", url);
      console.log("=================================");

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      // Read backend response regardless of success/failure
      const responseText = await response.text();

      console.log("=================================");
      console.log("ASSIGNMENT RESPONSE");
      console.log("Status:", response.status);
      console.log("Status Text:", response.statusText);
      console.log("Response:", responseText);
      console.log("=================================");

      // =========================================
      // HANDLE BACKEND ERROR
      // =========================================

      if (!response.ok) {
        let errorMessage = responseText;

        // Try to extract message if backend returns JSON
        try {
          const errorData = responseText
            ? JSON.parse(responseText)
            : null;

          if (errorData) {
            errorMessage =
              errorData.message ||
              errorData.error ||
              errorData.detail ||
              responseText;
          }
        } catch (parseError) {
          // Response is probably plain text
          console.log("Backend response is not JSON");
        }

        console.error(
          "Assignment failed:",
          response.status,
          errorMessage
        );

        // Friendly messages for common HTTP errors
        if (response.status === 401) {
          showToast(
            "error",
            "Session expired. Please login again."
          );
        } else if (response.status === 403) {
          showToast(
            "error",
            "You are not authorized to assign delivery boys."
          );
        } else if (response.status === 404) {
          showToast(
            "error",
            errorMessage || "Order or delivery boy not found."
          );
        } else if (response.status === 409) {
          showToast(
            "error",
            errorMessage ||
              "This delivery boy is already assigned or unavailable."
          );
        } else if (response.status >= 500) {
          showToast(
            "error",
            "Server error. Check the Spring Boot console."
          );
        } else {
          showToast(
            "error",
            errorMessage ||
              `Assignment failed (${response.status})`
          );
        }

        return;
      }

      // =========================================
      // SUCCESS
      // =========================================

      console.log("Delivery boy assigned successfully");

      showToast(
        "success",
        "Delivery boy assigned successfully"
      );

      // Refresh delivery boy availability
      await fetchDeliveryBoys();

      // Clear selected delivery boy
      setSelectedBoy("");
    } catch (error) {
      console.error(
        "Error assigning delivery boy:",
        error
      );

      showToast(
        "error",
        error.message || "Unable to assign delivery boy"
      );
    } finally {
      setAssigning(false);
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#E24A3B] rounded-full animate-spin"></div>

          <span className="ml-3 text-sm text-gray-500">
            Loading delivery boys...
          </span>
        </div>
      </div>
    );
  }

  // =========================================
  // UI
  // =========================================

  return (
    <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="px-5 sm:px-6 py-5 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
              <FaTruck className="text-orange-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#1C1C1C]">
                Delivery Assignment
              </h2>

              <p className="text-sm text-gray-500">
                Select a delivery boy for Order #{orderId}
              </p>
            </div>

          </div>

          <span className="text-xs font-medium text-gray-500">
            {deliveryBoys.length} Delivery Boy
            {deliveryBoys.length !== 1 ? "s" : ""}
          </span>

        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 sm:p-6">

        {deliveryBoys.length === 0 ? (

          <div className="text-center py-8">

            <FaTruck className="mx-auto text-4xl text-gray-300" />

            <h3 className="mt-4 text-base font-semibold text-[#1C1C1C]">
              No Delivery Boys Found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Please add a delivery boy before assigning an order.
            </p>

          </div>

        ) : (

          <>

            {/* DELIVERY BOYS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {deliveryBoys.map((boy) => {

                const isSelected =
                  String(selectedBoy) === String(boy.id);

                const isAvailable = Boolean(boy.available);

                return (

                  <div
                    key={boy.id}
                    role="button"
                    tabIndex={
                      isAvailable && !assigning ? 0 : -1
                    }
                    onClick={() => handleSelectBoy(boy)}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" ||
                        e.key === " "
                      ) {
                        e.preventDefault();
                        handleSelectBoy(boy);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-[#E24A3B] bg-red-50 cursor-pointer"
                        : isAvailable
                        ? "border-gray-100 bg-gray-50 hover:border-[#E24A3B]/60 hover:bg-red-50 cursor-pointer"
                        : "border-gray-100 bg-gray-100 opacity-60 cursor-not-allowed"
                    }`}
                  >

                    <div className="flex items-start justify-between gap-3">

                      {/* DELIVERY BOY INFO */}
                      <div className="flex items-start gap-3 min-w-0">

                        <div
                          className={`w-11 h-11 flex-shrink-0 rounded-full flex items-center justify-center ${
                            isAvailable
                              ? "bg-[#E24A3B]/10 text-[#E24A3B]"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          <FaUser />
                        </div>

                        <div className="min-w-0">

                          <h3 className="font-semibold text-[#1C1C1C] truncate">
                            {boy.firstName} {boy.lastName}
                          </h3>

                          <div className="flex items-center gap-2 mt-1">
                            <FaPhone className="text-xs text-gray-400" />

                            <span className="text-xs text-gray-500">
                              {boy.mobileNo || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <FaEnvelope className="text-xs text-gray-400" />

                            <span className="text-xs text-gray-500 truncate">
                              {boy.email || "N/A"}
                            </span>
                          </div>

                        </div>

                      </div>

                      {/* STATUS */}
                      <div className="flex-shrink-0">

                        {isAvailable ? (

                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold">
                            <FaCheckCircle />
                            Available
                          </span>

                        ) : (

                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200 text-gray-500 text-[10px] font-semibold">
                            <FaTimesCircle />
                            Busy
                          </span>

                        )}

                      </div>

                    </div>

                    {/* SELECTED */}
                    {isSelected && (

                      <div className="mt-3 pt-3 border-t border-red-200">

                        <span className="text-xs font-semibold text-[#E24A3B]">
                          ✓ Selected for this order
                        </span>

                      </div>

                    )}

                  </div>

                );

              })}

            </div>

            {/* ASSIGN BUTTON */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <p className="text-xs sm:text-sm text-gray-500">
                Select an available delivery boy and assign them to this order.
              </p>

              <button
                type="button"
                onClick={handleAssign}
                disabled={!selectedBoy || assigning}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#E24A3B] text-white rounded-lg text-sm font-semibold hover:bg-[#c93d31] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {assigning ? (

                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                    Assigning...
                  </>

                ) : (

                  <>
                    <FaTruck />
                    Assign Delivery Boy
                  </>

                )}

              </button>

            </div>

          </>

        )}

      </div>

    </div>
  );
};

export default DeliveryBoyAssignment;
