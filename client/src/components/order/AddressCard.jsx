import React from "react";
import { FiEdit2 } from "react-icons/fi";
import AddressForm from "./AddressForm";

const AddressCard = ({
  address,
  editingAddress,
  setEditingAddress,
  updateAddress,
  handleSaveAddress,
  savingAddress,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        p-5
        sm:p-6
      "
    >

      {/* Header */}
      <div className="flex items-center justify-between mb-4">

        <div>
          <h2 className="font-semibold text-black">
            Deliver to
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Delivery address
          </p>
        </div>

        {/* Change / Cancel */}
        <button
          type="button"
          onClick={() =>
            setEditingAddress(
              (prev) => !prev
            )
          }
          className="
            flex
            items-center
            gap-1
            text-sm
            text-red-500
            hover:text-red-600
            font-medium
            transition
          "
        >
          <FiEdit2 size={14} />

          {editingAddress
            ? "Cancel"
            : "Change"}
        </button>

      </div>

      {/* Address */}
      {editingAddress ? (

        <AddressForm
          address={address}
          updateAddress={updateAddress}
          handleSaveAddress={
            handleSaveAddress
          }
          savingAddress={
            savingAddress
          }
        />

      ) : (

        <div className="text-sm text-gray-600">

          {address.fullName ||
          address.mobileNo ||
          address.houseNoOrStreet ? (

            <div className="space-y-1">

              <p className="font-semibold text-black">
                {address.fullName || "—"}
              </p>

              <p className="text-gray-600">
                {address.houseNoOrStreet}
              </p>

              <p className="text-gray-600">
                {address.villageOrTown}
              </p>

              <p className="text-gray-600">
                {address.district},{" "}
                {address.state} -{" "}
                {address.pincode}
              </p>

              <p className="pt-1 text-gray-500">
                Mobile:{" "}
                {address.mobileNo}
              </p>

            </div>

          ) : (

            <p className="text-red-500">
              No delivery address available.
            </p>

          )}

        </div>
      )}

    </div>
  );
};

export default AddressCard;