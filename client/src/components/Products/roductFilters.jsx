import { motion } from "framer-motion";
import { Filter } from "lucide-react";

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-center gap-3"
    >
      {/* Filter Label */}
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <Filter size={18} className="text-red-500" />
        <span className="hidden sm:inline">Filter By</span>
      </div>

      {/* Category Dropdown */}
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="
            appearance-none
            bg-white
            border
            border-gray-200
            rounded-xl
            px-4
            py-2.5
            pr-10
            text-sm
            font-medium
            text-gray-700
            shadow-sm
            outline-none
            transition
            focus:border-red-500
            focus:ring-4
            focus:ring-red-100
            cursor-pointer
            min-w-[180px]
          "
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </motion.div>
  );
}