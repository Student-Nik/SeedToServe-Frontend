import { useState } from "react";
import { Heart, Plus, Minus, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const badgeColors = {
  Fresh: "bg-green-600",
  Organic: "bg-green-600",
  "Best Seller": "bg-red-500",
};

export default function ProductCard({ item }) {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const [qty, setQty] = useState(0);

  const goToProducts = () => navigate("/dashboard/products");

  const badge = item.badge || item.categoryTag || null;

  const imageSrc = item.imageBase64
    ? item.imageBase64.startsWith("data:")
      ? item.imageBase64
      : `data:image/jpeg;base64,${item.imageBase64}`
    : null;

  // Optional fields — only render when the backend actually sends them.
  const hasDiscount =
    item.mrp && Number(item.mrp) > Number(item.price);
  const discountPct = hasDiscount
    ? Math.round(((item.mrp - item.price) / item.mrp) * 100)
    : null;
  const hasRating = item.rating != null;
  const outOfStock = item.stock === 0 || item.outOfStock === true;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (outOfStock) return;
    if (qty === 0) {
      setQty(1);
    }
    goToProducts();
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {imageSrc ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}
            <img
              src={imageSrc}
              alt={item.name}
              loading="lazy"
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No Image
          </div>
        )}

        {/* Top-left badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {badge && (
            <span
              className={`text-[11px] font-medium text-white px-2 py-0.5 rounded-full shadow-sm ${
                badgeColors[badge] || "bg-gray-700"
              }`}
            >
              {badge}
            </span>
          )}
          {discountPct && (
            <span className="text-[11px] font-semibold text-white bg-gray-900 px-2 py-0.5 rounded-full shadow-sm">
              {discountPct}% OFF
            </span>
          )}
        </div>

        {outOfStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted((w) => !w);
          }}
          aria-label="Save to favorites"
          aria-pressed={wishlisted}
          className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-white transition shadow-sm"
        >
          <Heart
            size={14}
            className={
              wishlisted
                ? "text-red-500 fill-red-500"
                : "text-gray-500"
            }
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {item.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-0.5">
          <p className="text-xs text-gray-500 truncate">{item.categoryName}</p>
          {item.unit && (
            <>
              <span className="text-gray-300">·</span>
              <p className="text-xs text-gray-400 whitespace-nowrap">
                {item.unit}
              </p>
            </>
          )}
        </div>

        {hasRating && (
          <div className="flex items-center gap-1 mt-1.5">
            <span className="flex items-center gap-0.5 bg-green-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
              {item.rating}
              <Star size={9} className="fill-white" />
            </span>
            {item.reviewCount != null && (
              <span className="text-[11px] text-gray-400">
                ({item.reviewCount})
              </span>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
              ₹{item.price}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through whitespace-nowrap">
                ₹{item.mrp}
              </span>
            )}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {qty === 0 ? (
              <motion.button
                key="add"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                disabled={outOfStock}
                className="flex items-center gap-1 rounded-full bg-red-500 disabled:bg-gray-300 px-3 py-1.5 text-white text-xs font-semibold transition hover:bg-red-600 shrink-0"
              >
                <Plus size={13} strokeWidth={2.5} />
                ADD
              </motion.button>
            ) : (
              <motion.div
                key="stepper"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2.5 rounded-full bg-red-500 px-2 py-1 text-white shrink-0"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setQty((q) => Math.max(0, q - 1));
                  }}
                  aria-label="Decrease quantity"
                  className="p-0.5"
                >
                  <Minus size={13} strokeWidth={2.5} />
                </button>
                <span className="text-xs font-semibold w-3 text-center">
                  {qty}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setQty((q) => q + 1);
                  }}
                  aria-label="Increase quantity"
                  className="p-0.5"
                >
                  <Plus size={13} strokeWidth={2.5} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
