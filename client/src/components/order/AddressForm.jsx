import React from "react";

const AddressForm = ({
  address,
  updateAddress,
  handleSaveAddress,
  savingAddress,
}) => {
  const inputClass = `
    w-full
    border
    border-gray-200
    rounded-lg
    px-3
    py-2.5
    text-sm
    text-gray-800
    placeholder:text-gray-400
    focus:outline-none
    focus:border-red-500
    focus:ring-1
    focus:ring-red-500
    transition
  `;

  return (
    <div className="space-y-3">

      {/* Full Name */}
      <input
        type="text"
        placeholder="Full name"
        value={address.fullName || ""}
        onChange={(e) =>
          updateAddress(
            "fullName",
            e.target.value
          )
        }
        className={inputClass}
      />

      {/* Mobile */}
      <input
        type="tel"
        placeholder="Mobile number"
        value={address.mobileNo || ""}
        onChange={(e) =>
          updateAddress(
            "mobileNo",
            e.target.value
          )
        }
        maxLength={10}
        className={inputClass}
      />

      {/* House / Street */}
      <input
        type="text"
        placeholder="House no. / Street"
        value={
          address.houseNoOrStreet || ""
        }
        onChange={(e) =>
          updateAddress(
            "houseNoOrStreet",
            e.target.value
          )
        }
        className={inputClass}
      />

      {/* Village / Town */}
      <input
        type="text"
        placeholder="Village / Town"
        value={
          address.villageOrTown || ""
        }
        onChange={(e) =>
          updateAddress(
            "villageOrTown",
            e.target.value
          )
        }
        className={inputClass}
      />

      {/* District + State */}
      <div className="grid grid-cols-2 gap-3">

        <input
          type="text"
          placeholder="District"
          value={
            address.district || ""
          }
          onChange={(e) =>
            updateAddress(
              "district",
              e.target.value
            )
          }
          className={inputClass}
        />

        <input
          type="text"
          placeholder="State"
          value={
            address.state || ""
          }
          onChange={(e) =>
            updateAddress(
              "state",
              e.target.value
            )
          }
          className={inputClass}
        />

      </div>

      {/* Pincode */}
      <input
        type="text"
        placeholder="Pincode"
        value={
          address.pincode || ""
        }
        onChange={(e) =>
          updateAddress(
            "pincode",
            e.target.value
          )
        }
        maxLength={6}
        className={inputClass}
      />

      {/* Save Button */}
      <button
        type="button"
        onClick={handleSaveAddress}
        disabled={savingAddress}
        className="
          w-full
          bg-red-500
          hover:bg-red-600
          disabled:bg-red-300
          disabled:cursor-not-allowed
          text-white
          font-semibold
          py-2.5
          rounded-lg
          transition
        "
      >
        {savingAddress
          ? "Saving..."
          : "Save Address"}
      </button>

    </div>
  );
};

export default AddressForm;