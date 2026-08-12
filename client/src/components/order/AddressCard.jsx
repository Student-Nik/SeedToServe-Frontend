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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">

      <div className="flex items-center justify-between mb-4">

        <div>
          <h2 className="font-semibold text-gray-800">
            Deliver to
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Delivery address
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setEditingAddress((prev) => !prev)
          }
          className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
        >
          <FiEdit2 size={14} />

          {editingAddress ? "Cancel" : "Change"}
        </button>

      </div>

      {editingAddress ? (
        <AddressForm
          address={address}
          updateAddress={updateAddress}
          handleSaveAddress={handleSaveAddress}
          savingAddress={savingAddress}
        />
      ) : (
        <div className="text-sm text-gray-600">

          {address.fullName ||
          address.mobileNo ||
          address.houseNoOrStreet ? (

            <div className="space-y-1">

              <p className="font-semibold text-gray-800">
                {address.fullName || "—"}
              </p>

              <p>{address.houseNoOrStreet}</p>

              <p>{address.villageOrTown}</p>

              <p>
                {address.district}, {address.state} -{" "}
                {address.pincode}
              </p>

              <p className="pt-1 text-gray-500">
                Mobile: {address.mobileNo}
              </p>

            </div>

          ) : (

            <p className="text-amber-600">
              No delivery address available.
            </p>

          )}

        </div>
      )}

    </div>
  );
};

export default AddressCard;