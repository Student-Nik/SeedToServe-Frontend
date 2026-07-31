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
    <section>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-500">{subtitle}</p>
        </div>

        <button
          onClick={() => navigate("/dashboard/products")}
          className="hidden sm:block text-sm font-medium text-red-500 hover:text-red-600"
        >
          View All →
        </button>
      </div>

      {isLoading ? (
        <ProductSkeleton />
      ) : products.length === 0 ? (
        <p className="text-sm text-gray-400">
          No products available right now.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
            />
          ))}
        </div>
      )}
    </section>
  );
}