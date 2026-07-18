import ProductCard from "./ProductCard";

export default function ProductSection({ title, subtitle, products, onViewAll, onAdd }) {
  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <button
          onClick={onViewAll}
          className="hidden sm:block text-sm font-medium text-red-500 hover:text-red-600 whitespace-nowrap"
        >
          View All →
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-gray-400">No products available right now.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {products.map((item, i) => (
            <ProductCard key={item.id || i} item={item} onAdd={onAdd} />
          ))}
        </div>
      )}
    </section>
  );
}