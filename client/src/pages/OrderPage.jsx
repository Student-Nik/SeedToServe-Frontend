import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { showToast } from "@/helpers/showToast";
import { getToken } from "@/utils/auth";

// Order Components
import OrderHeader from "@/components/Order/OrderHeader";
import AddressCard from "@/components/Order/AddressCard";
import ProductList from "@/components/Order/ProductList";
import PriceDetails from "@/components/Order/PriceDetails";

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

  // ============================================
  // LOADING STATES
  // ============================================

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
     * If user came from Cart,
     * cart and address are already available.
     *
     * If user refreshed/directly opened the page,
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
      (field) =>
        !address[field]?.toString().trim()
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
       * replace this section with that endpoint.
       *
       * Currently the edited address is used
       * for the current order.
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
      (field) =>
        !address[field]?.toString().trim()
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

        {/* Header */}
        <OrderHeader
          onBack={() => navigate(-1)}
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

          {/* =====================================
              LEFT SIDE
          ====================================== */}

          <div className="lg:col-span-2 space-y-4">

            {/* Address */}
            <AddressCard
              address={address}
              editingAddress={editingAddress}
              setEditingAddress={
                setEditingAddress
              }
              updateAddress={updateAddress}
              handleSaveAddress={
                handleSaveAddress
              }
              savingAddress={savingAddress}
            />

            {/* Products */}
            <ProductList
              cartItems={cartItems}
            />

          </div>

          {/* =====================================
              RIGHT SIDE - PRICE
          ====================================== */}

          <PriceDetails
            totals={totals}
            mrpTotal={mrpTotal}
            deliveryFee={deliveryFee}
            savings={savings}
            grandTotal={grandTotal}
            placingOrder={placingOrder}
            cartItems={cartItems}
            handlePlaceOrder={
              handlePlaceOrder
            }
          />

        </div>

      </div>

    </div>
  );
};

export default OrderPage;