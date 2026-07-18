const categories = [
  { name: "Vegetables", count: "120+ items", img: "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088713/Vegetables_m7ab3d.avif" },
  { name: "Fruits", count: "95+ items", img: "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088626/Fruits_jhlu2y.avif" },
  { name: "Dairy", count: "60+ items", img: "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088432/Aa_jzs8lw.avif" },
  { name: "Grains", count: "45+ items", img: "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088705/Grains_oar20c.avif" },
  { name: "Organic", count: "80+ items", img: "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088713/Vegetables_m7ab3d.avif" },
  { name: "Bakery", count: "30+ items", img: "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088626/Fruits_jhlu2y.avif" },
];

export default function CategoryGrid({ onSelectCategory, onViewAll }) {
  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-sm text-gray-500 mt-1">
            Explore our wide range of farm-fresh categories
          </p>
        </div>
        <button
          onClick={onViewAll}
          className="hidden sm:block text-sm font-medium text-red-500 hover:text-red-600 whitespace-nowrap"
        >
          View All Categories →
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => onSelectCategory?.(cat.name)}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition text-left"
          >
            <img src={cat.img} alt={cat.name} className="w-full h-20 sm:h-24 object-cover" />
            <div className="p-2 sm:p-3">
              <p className="text-xs sm:text-sm font-semibold text-gray-900">{cat.name}</p>
              <p className="text-[11px] text-gray-400">{cat.count}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}