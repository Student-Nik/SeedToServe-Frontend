import { motion } from "framer-motion";

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      {/* Image */}
      <div className="h-40 w-full animate-pulse bg-gray-200" />

      {/* Content */}
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />

        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />

        <div className="mt-4 flex items-center justify-between">
          <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />

          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function ProductSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        grid
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-5
      "
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </motion.div>
  );
}