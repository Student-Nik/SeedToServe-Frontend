import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductSkeleton from "../Products/ProductSkeleton";

export default function ProductSection({
  title,
  subtitle,
  products,
  isLoading,
}) {
  const navigate = useNavigate();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-end justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>
        </div>

        <button
          onClick={() => navigate("/dashboard/products")}
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600 transition-colors shrink-0"
        >
          View All
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {isLoading ? (
        <ProductSkeleton />
      ) : products.length === 0 ? (
        <p className="text-sm text-gray-400 py-8 text-center">
          No products available right now.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {products.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
