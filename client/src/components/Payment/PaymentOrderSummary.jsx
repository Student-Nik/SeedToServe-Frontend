import React from "react";

const PaymentOrderSummary = ({ cartItems = [] }) => {

  // =====================================================
  // GET PRODUCT IMAGE
  // =====================================================

  const getProductImage = (item) => {

    // Your cart response uses imageBase64
    const image =
      item?.imageBase64 ||
      item?.productImage ||
      item?.image ||
      item?.productImageUrl ||
      item?.imageUrl ||
      item?.product?.imageBase64 ||
      item?.product?.image ||
      item?.product?.productImage ||
      item?.product?.imageUrl ||
      "";

    if (!image) {
      return "";
    }

    // -----------------------------------------------------
    // Complete URL or Base64 data URL
    // -----------------------------------------------------

    if (
      typeof image === "string" &&
      (
        image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("data:image/")
      )
    ) {
      return image;
    }

    // -----------------------------------------------------
    // Raw Base64 image without prefix
    // -----------------------------------------------------

    if (
      typeof image === "string" &&
      image.length > 100
    ) {
      return `data:image/jpeg;base64,${image}`;
    }

    return "";
  };


  // =====================================================
  // GET PRODUCT NAME
  // =====================================================

  const getProductName = (item) => {
    return (
      item?.productName ||
      item?.name ||
      item?.product?.productName ||
      item?.product?.name ||
      "Product"
    );
  };


  // =====================================================
  // CALCULATE ITEM TOTAL
  // =====================================================

  const getItemTotal = (item) => {

    const price =
      Number(item?.price || 0);

    const quantity =
      Number(item?.quantity || 0);

    const backendTotal =
      Number(
        item?.totalPrice ||
        item?.subtotal ||
        0
      );

    return backendTotal > 0
      ? backendTotal
      : price * quantity;
  };


  // =====================================================
  // CALCULATE ITEMS TOTAL
  // =====================================================

  const itemsTotal = cartItems.reduce(
    (total, item) => {
      return total + getItemTotal(item);
    },
    0
  );


  return (

    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-lg font-semibold text-black">
          Order Summary
        </h2>

        <span className="text-sm text-gray-500">
          {cartItems.length}{" "}
          {cartItems.length === 1
            ? "item"
            : "items"}
        </span>

      </div>


      {/* ================================================= */}
      {/* PRODUCTS */}
      {/* ================================================= */}

      <div className="space-y-4">

        {cartItems.length === 0 ? (

          <div className="py-6 text-center">

            <p className="text-sm text-gray-500">
              No products found.
            </p>

          </div>

        ) : (

          cartItems.map((item, index) => {

            const price =
              Number(item?.price || 0);

            const quantity =
              Number(item?.quantity || 0);

            const totalPrice =
              getItemTotal(item);

            const productImage =
              getProductImage(item);

            const productName =
              getProductName(item);


            console.log(
              "Payment Product:",
              item
            )


            return (

              <div
                key={
                  item?.productId ||
                  item?.id ||
                  item?.product?.id ||
                  index
                }
                className="flex items-center justify-between gap-4"
              >

                {/* ====================================== */}
                {/* PRODUCT INFORMATION */}
                {/* ====================================== */}

                <div className="flex items-center gap-3 min-w-0">

                  {/* ==================================== */}
                  {/* PRODUCT IMAGE */}
                  {/* ==================================== */}

                  <div
                    className="
                      w-16
                      h-16
                      rounded-lg
                      bg-gray-100
                      overflow-hidden
                      flex-shrink-0
                      border
                      border-gray-100
                    "
                  >

                    {productImage ? (

                      <img
                        src={productImage}
                        alt={productName}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                        onError={(e) => {

                          console.error(
                            "Product image failed to load:",
                            productImage
                          );

                          e.currentTarget.style.display =
                            "none";
                        }}
                      />

                    ) : (

                      <div
                        className="
                          w-full
                          h-full
                          flex
                          items-center
                          justify-center
                          text-xs
                          text-gray-400
                        "
                      >
                        No Image
                      </div>

                    )}

                  </div>


                  {/* ==================================== */}
                  {/* PRODUCT DETAILS */}
                  {/* ==================================== */}

                  <div className="min-w-0">

                    <h3
                      className="
                        text-sm
                        font-medium
                        text-black
                        truncate
                      "
                    >
                      {productName}
                    </h3>

                    <p
                      className="
                        text-sm
                        text-gray-500
                        mt-1
                      "
                    >
                      ₹{price.toFixed(2)} ×{" "}
                      {quantity}
                    </p>

                  </div>

                </div>


                {/* ====================================== */}
                {/* PRODUCT TOTAL */}
                {/* ====================================== */}

                <p
                  className="
                    font-medium
                    text-black
                    whitespace-nowrap
                  "
                >
                  ₹{totalPrice.toFixed(2)}
                </p>

              </div>

            );

          })

        )}

      </div>


      {/* ================================================= */}
      {/* ITEMS TOTAL */}
      {/* ================================================= */}

      {cartItems.length > 0 && (

        <div
          className="
            border-t
            border-gray-100
            mt-5
            pt-4
            flex
            items-center
            justify-between
          "
        >

          <span
            className="
              text-sm
              font-medium
              text-gray-600
            "
          >
            Items Total
          </span>


          <span
            className="
              font-semibold
              text-black
            "
          >
            ₹{itemsTotal.toFixed(2)}
          </span>

        </div>

      )}

    </div>

  );
};

export default PaymentOrderSummary;