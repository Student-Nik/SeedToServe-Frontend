import React from "react";

const OrderItems = ({ items = [] }) => {
  const getProductImage = (item) => {
    const image =
      item?.productImage ||
      item?.imageBase64 ||
      item?.image ||
      item?.productImageUrl ||
      item?.imageUrl ||
      item?.product?.imageBase64 ||
      item?.product?.image ||
      item?.product?.productImage ||
      item?.product?.imageUrl ||
      "";

    if (!image || typeof image !== "string") {
      return "";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:image/")
    ) {
      return image;
    }

    if (image.length > 100) {
      return `data:image/jpeg;base64,${image}`;
    }

    return "";
  };

  const getProductName = (item) => {
    return (
      item?.productName ||
      item?.name ||
      item?.product?.productName ||
      item?.product?.name ||
      "Product"
    );
  };

  const getProductPrice = (item) => {
    return Number(
      item?.price ??
        item?.productPrice ??
        item?.product?.price ??
        0
    );
  };

  const getQuantity = (item) => {
    return Number(item?.quantity ?? 0);
  };

  const getItemTotal = (item) => {
    const backendTotal = Number(
      item?.totalPrice ??
        item?.subtotal ??
        item?.total ??
        0
    );

    if (backendTotal > 0) {
      return backendTotal;
    }

    return getProductPrice(item) * getQuantity(item);
  };

  const itemsTotal = items.reduce(
    (total, item) => total + getItemTotal(item),
    0
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-black">
          Order Items
        </h2>

        <span className="text-sm text-gray-500">
          {items.length}{" "}
          {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-sm text-gray-500">
            No products found.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((item, index) => {
            const productImage = getProductImage(item);
            const productName = getProductName(item);
            const price = getProductPrice(item);
            const quantity = getQuantity(item);
            const totalPrice = getItemTotal(item);

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
                <div className="flex items-center gap-3 min-w-0">
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
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
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

                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-black truncate">
                      {productName}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹{price.toFixed(2)} × {quantity}
                    </p>
                  </div>
                </div>

                <p className="font-medium text-black whitespace-nowrap">
                  ₹{totalPrice.toFixed(2)}
                </p>
              </div>
            );
          })}

          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Items Total
            </span>

            <span className="font-semibold text-black">
              ₹{itemsTotal.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItems;