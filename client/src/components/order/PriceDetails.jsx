import React from "react";

const PriceDetails = ({
  totals,
  mrpTotal,
  deliveryFee,
  savings,
  grandTotal,
  placingOrder,
  cartItems,
  handlePlaceOrder,
}) => {
  return (
    <div className="lg:col-span-1">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 sticky top-6">

        <h2 className="font-semibold text-gray-800 mb-4">
          Price Details
        </h2>

        <div className="space-y-3 text-sm">

          {/* Product Price */}
          <div className="flex justify-between">

            <span className="text-gray-500">
              Price ({totals.totalItems}{" "}
              {totals.totalItems === 1 ? "item" : "items"})
            </span>

            <span className="text-gray-800">
              ₹{mrpTotal.toFixed(0)}
            </span>

          </div>

          {/* Delivery */}
          <div className="flex justify-between">

            <span className="text-gray-500">
              Delivery Fee
            </span>

            <span
              className={
                deliveryFee === 0
                  ? "text-emerald-600 font-medium"
                  : "text-gray-800"
              }
            >
              {deliveryFee === 0
                ? "FREE"
                : `₹${deliveryFee}`}
            </span>

          </div>

          {/* Savings */}
          {savings > 0 && (
            <div className="flex justify-between">

              <span className="text-gray-500">
                Discount
              </span>

              <span className="text-emerald-600">
                − ₹{savings.toFixed(0)}
              </span>

            </div>
          )}

          {/* Total */}
          <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-gray-900">

            <span>Total Amount</span>

            <span>
              ₹{grandTotal.toFixed(0)}
            </span>

          </div>

          {/* Savings Message */}
          {savings > 0 && (
            <div className="bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg px-3 py-2">
              You'll save ₹{savings.toFixed(0)} on this order!
            </div>
          )}

        </div>

        {/* Place Order */}
        <button
          onClick={handlePlaceOrder}
          disabled={
            placingOrder ||
            cartItems.length === 0
          }
          className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
        >
          {placingOrder
            ? "Placing Order..."
            : "Place Order"}
        </button>

      </div>

    </div>
  );
};

export default PriceDetails;