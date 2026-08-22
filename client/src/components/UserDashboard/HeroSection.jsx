import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Leaf, ShieldCheck, ArrowRight, ChevronDown } from "lucide-react";

const heroImg =
  "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088432/Aa_jzs8lw.avif";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroSection() {
  const navigate = useNavigate();
  const goToProducts = () => navigate("/dashboard/products");

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-gray-900">
      <img
        src={heroImg}
        alt="Farm produce"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      {/* layered gradient for legibility + depth, not a flat wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-6xl px-5 sm:px-8 md:px-12 py-16">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Farm Fresh, Delivered Daily
        </motion.span>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight"
        >
          Fresh From Farm
          <br />
          <span className="text-red-500">To Your Table</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-5 text-gray-200 text-sm sm:text-lg max-w-xl leading-relaxed"
        >
          Get the freshest fruits, vegetables, dairy and organic products
          sourced directly from local farmers, delivered to your doorstep in
          hours.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="flex flex-wrap gap-3 sm:gap-4 mt-8"
        >
          <button
            onClick={goToProducts}
            className="group inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 active:scale-[0.98] transition-all text-white px-6 sm:px-7 py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg shadow-red-500/25"
          >
            Shop Now
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>

          <button
            onClick={goToProducts}
            className="border border-white/40 text-white px-6 sm:px-7 py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-white/10 hover:border-white/70 active:scale-[0.98] transition-all backdrop-blur-sm"
          >
            Explore Categories
          </button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="flex flex-wrap gap-3 sm:gap-4 mt-9"
        >
          {[
            { icon: Truck, label: "Delivery in 2 hours" },
            { icon: Leaf, label: "100% Organic Certified" },
            { icon: ShieldCheck, label: "Quality Guaranteed" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-sm text-gray-100 text-xs sm:text-sm px-3.5 py-2 rounded-full"
            >
              <Icon size={15} className="text-red-400" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}