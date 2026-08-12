import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";

import { showToast } from "@/helpers/showToast";
import { getToken } from "@/utils/auth";

const CART_API = "http://localhost:8080/api/customer/cart";
const ADDRESS_API = "http://localhost:8080/api/customer/address";
const ORDER_API = "http://localhost:8080/api/customer/orders/place";

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getToken();

  // ============================================
  // CART DATA FROM CART PAGE
  // ============================================

  const [cartItems, setCartItems] = useState(
    location.state?.cartItems || []
  );

  const [totals, setTotals] = useState(
    location.state?.totals || {
      totalAmount: 0,
      totalItems: 0,
    }
  );

  // ============================================
  // ADDRESS
  // ============================================

  const [address, setAddress] = useState(
    location.state?.address || {
      fullName: "",
      mobileNo: "",
      houseNoOrStreet: "",
      villageOrTown: "",
      district: "",
      state: "",
      pincode: "",
    }
  );

  const [editingAddress, setEditingAddress] = useState(false);

  const [loading, setLoading] = useState(
    !location.state?.cartItems
  );

  const [placingOrder, setPlacingOrder] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);

  // ============================================
  // INITIAL LOAD
  // ============================================

  useEffect(() => {
    /*
     * If the user came from Cart,
     * cart and address are already available.
     *
     * If the user refreshed/directly opened the page,
     * fetch cart and address again.
     */
    if (!location.state?.cartItems) {
      fetchCart();
    }

    if (!location.state?.address) {
      fetchAddress();
    }
  }, []);

  // ============================================
  // FETCH CART
  // ============================================

  const fetchCart = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${CART_API}/show`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await res.json();

      setCartItems(data.items || []);

      setTotals({
        totalAmount: data.totalAmount || 0,
        totalItems: data.totalItems || 0,
      });
    } catch (err) {
      console.error("Fetch cart error:", err);

      showToast(
        "error",
        "Could not load your cart"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // FETCH ADDRESS
  // ============================================

  const fetchAddress = async () => {
    try {
      const res = await fetch(`${ADDRESS_API}/show`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch address");
      }

      const data = await res.json();

      console.log("Address response:", data);

      let addresses = [];

      /*
       * Support:
       *
       * [
       *   {...}
       * ]
       *
       * OR
       *
       * {
       *   addresses: [...]
       * }
       *
       * OR
       *
       * {
       *   data: [...]
       * }
       */

      if (Array.isArray(data)) {
        addresses = data;
      } else if (Array.isArray(data.addresses)) {
        addresses = data.addresses;
      } else if (Array.isArray(data.data)) {
        addresses = data.data;
      }

      if (addresses.length > 0) {
        const latestAddress =
          addresses[addresses.length - 1];

        setAddress(latestAddress);
      }
    } catch (err) {
      console.error(
        "Fetch address error:",
        err
      );
    }
  };

  // ============================================
  // CALCULATE TOTALS
  // ============================================

  const mrpTotal = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const deliveryFee = 0;

  const grandTotal =
    Number(totals.totalAmount || 0) || mrpTotal;

  const savings =
    mrpTotal - grandTotal > 0
      ? mrpTotal - grandTotal
      : 0;

  // ============================================
  // UPDATE ADDRESS FIELD
  // ============================================

  const updateAddress = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ============================================
  // SAVE UPDATED ADDRESS
  // ============================================

  const handleSaveAddress = async () => {
    const requiredFields = [
      "fullName",
      "mobileNo",
      "houseNoOrStreet",
      "villageOrTown",
      "district",
      "state",
      "pincode",
    ];

    const missing = requiredFields.some(
      (field) => !address[field]?.toString().trim()
    );

    if (missing) {
      showToast(
        "error",
        "Please fill all address fields"
      );
      return;
    }

    if (
      !/^[0-9]{10}$/.test(
        address.mobileNo.toString().trim()
      )
    ) {
      showToast(
        "error",
        "Please enter a valid 10-digit mobile number"
      );
      return;
    }

    if (
      !/^[0-9]{6}$/.test(
        address.pincode.toString().trim()
      )
    ) {
      showToast(
        "error",
        "Please enter a valid 6-digit pincode"
      );
      return;
    }

    setSavingAddress(true);

    try {
      /*
       * If your backend has an update-address API,
       * replace this URL with that endpoint.
       *
       * For now, the edited address is used for
       * the current order.
       */

      setEditingAddress(false);

      showToast(
        "success",
        "Delivery address updated"
      );
    } catch (err) {
      console.error(
        "Update address error:",
        err
      );

      showToast(
        "error",
        "Could not update address"
      );
    } finally {
      setSavingAddress(false);
    }
  };

  // ============================================
  // PLACE ORDER
  // ============================================

  const handlePlaceOrder = async () => {
    const requiredFields = [
      "fullName",
      "mobileNo",
      "houseNoOrStreet",
      "villageOrTown",
      "district",
      "state",
      "pincode",
    ];

    const missing = requiredFields.some(
      (field) => !address[field]?.toString().trim()
    );

    if (missing) {
      showToast(
        "error",
        "Please add a delivery address before continuing"
      );

      setEditingAddress(true);

      return;
    }

    setPlacingOrder(true);

    try {
      const res = await fetch(ORDER_API, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          address: {
            fullName: address.fullName,
            mobileNo: address.mobileNo,
            houseNoOrStreet:
              address.houseNoOrStreet,
            villageOrTown:
              address.villageOrTown,
            district: address.district,
            state: address.state,
            pincode: address.pincode,
          },

          items: cartItems.map((item) => ({
            productId:
              item.productId || item.id,
            quantity: item.quantity,
          })),

          totalAmount: grandTotal,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();

        console.error(
          "Place order API error:",
          errorText
        );

        throw new Error(
          "Failed to place order"
        );
      }

      showToast(
        "success",
        "Order placed successfully!"
      );

      navigate("/dashboard/orders");
    } catch (err) {
      console.error(
        "Place order error:",
        err
      );

      showToast(
        "error",
        "Something went wrong placing your order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  // ============================================
  // ORDER PAGE
  // ============================================

  return (
    <div className="min-h-screen bg-gray-50 pb-10">

      <div className="max-w-6xl mx-auto px-4 pt-6">

        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 transition"
        >
          <FiArrowLeft size={16} />
          Back
        </button>

        {/* Step */}

        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          STEP 2 — REVIEW ORDER
        </span>

        {/* Heading */}

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
          Confirm Your Order
        </h1>

        {/* Main Grid */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

          {/* =====================================
              LEFT SIDE
          ====================================== */}

          <div className="lg:col-span-2 space-y-4">

            {/* =====================================
                ADDRESS CARD
            ====================================== */}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">

              <div className="flex items-center justify-between mb-4">

                <div>
                  <h2 className="font-semibold text-gray-800">
                    Deliver to
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Delivery address
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setEditingAddress(
                      (prev) => !prev
                    )
                  }
                  className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  <FiEdit2 size={14} />

                  {editingAddress
                    ? "Cancel"
                    : "Change"}
                </button>

              </div>

              {/* =================================
                  EDIT ADDRESS
              ================================== */}

              {editingAddress ? (

                <div className="space-y-3">

                  <input
                    type="text"
                    placeholder="Full name"
                    value={
                      address.fullName || ""
                    }
                    onChange={(e) =>
                      updateAddress(
                        "fullName",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <input
                    type="tel"
                    placeholder="Mobile number"
                    value={
                      address.mobileNo || ""
                    }
                    onChange={(e) =>
                      updateAddress(
                        "mobileNo",
                        e.target.value
                      )
                    }
                    maxLength={10}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <input
                    type="text"
                    placeholder="House no. / Street"
                    value={
                      address.houseNoOrStreet ||
                      ""
                    }
                    onChange={(e) =>
                      updateAddress(
                        "houseNoOrStreet",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <input
                    type="text"
                    placeholder="Village / Town"
                    value={
                      address.villageOrTown ||
                      ""
                    }
                    onChange={(e) =>
                      updateAddress(
                        "villageOrTown",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <div className="grid grid-cols-2 gap-3">

                    <input
                      type="text"
                      placeholder="District"
                      value={
                        address.district || ""
                      }
                      onChange={(e) =>
                        updateAddress(
                          "district",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <input
                      type="text"
                      placeholder="State"
                      value={
                        address.state || ""
                      }
                      onChange={(e) =>
                        updateAddress(
                          "state",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                  </div>

                  <input
                    type="text"
                    placeholder="Pincode"
                    value={
                      address.pincode || ""
                    }
                    onChange={(e) =>
                      updateAddress(
                        "pincode",
                        e.target.value
                      )
                    }
                    maxLength={6}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <button
                    type="button"
                    onClick={handleSaveAddress}
                    disabled={savingAddress}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition"
                  >
                    {savingAddress
                      ? "Saving..."
                      : "Save Address"}
                  </button>

                </div>

              ) : (

                /* =================================
                   DISPLAY ADDRESS
                ================================== */

                <div className="text-sm text-gray-600">

                  {address.fullName ||
                  address.mobileNo ||
                  address.houseNoOrStreet ? (

                    <div className="space-y-1">

                      <p className="font-semibold text-gray-800">
                        {address.fullName ||
                          "—"}
                      </p>

                      <p>
                        {address.houseNoOrStreet}
                      </p>

                      <p>
                        {address.villageOrTown}
                      </p>

                      <p>
                        {address.district},{" "}
                        {address.state} -{" "}
                        {address.pincode}
                      </p>

                      <p className="pt-1 text-gray-500">
                        Mobile:{" "}
                        {address.mobileNo}
                      </p>

                    </div>

                  ) : (

                    <p className="text-amber-600">
                      No delivery address
                      available.
                    </p>

                  )}

                </div>
              )}

            </div>

            {/* =====================================
                PRODUCT LIST
            ====================================== */}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 sm:px-6 divide-y">

              {cartItems.map((item) => (

                <div
                  key={
                    item.id ||
                    item.productId
                  }
                  className="flex items-center gap-4 py-4"
                >

                  {/* Product Image */}

                  <img
                    src={
                      item.imageBase64
                    }
                    alt={
                      item.productName
                    }
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover flex-shrink-0"
                  />

                  {/* Product Details */}

                  <div className="flex-1 min-w-0">

                    <h3 className="font-semibold text-gray-800 truncate">
                      {item.productName}
                    </h3>

                    {item.description && (
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <p className="text-xs text-gray-400 mt-1">
                      Qty:{" "}
                      {item.quantity}
                    </p>

                  </div>

                  {/* Product Price */}

                  <div className="text-right flex-shrink-0">

                    <p className="font-semibold text-gray-800">
                      ₹
                      {(
                        Number(
                          item.price || 0
                        ) *
                        Number(
                          item.quantity || 0
                        )
                      ).toFixed(0)}
                    </p>

                    <p className="text-xs text-gray-400">
                      ₹
                      {Number(
                        item.price || 0
                      ).toFixed(0)}{" "}
                      each
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* =====================================
              RIGHT SIDE - PRICE
          ====================================== */}

          <div className="lg:col-span-1">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 sticky top-6">

              <h2 className="font-semibold text-gray-800 mb-4">
                Price Details
              </h2>

              <div className="space-y-3 text-sm">

                {/* Product Price */}

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Price (
                    {totals.totalItems}{" "}
                    {totals.totalItems === 1
                      ? "item"
                      : "items"}
                    )
                  </span>

                  <span className="text-gray-800">
                    ₹
                    {mrpTotal.toFixed(0)}
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
                      − ₹
                      {savings.toFixed(0)}
                    </span>

                  </div>
                )}

                {/* Total */}

                <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-gray-900">

                  <span>
                    Total Amount
                  </span>

                  <span>
                    ₹
                    {grandTotal.toFixed(0)}
                  </span>

                </div>

                {/* Savings Message */}

                {savings > 0 && (

                  <div className="bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg px-3 py-2">
                    You'll save ₹
                    {savings.toFixed(0)}{" "}
                    on this order!
                  </div>

                )}

              </div>

              {/* Place Order */}

              <button
                onClick={
                  handlePlaceOrder
                }
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

        </div>

      </div>

    </div>
  );
};

export default OrderPage;
