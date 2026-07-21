import React from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-12 flex flex-col items-center text-center gap-3">
      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
        <FiShoppingCart size={28} className="text-gray-400" />
      </div>
      <h3 className="font-semibold text-gray-800 text-lg">Your cart is empty</h3>
      <p className="text-sm text-gray-500">Looks like you haven't added anything yet.</p>
      <Button className="bg-red-500 hover:bg-red-600 text-white mt-2" onClick={() => navigate("/")}>
        Continue Shopping
      </Button>
    </div>
  );
};

export default EmptyCart;