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

const Cart = () => {
  const navigate = useNavigate();

  const token = getToken();
  const currentUser = getCurrentUser();

  const [cartItems, setCartItems] = useState([]);

  const [totals, setTotals] = useState({
    totalAmount: 0,
    totalItems: 0,
  });

  const [loading, setLoading] = useState(true);
  const [updatingItemId, setUpdatingItemId] = useState(null);

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

    console.log(
      "Current user from Redux:",
      currentUser
    );

    console.log(
      "Resolved customer ID:",
      customerId
    );

    return customerId;
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

      console.log(
        "Cart API response:",
        data
      );

      setCartItems(
        Array.isArray(data.items)
          ? data.items
          : []
      );

      setTotals({
        totalAmount:
          Number(data.totalAmount) || 0,

        totalItems:
          Number(data.totalItems) || 0,
      });
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

        throw new Error(
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
        "Failed to update quantity"
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

    setCheckingAddress(true);

    try {
      const customerId =
        getResolvedCustomerId();

      console.log(
        "Customer ID used for address:",
        customerId
      );

      /*
       * IMPORTANT
       *
       * We first call the normal /show endpoint.
       *
       * Your backend should ideally derive the
       * customer from the JWT token.
       */

      let url = `${ADDRESS_API}/show`;

      /*
       * If customer ID is available, send it as
       * a query parameter as well.
       *
       * This protects against a backend implementation
       * where /show expects customerId.
       */

      if (
        customerId !== null &&
        customerId !== undefined
      ) {
        url += `?customerId=${encodeURIComponent(
          customerId
        )}`;
      }

      console.log(
        "Address request URL:",
        url
      );

      const res = await fetch(
        url,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseText =
        await res.text();

      console.log(
        "Address API status:",
        res.status
      );

      console.log(
        "Address API raw response:",
        responseText
      );

      if (res.status === 404) {
    console.log("No address found. Opening address modal.");
    setShowAddressModal(true);
    return;
}

if (!res.ok) {
    throw new Error(
        responseText || "Failed to fetch address"
    );
}

      let data;

      try {
        data = JSON.parse(
          responseText
        );
      } catch {
        throw new Error(
          "Invalid address response from server"
        );
      }

      console.log(
        "Address API parsed response:",
        data
      );

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
      } else if (
        Array.isArray(data.data)
      ) {
        addresses = data.data;
      } else if (
        data.address
      ) {
        addresses = [data.address];
      } else if (
        data.id
      ) {
        /*
         * Backend may return one address
         * directly instead of an array.
         */
        addresses = [data];
      }

      console.log(
        "Resolved customer addresses:",
        addresses
      );

      // =================================================
      // ADDRESS EXISTS
      // =================================================

      if (addresses.length > 0) {
        const selectedAddress =
          addresses[
            addresses.length - 1
          ];

        console.log(
          "Selected address:",
          selectedAddress
        );

        console.log(
          "Selected address ID:",
          selectedAddress?.id
        );

        /*
         * Make sure we really received an address.
         */
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

        navigate(
          "/dashboard/orders",
          {
            state: {
              cartItems,
              totals,
              address:
                selectedAddress,

              addressId:
                selectedAddress.id,
            },
          }
        );

        return;
      }

      // =================================================
      // NO ADDRESS
      // =================================================

      console.log(
        "No address found. Opening address modal."
      );

      setShowAddressModal(true);
    } catch (err) {
      console.error(
        "Address check error:",
        err
      );

      /*
       * Do NOT hide the actual backend error.
       */
      showToast(
        "error",
        err.message ||
          "Could not load your delivery address"
      );

      /*
       * Allow user to add an address.
       */
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
    console.log(
      "Address saved successfully:",
      savedAddress
    );

    setShowAddressModal(false);

    /*
     * Make sure saved address exists.
     */
    if (!savedAddress) {
      showToast(
        "error",
        "Address was saved but response was empty"
      );

      return;
    }

    navigate(
      "/dashboard/orders",
      {
        state: {
          cartItems,
          totals,
          address:
            savedAddress,

          addressId:
            savedAddress.id ||
            savedAddress.addressId ||
            null,
        },
      }
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 pb-10">

      <div className="max-w-6xl mx-auto px-4 pt-6">

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
            mb-4
            transition
          "
        >
          <FiArrowLeft size={16} />
          Back
        </button>

        {/* Step Indicator */}
        <span
          className="
            text-xs
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
            text-2xl
            sm:text-3xl
            font-bold
            text-black
            mt-2
          "
        >
          Your Shopping Cart
        </h1>

        {/* Item Count */}
        <p className="text-sm text-gray-500 mt-1">
          {totals.totalItems}{" "}
          {totals.totalItems === 1
            ? "item"
            : "items"}{" "}
          in your cart
        </p>

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
              gap-6
              mt-6
            "
          >

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">

              <div
                className="
                  bg-white
                  rounded-2xl
                  shadow-sm
                  border
                  border-gray-100
                  px-5
                  sm:px-6
                "
              >
                {cartItems.map(
                  (item) => (
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
                    />
                  )
                )}
              </div>

              {/* Clear Cart */}
              <button
                onClick={
                  handleClearCart
                }
                className="
                  text-sm
                  text-red-500
                  hover:text-red-600
                  font-medium
                  transition
                "
              >
                Clear Cart
              </button>

            </div>

            {/* Cart Summary */}
            <CartSummary
              itemCount={
                totals.totalItems
              }
              subtotal={
                totals.totalAmount
              }
              onCheckout={
                handleCheckout
              }
              checkingOut={
                checkingAddress
              }
            />

          </div>
        )}

      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <AddressModal
          onClose={() =>
            setShowAddressModal(false)
          }
          onSaved={
            handleAddressSaved
          }
        />
      )}

      

    </div>
  );
};

export default Cart;