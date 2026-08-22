import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductSkeleton from "../Products/ProductSkeleton";

export default function ProductSection({
  title,
  subtitle,
  products,
  isLoading,
  scrollOnMobile = false,
}) {
  const navigate = useNavigate();
  const scrollerRef = useRef(null);

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({
      left: dir * 260,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-end justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {scrollOnMobile && (
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Scroll left"
                className="p-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 transition"
              >
                <ChevronRight size={14} className="rotate-180" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Scroll right"
                className="p-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 transition"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
          <button
            onClick={() => navigate("/dashboard/products")}
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            View All
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <ProductSkeleton />
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-gray-400">
            No products available right now.
          </p>
        </div>
      ) : scrollOnMobile ? (
        <div
          ref={scrollerRef}
          className="flex sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {products.map((it, i) => (
            <motion.div
              key={it._id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: (i % 10) * 0.03 }}
              className="min-w-[44vw] xs:min-w-[38vw] sm:min-w-0 snap-start"
            >
              <ProductCard item={it} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {products.map((it, i) => (
            <motion.div
              key={it._id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: (i % 10) * 0.03 }}
            >
              <ProductCard item={it} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}