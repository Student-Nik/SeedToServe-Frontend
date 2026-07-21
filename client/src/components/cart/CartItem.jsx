import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItem = ({ item, onUpdateQuantity, onRemove, updating }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      <img
        src={item.imageBase64}
        alt={item.productName}
        className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{item.productName}</h3>
        <span className="inline-block mt-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
          Fresh
        </span>
      </div>

      <div className="flex items-center border rounded-lg overflow-hidden flex-shrink-0">
        <button
          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
          disabled={updating || item.quantity <= 1}
          className="h-8 w-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition"
        >
          <FiMinus size={14} />
        </button>
        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
          disabled={updating}
          className="h-8 w-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition"
        >
          <FiPlus size={14} />
        </button>
      </div>

      <div className="w-16 text-right font-semibold text-gray-800 flex-shrink-0">
        ₹{item.subtotal.toFixed(0)}
      </div>

      <button
        onClick={() => onRemove(item.productId)}
        disabled={updating}
        className="text-gray-400 hover:text-red-500 transition flex-shrink-0"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  );
};

export default CartItem;