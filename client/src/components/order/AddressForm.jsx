import React from "react";

const AddressForm = ({
  address,
  updateAddress,
  handleSaveAddress,
  savingAddress,
}) => {
  return (
    <div className="space-y-3">

      <input
        type="text"
        placeholder="Full name"
        value={address.fullName || ""}
        onChange={(e) =>
          updateAddress("fullName", e.target.value)
        }
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      <input
        type="tel"
        placeholder="Mobile number"
        value={address.mobileNo || ""}
        onChange={(e) =>
          updateAddress("mobileNo", e.target.value)
        }
        maxLength={10}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      <input
        type="text"
        placeholder="House no. / Street"
        value={address.houseNoOrStreet || ""}
        onChange={(e) =>
          updateAddress("houseNoOrStreet", e.target.value)
        }
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      <input
        type="text"
        placeholder="Village / Town"
        value={address.villageOrTown || ""}
        onChange={(e) =>
          updateAddress("villageOrTown", e.target.value)
        }
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      <div className="grid grid-cols-2 gap-3">

        <input
          type="text"
          placeholder="District"
          value={address.district || ""}
          onChange={(e) =>
            updateAddress("district", e.target.value)
          }
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <input
          type="text"
          placeholder="State"
          value={address.state || ""}
          onChange={(e) =>
            updateAddress("state", e.target.value)
          }
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

      </div>

      <input
        type="text"
        placeholder="Pincode"
        value={address.pincode || ""}
        onChange={(e) =>
          updateAddress("pincode", e.target.value)
        }
        maxLength={6}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      <button
        type="button"
        onClick={handleSaveAddress}
        disabled={savingAddress}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition"
      >
        {savingAddress ? "Saving..." : "Save Address"}
      </button>

    </div>
  );
};

export default AddressForm;