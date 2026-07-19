import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/UserDashboard/ProductCard";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function ProductGrid({ products }) {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/dashboard/products/${productId}`);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
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
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={cardVariants}
          whileHover={{
            y: -6,
            transition: {
              duration: 0.2,
            },
          }}
          className="cursor-pointer"
          onClick={() => handleProductClick(product.id)}
        >
          <ProductCard item={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}