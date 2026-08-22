import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Carrot, Apple, Milk, Wheat, Sprout, Cookie } from "lucide-react";

const iconMap = {
  Vegetables: Carrot,
  Fruits: Apple,
  Dairy: Milk,
  Grains: Wheat,
  Organic: Sprout,
  Bakery: Cookie,
};

const categories = [
  {
    name: "Vegetables",
    count: "120+ items",
    img: "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088713/Vegetables_m7ab3d.avif",
  },
  {
    name: "Fruits",
    count: "95+ items",
    img: "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088626/Fruits_jhlu2y.avif",
  },
  {
    name: "Dairy",
    count: "60+ items",
    img: "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088432/Aa_jzs8lw.avif",
  },
  {
    name: "Grains",
    count: "45+ items",
    img: "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088705/Grains_oar20c.avif",
  },
  {
    name: "Organic",
    count: "80+ items",
    img: "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088713/Vegetables_m7ab3d.avif",
  },
  {
    name: "Bakery",
    count: "30+ items",
    img: "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088626/Fruits_jhlu2y.avif",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CategoryGrid() {
  const navigate = useNavigate();
  const goToProducts = () => navigate("/dashboard/products");

  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Shop by Category
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Explore our wide range of farm-fresh categories
          </p>
        </div>

        <button
          onClick={goToProducts}
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600 whitespace-nowrap transition-colors"
        >
          View All Categories →
        </button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5"
      >
        {categories.map((cat, i) => {
          const Icon = iconMap[cat.name];
          return (
            <motion.button
              key={i}
              variants={item}
              onClick={goToProducts}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:border-red-100 transition-shadow text-left"
            >
              <div className="relative h-20 sm:h-24 overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                {Icon && (
                  <span className="absolute top-1.5 left-1.5 bg-white/95 text-red-500 rounded-full p-1 sm:p-1.5 shadow-sm">
                    <Icon size={13} strokeWidth={2.25} />
                  </span>
                )}
              </div>

              <div className="p-2 sm:p-3">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                  {cat.name}
                </p>
                <p className="text-[11px] text-gray-400">{cat.count}</p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <button
        onClick={goToProducts}
        className="sm:hidden mt-5 w-full text-center text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
      >
        View All Categories →
      </button>
    </section>
  );
}