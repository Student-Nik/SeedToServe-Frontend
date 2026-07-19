import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

export default function ProductSearch({
  value,
  onChange,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full"
    >
      {/* Search Icon */}
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search fresh vegetables, fruits, dairy..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          h-12
          rounded-xl
          border
          border-gray-200
          bg-white
          pl-12
          pr-12
          text-sm
          placeholder:text-gray-400
          outline-none
          transition-all
          duration-200
          focus:border-red-500
          focus:ring-4
          focus:ring-red-100
          shadow-sm
        "
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1.5
            text-gray-400
            hover:bg-gray-100
            hover:text-red-500
            transition
          "
        >
          <X size={16} />
        </button>
      )}
    </motion.div>
  );
}