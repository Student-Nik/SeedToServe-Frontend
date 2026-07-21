import React from "react";
import { FiShield } from "react-icons/fi";

const CartSummary = ({ itemCount, subtotal, onCheckout }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 sm:p-6 space-y-4 sticky top-20">
      <h3 className="font-semibold text-gray-800">Order Summary</h3>

      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemCount} items)</span>
          <span className="font-medium text-gray-800">₹{subtotal.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Charges</span>
          <span className="font-medium text-emerald-600">FREE</span>
        </div>
      </div>

      <div className="border-t pt-3 flex justify-between items-center">
        <span className="font-bold text-gray-900">Total Amount</span>
        <span className="font-bold text-gray-900 text-lg">₹{subtotal.toFixed(0)}</span>
      </div>

      <button
        onClick={onCheckout}
        disabled={itemCount === 0}
        className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
      >
        Proceed to Checkout
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <FiShield size={12} /> Safe and Secure Payments
      </p>
    </div>
  );
};

export default CartSummary;