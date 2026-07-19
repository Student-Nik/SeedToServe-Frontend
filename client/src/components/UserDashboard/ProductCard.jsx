import { Heart, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const badgeColors = {
  Fresh: "bg-green-600",
  Organic: "bg-green-600",
  "Best Seller": "bg-red-500",
};

export default function ProductCard({ item }) {
  const navigate = useNavigate();

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
    <div
      onClick={goToProducts}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
    >
      <div className="relative">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={item.name}
            className="w-full h-36 sm:h-40 object-cover"
          />
        ) : (
          <div className="w-full h-36 sm:h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}

        {badge && (
          <span
            className={`absolute top-2 left-2 text-[11px] font-medium text-white px-2 py-0.5 rounded-full ${
              badgeColors[badge] || "bg-gray-700"
            }`}
          >
            {badge}
          </span>
        )}

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

      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {item.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {item.categoryName}
        </p>

        {item.unit && (
          <p className="text-xs text-gray-400 mt-1">
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
            className="bg-red-500 hover:bg-red-600 transition text-white p-2 rounded-full"
            aria-label={`Add ${item.name}`}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}