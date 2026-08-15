import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { showToast } from "@/helpers/showToast";
import { getToken } from "@/utils/auth";

// Order Components
import OrderHeader from "@/components/Order/OrderHeader";
import AddressCard from "@/components/Order/AddressCard";
import ProductList from "@/components/Order/ProductList";
import PriceDetails from "@/components/Order/PriceDetails";

const CART_API =
  "http://localhost:8080/api/customer/cart";

const ADDRESS_API =
  "http://localhost:8080/api/customer/address";

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getToken();

  // =====================================================
  // CART
  // =====================================================

  const [cartItems, setCartItems] = useState(
    location.state?.cartItems || []
  );

  const [totals, setTotals] = useState(
    location.state?.totals || {
      totalAmount: 0,
      totalItems: 0,
    }
  );

  // =====================================================
  // ADDRESS
  // =====================================================

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

  const [editingAddress, setEditingAddress] =
    useState(false);

  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] = useState(
    !location.state?.cartItems
  );

  const [savingAddress, setSavingAddress] =
    useState(false);

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    if (!token) {
      showToast(
        "error",
        "Your session has expired. Please log in again."
      );
      return;
    }

    if (!location.state?.cartItems) {
      fetchCart();
    }

    if (!location.state?.address) {
      fetchAddress();
    }
  }, []);

  // =====================================================
  // FETCH CART
  // =====================================================

  const fetchCart = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${CART_API}/show`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to fetch cart"
        );
      }

      const data = await res.json();

      setCartItems(data.items || []);

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
        "Could not load your cart"
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH ADDRESS
  // =====================================================

  const fetchAddress = async () => {
    try {
      const res = await fetch(
        `${ADDRESS_API}/show`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to fetch address"
        );
      }

      const data = await res.json();

      console.log(
        "Address response:",
        data
      );

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
      } else if (data.address) {
        addresses = [data.address];
      } else if (data.id) {
        addresses = [data];
      }

      console.log(
        "Resolved addresses:",
        addresses
      );

      if (addresses.length > 0) {
        const latestAddress =
          addresses[
            addresses.length - 1
          ];

        console.log(
          "Selected address:",
          latestAddress
        );

        setAddress(latestAddress);
      }

    } catch (err) {
      console.error(
        "Fetch address error:",
        err
      );
    }
  };

  // =====================================================
  // CALCULATE TOTALS
  // =====================================================

  const mrpTotal = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const deliveryFee = 0;

  const grandTotal =
    Number(totals.totalAmount || 0) ||
    mrpTotal;

  const savings =
    mrpTotal - grandTotal > 0
      ? mrpTotal - grandTotal
      : 0;

  // =====================================================
  // UPDATE ADDRESS FIELD
  // =====================================================

  const updateAddress = (
    field,
    value
  ) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =====================================================
  // SAVE UPDATED ADDRESS
  // =====================================================

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

    const missing =
      requiredFields.some(
        (field) =>
          !address[field]
            ?.toString()
            .trim()
      );

    if (missing) {
      showToast(
        "error",
        "Please fill all address fields"
      );
      return;
    }

    // Mobile validation
    if (
      !/^[0-9]{10}$/.test(
        address.mobileNo
          .toString()
          .trim()
      )
    ) {
      showToast(
        "error",
        "Please enter a valid 10-digit mobile number"
      );
      return;
    }

    // Pincode validation
    if (
      !/^[0-9]{6}$/.test(
        address.pincode
          .toString()
          .trim()
      )
    ) {
      showToast(
        "error",
        "Please enter a valid 6-digit pincode"
      );
      return;
    }

    // Address ID required
    if (!address.id) {
      console.error(
        "Address object:",
        address
      );

      showToast(
        "error",
        "Address ID not found"
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

    setSavingAddress(true);

    try {
      const requestBody = {
        id: address.id,

        fullName:
          address.fullName,

        mobileNo:
          address.mobileNo,

        houseNoOrStreet:
          address.houseNoOrStreet,

        villageOrTown:
          address.villageOrTown,

        district:
          address.district,

        state:
          address.state,

        pincode:
          address.pincode,
      };

      console.log(
        "Updating address:",
        requestBody
      );

      const res = await fetch(
        `${ADDRESS_API}/update`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(
            requestBody
          ),
        }
      );

      const responseText =
        await res.text();

      console.log(
        "Update address status:",
        res.status
      );

      console.log(
        "Update address response:",
        responseText
      );

      if (!res.ok) {
        throw new Error(
          responseText ||
            "Failed to update address"
        );
      }

      let data = null;

      try {
        data =
          JSON.parse(
            responseText
          );
      } catch {
        data = null;
      }

      const updatedAddress =
        data?.address ||
        data?.data ||
        data;

      if (
        updatedAddress &&
        typeof updatedAddress ===
          "object"
      ) {
        setAddress((prev) => ({
          ...prev,
          ...updatedAddress,
        }));
      }

      setEditingAddress(false);

      showToast(
        "success",
        "Delivery address updated successfully"
      );

    } catch (err) {
      console.error(
        "Update address error:",
        err
      );

      showToast(
        "error",
        err.message ||
          "Could not update address"
      );

    } finally {
      setSavingAddress(false);
    }
  };

  // =====================================================
  // PLACE ORDER
  // (Validates address, then hands off to the Payment page.
  //  The actual order-placement API call now lives in
  //  PaymentPage.jsx — this page no longer calls it directly.)
  // =====================================================

  const handlePlaceOrder = () => {
    const requiredFields = [
      "fullName",
      "mobileNo",
      "houseNoOrStreet",
      "villageOrTown",
      "district",
      "state",
      "pincode",
    ];

    const missing =
      requiredFields.some(
        (field) =>
          !address[field]
            ?.toString()
            .trim()
      );

    if (missing) {
      showToast(
        "error",
        "Please add a delivery address before continuing"
      );

      setEditingAddress(true);

      return;
    }

    navigate("/dashboard/payment", {
      state: {
        address,
        cartItems,
        totals,
        grandTotal,
        mrpTotal,
        savings,
        deliveryFee,
      },
    });
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

        <OrderHeader
          onBack={() =>
            navigate(-1)
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-4">

            <AddressCard
              address={address}
              editingAddress={
                editingAddress
              }
              setEditingAddress={
                setEditingAddress
              }
              updateAddress={
                updateAddress
              }
              handleSaveAddress={
                handleSaveAddress
              }
              savingAddress={
                savingAddress
              }
            />

            <ProductList
              cartItems={cartItems}
            />

          </div>

          {/* RIGHT */}
          <PriceDetails
            totals={totals}
            mrpTotal={mrpTotal}
            deliveryFee={
              deliveryFee
            }
            savings={savings}
            grandTotal={
              grandTotal
            }
            cartItems={
              cartItems
            }
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