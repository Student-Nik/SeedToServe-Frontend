import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";

export default function EmptyProducts({ onClearFilters }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 px-6"
    >
      {/* Icon */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
        <PackageSearch
          size={48}
          className="text-red-500"
        />
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        No Products Found
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-md text-center text-gray-500">
        We couldn't find any products matching your search or
        selected filters. Try searching with another keyword
        or clear the filters.
      </p>

      {/* Button */}
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="
            mt-8
            rounded-xl
            bg-red-500
            px-6
            py-3
            font-medium
            text-white
            shadow-sm
            transition
            hover:bg-red-600
            active:scale-95
          "
        >
          Clear Filters
        </button>
      )}
    </motion.div>
  );
}