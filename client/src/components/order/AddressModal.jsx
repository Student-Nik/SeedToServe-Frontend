import React, { useState } from "react";
import { FiX, FiMapPin } from "react-icons/fi";
import { showToast } from "@/helpers/showToast";
import { getToken, getCurrentUser } from "@/utils/auth";

const ADDRESS_API =
  "http://localhost:8080/api/customer/address";

const AddressModal = ({ onClose, onSaved }) => {
  const token = getToken();
  const currentUser = getCurrentUser();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    mobileNo: "",
    houseNoOrStreet: "",
    villageOrTown: "",
    district: "",
    state: "",
    pincode: "",
  });

  const update = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const required = [
      "fullName",
      "mobileNo",
      "houseNoOrStreet",
      "villageOrTown",
      "district",
      "state",
      "pincode",
    ];

    const missing = required.filter(
      (field) => !form[field]?.trim()
    );

    if (missing.length > 0) {
      showToast("error", "Please fill all address fields");
      return;
    }

    // Mobile validation
    if (!/^[0-9]{10}$/.test(form.mobileNo.trim())) {
      showToast(
        "error",
        "Please enter a valid 10-digit mobile number"
      );
      return;
    }

    // Pincode validation
    if (!/^[0-9]{6}$/.test(form.pincode.trim())) {
      showToast(
        "error",
        "Please enter a valid 6-digit pincode"
      );
      return;
    }

    if (!token) {
      showToast(
        "error",
        "Your session has expired. Please log in again."
      );
      return;
    }

    /*
     * Try to resolve customer ID from Redux.
     */
    const customerId =
      currentUser?.customerId ??
      currentUser?.customer?.id ??
      currentUser?.customer?.customerId ??
      currentUser?.id ??
      currentUser?._id ??
      currentUser?.userId ??
      currentUser?.user?.customerId ??
      currentUser?.user?.id ??
      null;

    console.log("AddressModal current user:", currentUser);
    console.log("Resolved customer ID:", customerId);

    setSaving(true);

    try {
      const requestBody = {
        ...form,
      };

      /*
       * Send customerId only if it exists.
       */
      if (customerId !== null && customerId !== undefined) {
        requestBody.customerId = customerId;
      }

      const res = await fetch(`${ADDRESS_API}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await res.text();

      if (!res.ok) {
        console.error(
          "Address API Error:",
          res.status,
          responseText
        );

        throw new Error(
          responseText || "Failed to save address"
        );
      }

      let saved;

      try {
        saved = JSON.parse(responseText);
      } catch {
        saved = responseText;
      }

      console.log("Saved address:", saved);

      showToast(
        "success",
        "Address added successfully"
      );

      onSaved(saved);
    } catch (err) {
      console.error("Save address error:", err);

      showToast(
        "error",
        err.message || "Could not save address"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      {/* Modal */}
      <div
        className="
          bg-white
          rounded-2xl
          w-full
          max-w-md
          p-6
          relative
          max-h-[90vh]
          overflow-y-auto
          shadow-2xl
          border
          border-gray-200
        "
      >

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className="
            absolute
            top-4
            right-4
            text-gray-400
            hover:text-red-500
            transition
            disabled:opacity-50
          "
          aria-label="Close"
        >
          <FiX size={21} />
        </button>

        {/* Header */}
        <div className="pr-8">

          <div className="flex items-center gap-2 mb-1">

            <FiMapPin
              size={21}
              className="text-red-500"
            />

            <h2 className="text-xl font-bold text-black">
              Add Delivery Address
            </h2>

          </div>

          <p className="text-sm text-gray-500">
            We need this to deliver your order.
          </p>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-5" />

        {/* Form */}
        <div className="space-y-4 mt-5">

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={update("fullName")}
              disabled={saving}
              className="
                w-full
                border
                border-gray-200
                rounded-lg
                px-3
                py-2.5
                text-sm
                text-black
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
                focus:border-red-500
                transition
                disabled:bg-gray-50
              "
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Mobile Number
            </label>

            <input
              type="tel"
              inputMode="numeric"
              placeholder="Enter 10-digit mobile number"
              value={form.mobileNo}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  mobileNo: e.target.value.replace(/\D/g, ""),
                }))
              }
              maxLength={10}
              disabled={saving}
              className="
                w-full
                border
                border-gray-200
                rounded-lg
                px-3
                py-2.5
                text-sm
                text-black
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
                focus:border-red-500
                transition
                disabled:bg-gray-50
              "
            />
          </div>

          {/* House / Street */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              House No. / Street
            </label>

            <input
              type="text"
              placeholder="House number, street name"
              value={form.houseNoOrStreet}
              onChange={update("houseNoOrStreet")}
              disabled={saving}
              className="
                w-full
                border
                border-gray-200
                rounded-lg
                px-3
                py-2.5
                text-sm
                text-black
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
                focus:border-red-500
                transition
                disabled:bg-gray-50
              "
            />
          </div>

          {/* Village / Town */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Village / Town
            </label>

            <input
              type="text"
              placeholder="Enter village or town"
              value={form.villageOrTown}
              onChange={update("villageOrTown")}
              disabled={saving}
              className="
                w-full
                border
                border-gray-200
                rounded-lg
                px-3
                py-2.5
                text-sm
                text-black
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
                focus:border-red-500
                transition
                disabled:bg-gray-50
              "
            />
          </div>

          {/* District + State */}
          <div className="grid grid-cols-2 gap-3">

            {/* District */}
            <div>
              <label className="block text-xs font-semibold text-black mb-1">
                District
              </label>

              <input
                type="text"
                placeholder="District"
                value={form.district}
                onChange={update("district")}
                disabled={saving}
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-lg
                  px-3
                  py-2.5
                  text-sm
                  text-black
                  placeholder:text-gray-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-500
                  focus:border-red-500
                  transition
                  disabled:bg-gray-50
                "
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-semibold text-black mb-1">
                State
              </label>

              <input
                type="text"
                placeholder="State"
                value={form.state}
                onChange={update("state")}
                disabled={saving}
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-lg
                  px-3
                  py-2.5
                  text-sm
                  text-black
                  placeholder:text-gray-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-500
                  focus:border-red-500
                  transition
                  disabled:bg-gray-50
                "
              />
            </div>

          </div>

          {/* Pincode */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Pincode
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter 6-digit pincode"
              value={form.pincode}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  pincode: e.target.value.replace(/\D/g, ""),
                }))
              }
              maxLength={6}
              disabled={saving}
              className="
                w-full
                border
                border-gray-200
                rounded-lg
                px-3
                py-2.5
                text-sm
                text-black
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-red-500
                focus:border-red-500
                transition
                disabled:bg-gray-50
              "
            />
          </div>

        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="
            mt-6
            w-full
            bg-red-500
            hover:bg-red-600
            active:bg-red-700
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-white
            font-semibold
            py-3
            rounded-xl
            transition
          "
        >
          {saving ? "Saving..." : "Save Address"}
        </button>

        {/* Cancel */}
        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className="
            mt-2
            w-full
            text-sm
            text-gray-500
            hover:text-red-500
            font-medium
            py-2
            transition
            disabled:opacity-50
          "
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default AddressModal;