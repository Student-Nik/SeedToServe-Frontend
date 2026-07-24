import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import { showToast } from "@/helpers/showToast";

const API_BASE = "http://localhost:8080/api/customer/cart";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ totalAmount: 0, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/show`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      console.log("cart show response:", data); // TEMP: remove once confirmed stable

      setCartItems(data.items || []);
      setTotals({
        totalAmount: data.totalAmount || 0,
        totalItems: data.totalItems || 0,
      });
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const prevItems = cartItems;
    setUpdatingItemId(productId);

    // optimistic update
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      const res = await fetch(
        `${API_BASE}/update/item?itemId=${productId}&quantity=${newQuantity}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      if (!res.ok) throw new Error("Failed to update quantity");

      // refetch so totalAmount/subtotal stay accurate from backend
      await fetchCart();
    } catch (err) {
      console.error(err);
      setCartItems(prevItems); // rollback
      showToast("error", "Failed to update quantity");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveItem = async (productId) => {
    const prevItems = cartItems;
    setUpdatingItemId(productId);

    setCartItems((prev) => prev.filter((item) => item.productId !== productId));

    try {
      const res = await fetch(`${API_BASE}/delete/item?itemId=${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Failed to remove item");

      showToast("success", "Item removed from cart");
      await fetchCart();
    } catch (err) {
      console.error(err);
      setCartItems(prevItems); // rollback
      showToast("error", "Failed to remove item");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleClearCart = async () => {
    if (!confirm("Clear all items from your cart?")) return;

    const prevItems = cartItems;
    const prevTotals = totals;
    setCartItems([]);
    setTotals({ totalAmount: 0, totalItems: 0 });

    try {
      const res = await fetch(`${API_BASE}/clear`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Failed to clear cart");
      showToast("success", "Cart cleared");
    } catch (err) {
      console.error(err);
      setCartItems(prevItems); // rollback
      setTotals(prevTotals);
      showToast("error", "Failed to clear cart");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="h-10 w-10 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen  pb-10">
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <FiArrowLeft size={16} /> Back
        </button>

        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          STEP 1 — SHOPPING CART
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
          Your Shopping Cart
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {totals.totalItems} {totals.totalItems === 1 ? "item" : "items"} in your cart
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
                    key={item.productId}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                    updating={updatingItemId === item.productId}
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

            <div>
              <CartSummary
                itemCount={totals.totalItems}
                subtotal={totals.totalAmount}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;