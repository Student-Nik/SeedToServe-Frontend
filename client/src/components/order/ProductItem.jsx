import React from "react";

const ProductItem = ({ item }) => {
  const itemTotal =
    Number(item.price || 0) *
    Number(item.quantity || 0);

  return (
    <div className="flex items-center gap-4 py-4">

      {/* Product Image */}
      <img
        src={item.imageBase64}
        alt={item.productName}
        className="
          h-16
          w-16
          sm:h-20
          sm:w-20
          rounded-lg
          object-cover
          flex-shrink-0
        "
      />

      {/* Product Details */}
      <div className="flex-1 min-w-0">

        <h3 className="font-semibold text-black truncate">
          {item.productName}
        </h3>

        {item.description && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
            {item.description}
          </p>
        )}

        <p className="text-xs text-gray-400 mt-1">
          Qty: {item.quantity}
        </p>

      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0">

        <p className="font-semibold text-black">
          ₹{itemTotal.toFixed(0)}
        </p>

        <p className="text-xs text-gray-400">
          ₹
          {Number(item.price || 0).toFixed(0)}
          {" "}each
        </p>

      </div>

    </div>
  );
};

export default ProductItem;