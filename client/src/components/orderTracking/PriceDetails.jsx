import React from "react";

const PriceDetails = ({ order }) => {

  const itemsTotal = Number(
    order?.itemsTotal ||
    order?.subtotal ||
    0
  );

  const deliveryCharge = Number(
    order?.deliveryCharge ||
    order?.shippingCharge ||
    0
  );

  const discount = Number(
    order?.discount ||
    0
  );

  const tax = Number(
    order?.tax ||
    0
  );

  const totalAmount = Number(
    order?.totalAmount ||
    (itemsTotal + deliveryCharge + tax - discount)
  );


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-black">
          Price Details
        </h2>

      </div>


      {/* ========================================= */}
      {/* PRICE BREAKDOWN */}
      {/* ========================================= */}

      <div className="space-y-4">

        {/* ITEMS TOTAL */}

        <div className="flex items-center justify-between">

          <span className="text-sm text-gray-600">
            Items Total
          </span>

          <span className="text-sm font-medium text-black">
            ₹{itemsTotal.toFixed(2)}
          </span>

        </div>


        {/* DELIVERY */}

        <div className="flex items-center justify-between">

          <span className="text-sm text-gray-600">
            Delivery Charges
          </span>

          <span
            className={`
              text-sm
              font-medium
              ${
                deliveryCharge === 0
                  ? "text-red-600"
                  : "text-black"
              }
            `}
          >
            {deliveryCharge === 0
              ? "FREE"
              : `₹${deliveryCharge.toFixed(2)}`
            }
          </span>

        </div>


        {/* DISCOUNT */}

        {discount > 0 && (

          <div className="flex items-center justify-between">

            <span className="text-sm text-gray-600">
              Discount
            </span>

            <span className="text-sm font-medium text-red-600">
              -₹{discount.toFixed(2)}
            </span>

          </div>

        )}


        {/* TAX */}

        {tax > 0 && (

          <div className="flex items-center justify-between">

            <span className="text-sm text-gray-600">
              Tax
            </span>

            <span className="text-sm font-medium text-black">
              ₹{tax.toFixed(2)}
            </span>

          </div>

        )}


        {/* ========================================= */}
        {/* TOTAL */}
        {/* ========================================= */}

        <div
          className="
            border-t
            border-gray-100
            pt-4
            flex
            items-center
            justify-between
          "
        >

          <span className="text-base font-semibold text-black">
            Total Amount
          </span>

          <span className="text-lg font-semibold text-black">
            ₹{totalAmount.toFixed(2)}
          </span>

        </div>


        {/* ========================================= */}
        {/* COD AMOUNT */}
        {/* ========================================= */}

        {order?.paymentMethod
          ?.toLowerCase()
          .includes("cash") && (

          <div
            className="
              border
              border-red-100
              bg-red-50
              rounded-lg
              p-4
            "
          >

            <div className="flex items-center justify-between">

              <span className="text-sm font-medium text-red-600">
                Amount to Pay on Delivery
              </span>

              <span className="text-base font-semibold text-black">
                ₹{totalAmount.toFixed(2)}
              </span>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default PriceDetails;