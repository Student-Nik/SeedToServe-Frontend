import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";

export default function ProductSort({
  value,
  onChange,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3"
    >
      {/* Sort Label */}
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <ArrowUpDown size={18} className="text-red-500" />
        <span className="hidden sm:inline">Sort By</span>
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
            min-w-[200px]
          "
        >
          <option value="latest">Newest First</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="az">Name: A → Z</option>
          <option value="za">Name: Z → A</option>
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