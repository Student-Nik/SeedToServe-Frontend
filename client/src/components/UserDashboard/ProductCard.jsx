import { Heart, Plus } from "lucide-react";

const badgeColors = {
  Fresh: "bg-green-600",
  Organic: "bg-green-600",
  "Best Seller": "bg-red-500",
};

export default function ProductCard({ item, onAdd }) {
  const badge = item.badge || item.categoryTag || null;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="relative">
        <img
          src={item.imageBase64 || item.img}
          alt={item.name}
          className="w-full h-36 sm:h-40 object-cover"
        />
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
        {item.unit && (
          <p className="text-xs text-gray-400 mt-0.5">{item.unit}</p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">
            ₹{item.price}
          </span>
          <button
            onClick={() => onAdd?.(item)}
            aria-label={`Add ${item.name}`}
            className="bg-red-500 hover:bg-red-600 transition text-white p-1.5 rounded-full"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}