import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ cartItems }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-100
        px-5
        sm:px-6
        divide-y
        divide-gray-100
      "
    >
      {cartItems.map((item) => (
        <ProductItem
          key={item.id || item.productId}
          item={item}
        />
      ))}
    </div>
  );
};

export default ProductList;