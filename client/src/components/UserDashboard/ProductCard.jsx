import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const badgeColors = {
  Fresh: "bg-green-600",
  Organic: "bg-green-600",
  "Best Seller": "bg-red-500",
};

export default function ProductCard({ item }) {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  const goToProducts = () => {
    navigate("/dashboard/products");
  };

  const badge = item.badge || item.categoryTag || null;

  // Handle Base64 image correctly
  const imageSrc = item.imageBase64
    ? item.imageBase64.startsWith("data:")
      ? item.imageBase64
      : `data:image/jpeg;base64,${item.imageBase64}`
    : null;

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {imageSrc ? (
          <>
            {/* Skeleton */}
            {imageLoading && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}

            <img
              src={imageSrc}
              alt={item.name}
              loading="lazy"
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${imageLoading ? "opacity-0" : "opacity-100"
                }`}
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No Image
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-2 left-2 text-[11px] font-medium text-white px-2 py-0.5 rounded-full ${badgeColors[badge] || "bg-gray-700"
              }`}
          >
            {badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToProducts();
          }}
          aria-label="Save to favorites"
          className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-white transition"
        >
          <Heart size={14} className="text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {item.name}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {item.categoryName}
        </p>

        {item.unit && (
          <p className="mt-1 text-xs text-gray-400">
            {item.unit}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">
            ₹{item.price}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToProducts();
            }}
            className="rounded-full bg-red-500 p-2 text-white transition hover:bg-red-600"
            aria-label={`Add ${item.name}`}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}