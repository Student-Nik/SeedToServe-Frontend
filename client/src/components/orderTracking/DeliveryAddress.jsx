import React from "react";

const DeliveryAddress = ({ address }) => {
  const shippingAddress =
    address?.shippingAddress ||
    address?.address ||
    "";

  const hasStructuredAddress =
    address &&
    (
      address.fullName ||
      address.mobileNo ||
      address.houseNoOrStreet ||
      address.villageOrTown ||
      address.district ||
      address.state ||
      address.pincode
    );

  const hasAddress =
    hasStructuredAddress ||
    shippingAddress;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-black">
          Delivery Address
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Your order will be delivered to this address
        </p>
      </div>

      {!hasAddress ? (
        <div className="py-5 text-center">
          <p className="text-sm text-gray-500">
            Delivery address not available.
          </p>
        </div>
      ) : (
        <div className="border border-gray-100 rounded-lg p-4">

          {hasStructuredAddress ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-black">
                  {address?.fullName || "Customer"}
                </h3>

                {address?.type && (
                  <span className="text-xs text-gray-500">
                    {address.type}
                  </span>
                )}
              </div>

              {address?.mobileNo && (
                <p className="text-sm text-gray-600 mt-2">
                  {address.mobileNo}
                </p>
              )}

              <div className="text-sm text-gray-600 leading-6 mt-3">
                {address?.houseNoOrStreet && (
                  <p>{address.houseNoOrStreet}</p>
                )}

                {address?.villageOrTown && (
                  <p>{address.villageOrTown}</p>
                )}

                {(address?.district || address?.state) && (
                  <p>
                    {address?.district}
                    {address?.district && address?.state && ", "}
                    {address?.state}
                  </p>
                )}

                {address?.pincode && (
                  <p>{address.pincode}</p>
                )}
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-600 leading-6">
              <p className="font-medium text-black mb-2">
                Delivery Address
              </p>

              <p>
                {shippingAddress}
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;