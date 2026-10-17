import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import AddressModal from "@/components/order/AddressModal";

import { showToast } from "@/helpers/showToast";
import {
  getToken,
  getCurrentUser,
} from "@/utils/auth";

const API_BASE =
  "http://localhost:8080/api/customer/cart";

const ADDRESS_API =
  "http://localhost:8080/api/customer/address";

// Same endpoint ProductDetail uses: GET /show/product/{id}
const PRODUCT_API =
  "http://localhost:8080/show/product";

const Cart = () => {
  const navigate = useNavigate();

  const token = getToken();
  const currentUser = getCurrentUser();

  const [cartItems, setCartItems] = useState([]);

  const [totals, setTotals] = useState({
    totalAmount: 0,
    totalItems: 0,
  });

  // { [productId]: stock }
  const [stockMap, setStockMap] = useState({});

  const [loading, setLoading] = useState(true);
  const [updatingItemId, setUpdatingItemId] =
    useState(null);

  // Address states
  const [showAddressModal, setShowAddressModal] =
    useState(false);

  const [checkingAddress, setCheckingAddress] =
    useState(false);

  // =====================================================
  // RESOLVE CUSTOMER ID
  // =====================================================

  const getResolvedCustomerId = () => {
    const customerId =
      currentUser?.customerId ??
      currentUser?.customer?.id ??
      currentUser?.customer?.customerId ??
      currentUser?.user?.customerId ??
      currentUser?.user?.id ??
      currentUser?.id ??
      currentUser?._id ??
      currentUser?.userId ??
      null;

    return customerId;
  };

  const getItemStock = (item) => {
    const raw =
      item?.stock ??
      item?.availableStock ??
      item?.stockQuantity ??
      item?.product?.stock ??
      stockMap[item?.productId] ??
      null;

    if (raw === null || raw === undefined) {
      return null;
    }

    const parsed = Number(raw);

    return Number.isNaN(parsed) ? null : parsed;
  };

  // =====================================================
  // FETCH STOCK FOR CART PRODUCTS
  // =====================================================

  const fetchStockForItems = async (items) => {
    const productIds = [
      ...new Set(
        items
          .filter(
            (item) =>
              item.stock === undefined &&
              item.availableStock === undefined &&
              item.stockQuantity === undefined &&
              item.productId !== undefined &&
              item.productId !== null
          )
          .map((item) => item.productId)
      ),
    ];

    if (productIds.length === 0) {
      return;
    }

    const results = await Promise.all(
      productIds.map(async (productId) => {
        try {
          const res = await fetch(
            `${PRODUCT_API}/${productId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!res.ok) {
            throw new Error(
              `Status ${res.status}`
            );
          }

          const product = await res.json();

          return [
            productId,
            product?.stock ?? null,
          ];
        } catch (err) {
          console.warn(
            `Could not load stock for product ${productId}:`,
            err.message
          );

          return [productId, null];
        }
      })
    );

    setStockMap((prev) => {
      const next = { ...prev };

      results.forEach(([productId, stock]) => {
        if (stock !== null) {
          next[productId] = stock;
        }
      });

      return next;
    });
  };

  // =====================================================
  // FETCH CART
  // =====================================================

  useEffect(() => {
    if (!token) {
      showToast(
        "error",
        "Your session has expired. Please log in again."
      );

      setLoading(false);
      return;
    }

    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/show`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = await res.text();

      if (!res.ok) {
        console.error(
          "Cart API Error:",
          res.status,
          responseText
        );

        throw new Error(
          responseText || "Failed to fetch cart"
        );
      }

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Invalid cart response from server"
        );
      }

      const items = Array.isArray(data.items)
        ? data.items
        : [];

      setCartItems(items);

      setTotals({
        totalAmount:
          Number(data.totalAmount) || 0,

        totalItems:
          Number(data.totalItems) || 0,
      });

      // Load latest stock for every product in the cart
      await fetchStockForItems(items);
    } catch (err) {
      console.error(
        "Fetch cart error:",
        err
      );

      showToast(
        "error",
        "Failed to load cart"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UPDATE QUANTITY
  // =====================================================

  const handleUpdateQuantity = async (
    itemId,
    newQuantity
  ) => {
    if (newQuantity < 1) {
      return;
    }

    // Ignore clicks while this item is updating
    if (updatingItemId === itemId) {
      return;
    }

    const targetItem = cartItems.find(
      (item) => item.id === itemId
    );

    if (!targetItem) {
      return;
    }

    // -------------------------------------------------
    // STOCK VALIDATION
    // -------------------------------------------------

    const availableStock =
      getItemStock(targetItem);

    if (
      availableStock !== null &&
      newQuantity > availableStock
    ) {
      showToast(
        "error",
        `Only ${availableStock} ${
          availableStock === 1
            ? "unit"
            : "units"
        } available in stock`
      );

      return;
    }

    const previousItems = [...cartItems];

    setUpdatingItemId(itemId);

    // Optimistic update
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              subtotal:
                Number(item.price) *
                newQuantity,
            }
          : item
      )
    );

    try {
      const res = await fetch(
        `${API_BASE}/update/item?itemId=${itemId}&quantity=${newQuantity}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = await res.text();

      if (!res.ok) {
        console.error(
          "Update quantity API error:",
          responseText
        );

        // Surface backend message (e.g. insufficient stock)
        throw new Error(
          responseText ||
            "Failed to update quantity"
        );
      }

      await fetchCart();
    } catch (err) {
      console.error(
        "Update quantity error:",
        err
      );

      setCartItems(previousItems);

      showToast(
        "error",
        err.message &&
          err.message.length < 150
          ? err.message
          : "Failed to update quantity"
      );
    } finally {
      setUpdatingItemId(null);
    }
  };

  // =====================================================
  // REMOVE ITEM
  // =====================================================

  const handleRemoveItem = async (
    itemId
  ) => {
    const previousItems = [...cartItems];

    setUpdatingItemId(itemId);

    // Optimistic update
    setCartItems((prev) =>
      prev.filter(
        (item) => item.id !== itemId
      )
    );

    try {
      const res = await fetch(
        `${API_BASE}/delete/item?itemId=${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = await res.text();

      if (!res.ok) {
        console.error(
          "Remove item API error:",
          responseText
        );

        throw new Error(
          "Failed to remove item"
        );
      }

      showToast(
        "success",
        "Item removed from cart"
      );

      await fetchCart();
    } catch (err) {
      console.error(
        "Remove item error:",
        err
      );

      setCartItems(previousItems);

      showToast(
        "error",
        "Failed to remove item"
      );
    } finally {
      setUpdatingItemId(null);
    }
  };

  // =====================================================
  // CLEAR CART
  // =====================================================

  const handleClearCart = async () => {
    const confirmed =
      window.confirm(
        "Clear all items from your cart?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/clear`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = await res.text();

      if (!res.ok) {
        console.error(
          "Clear cart API error:",
          responseText
        );

        throw new Error(
          "Failed to clear cart"
        );
      }

      showToast(
        "success",
        "Cart cleared"
      );

      await fetchCart();
    } catch (err) {
      console.error(
        "Clear cart error:",
        err
      );

      showToast(
        "error",
        "Failed to clear cart"
      );
    }
  };

  // =====================================================
  // CHECK ADDRESS + CHECKOUT
  // =====================================================

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      showToast(
        "error",
        "Your cart is empty"
      );
      return;
    }

    if (!token) {
      showToast(
        "error",
        "Your session has expired. Please log in again."
      );
      return;
    }

    // Block checkout if any item exceeds available stock
    const overStockItem = cartItems.find(
      (item) => {
        const stock = getItemStock(item);

        return (
          stock !== null &&
          Number(item.quantity) > stock
        );
      }
    );

    if (overStockItem) {
      const stock =
        getItemStock(overStockItem);

      showToast(
        "error",
        `${
          overStockItem.productName ||
          "An item"
        } has only ${stock} in stock. Please reduce the quantity.`
      );

      return;
    }

    setCheckingAddress(true);

    try {
      const customerId =
        getResolvedCustomerId();

      let url = `${ADDRESS_API}/show`;

      if (
        customerId !== null &&
        customerId !== undefined
      ) {
        url += `?customerId=${encodeURIComponent(
          customerId
        )}`;
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseText = await res.text();

      console.log(
        "Address API status:",
        res.status
      );

      console.log(
        "Address API raw response:",
        responseText
      );

      if (res.status === 404) {
        console.log(
          "No address found. Opening address modal."
        );
        setShowAddressModal(true);
        return;
      }

      if (!res.ok) {
        throw new Error(
          responseText ||
            "Failed to fetch address"
        );
      }

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Invalid address response from server"
        );
      }

      // =================================================
      // RESOLVE ADDRESS ARRAY
      // =================================================

      let addresses = [];

      if (Array.isArray(data)) {
        addresses = data;
      } else if (
        Array.isArray(data.addresses)
      ) {
        addresses = data.addresses;
      } else if (Array.isArray(data.data)) {
        addresses = data.data;
      } else if (data.address) {
        addresses = [data.address];
      } else if (data.id) {
        addresses = [data];
      }

      // =================================================
      // ADDRESS EXISTS
      // =================================================

      if (addresses.length > 0) {
        const selectedAddress =
          addresses[addresses.length - 1];

        if (
          !selectedAddress ||
          !selectedAddress.id
        ) {
          console.error(
            "Address ID missing:",
            selectedAddress
          );

          showToast(
            "error",
            "Saved address information is incomplete"
          );

          setShowAddressModal(true);

          return;
        }

        navigate("/dashboard/orders", {
          state: {
            cartItems,
            totals,
            address: selectedAddress,
            addressId: selectedAddress.id,
          },
        });

        return;
      }

      // =================================================
      // NO ADDRESS
      // =================================================

      setShowAddressModal(true);
    } catch (err) {
      console.error(
        "Address check error:",
        err
      );

      showToast(
        "error",
        err.message ||
          "Could not load your delivery address"
      );

      setShowAddressModal(true);
    } finally {
      setCheckingAddress(false);
    }
  };

  // =====================================================
  // ADDRESS SAVED
  // =====================================================

  const handleAddressSaved = (
    savedAddress
  ) => {
    setShowAddressModal(false);

    if (!savedAddress) {
      showToast(
        "error",
        "Address was saved but response was empty"
      );

      return;
    }

    navigate("/dashboard/orders", {
      state: {
        cartItems,
        totals,
        address: savedAddress,
        addressId:
          savedAddress.id ||
          savedAddress.addressId ||
          null,
      },
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-sm text-gray-500">
          Loading your cart...
        </p>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 pb-8 sm:pb-10">

      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-4 sm:pt-6">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
            hover:text-black
            mb-3
            sm:mb-4
            transition
          "
        >
          <FiArrowLeft size={16} />
          Back
        </button>

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">

          <div className="min-w-0">

            {/* Step Indicator */}
            <span
              className="
                inline-block
                text-[10px]
                sm:text-xs
                font-medium
                text-gray-600
                bg-gray-100
                px-2.5
                py-1
                rounded-full
              "
            >
              STEP 1 — SHOPPING CART
            </span>

            {/* Page Title */}
            <h1
              className="
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-bold
                text-black
                mt-2
              "
            >
              Your Shopping Cart
            </h1>

            {/* Item Count */}
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {totals.totalItems}{" "}
              {totals.totalItems === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>
          </div>

          {/* Clear Cart */}
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="
                text-xs
                sm:text-sm
                text-red-500
                hover:text-red-600
                font-medium
                transition
                py-1
              "
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="mt-6">
            <EmptyCart />
          </div>
        ) : (

          /* Cart With Items */
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-4
              sm:gap-6
              mt-4
              sm:mt-6
              items-start
            "
          >

            {/* Cart Items */}
            <div className="lg:col-span-2 min-w-0">

              <div
                className="
                  bg-white
                  rounded-xl
                  sm:rounded-2xl
                  shadow-sm
                  border
                  border-gray-100
                  px-3
                  sm:px-6
                "
              >
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={
                      handleUpdateQuantity
                    }
                    onRemove={
                      handleRemoveItem
                    }
                    updating={
                      updatingItemId ===
                      item.id
                    }
                    maxStock={getItemStock(
                      item
                    )}
                  />
                ))}
              </div>

            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1 lg:sticky lg:top-6 min-w-0">
              <CartSummary
                itemCount={totals.totalItems}
                subtotal={totals.totalAmount}
                onCheckout={handleCheckout}
                checkingOut={checkingAddress}
              />
            </div>

          </div>
        )}

      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <AddressModal
          onClose={() =>
            setShowAddressModal(false)
          }
          onSaved={handleAddressSaved}
        />
      )}

    </div>
  );
};

export default Cart;