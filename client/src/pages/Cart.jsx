import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import { showToast } from "@/helpers/showToast";
import { getToken } from "@/utils/auth";

const API_BASE = "http://localhost:8080/api/customer/cart";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({
    totalAmount: 0,
    totalItems: 0,
  });

  const [loading, setLoading] = useState(true);
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const token = getToken();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/show`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();

      console.log("Cart Response:", data);
      console.log("Items:", data.items);
      console.log("Total Items:", data.totalItems);

      setCartItems(data.items || []);
      setTotals({
        totalAmount: data.totalAmount || 0,
        totalItems: data.totalItems || 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const prevItems = [...cartItems];

    setUpdatingItemId(itemId);

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: item.price * newQuantity,
            }
          : item,
      ),
    );

    try {
      console.log("Updating Item:", itemId);

      const res = await fetch(
        `${API_BASE}/update/item?itemId=${itemId}&quantity=${newQuantity}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Failed to update quantity");

      await fetchCart();
    } catch (err) {
      console.error(err);
      setCartItems(prevItems);
      showToast("error", "Failed to update quantity");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveItem = async (itemId) => {
    const prevItems = [...cartItems];

    setUpdatingItemId(itemId);

    setCartItems((prev) => prev.filter((item) => item.id !== itemId));

    try {
      console.log("Deleting Item:", itemId);

      const res = await fetch(`${API_BASE}/delete/item?itemId=${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to remove item");

      showToast("success", "Item removed from cart");

      await fetchCart();
    } catch (err) {
      console.error(err);
      setCartItems(prevItems);
      showToast("error", "Failed to remove item");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm("Clear all items from your cart?")) return;

    try {
      const res = await fetch(`${API_BASE}/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to clear cart");

      showToast("success", "Cart cleared");

      await fetchCart();
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to clear cart");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <FiArrowLeft size={16} />
          Back
        </button>

        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          STEP 1 — SHOPPING CART
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold mt-2">
          Your Shopping Cart
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {totals.totalItems} {totals.totalItems === 1 ? "item" : "items"} in
          your cart
        </p>

        {cartItems.length === 0 ? (
          <div className="mt-6">
            <EmptyCart />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border px-5 sm:px-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                    updating={updatingItemId === item.id}
                  />
                ))}
              </div>

              <button
                onClick={handleClearCart}
                className="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                Clear Cart
              </button>
            </div>

            <CartSummary
              itemCount={totals.totalItems}
              subtotal={totals.totalAmount}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
