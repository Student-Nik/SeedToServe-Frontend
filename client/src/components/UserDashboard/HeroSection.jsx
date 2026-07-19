import { Truck, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

const heroImg =
  "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088432/Aa_jzs8lw.avif";

export default function HeroSection() {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/dashboard/products");
  };

  return (
    <section className="relative w-full min-h-[70vh] sm:min-h-[85vh] flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Farm produce"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-6xl px-5 sm:px-8 md:px-12 py-16">
        <span className="inline-block bg-white/90 text-gray-900 text-xs font-medium px-3 py-1 rounded-full mb-4">
          Farm Fresh, Delivered Daily
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
          Fresh From Farm <br className="hidden sm:block" /> To Your Table
        </h1>

        <p className="mt-4 text-gray-200 text-sm sm:text-lg max-w-xl">
          Get the freshest fruits, vegetables, dairy and organic products
          sourced directly from local farmers, delivered to your doorstep in
          hours.
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4 mt-6">
          <button
            onClick={goToProducts}
            className="bg-red-500 hover:bg-red-600 transition text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium"
          >
            Shop Now
          </button>

          <button
            onClick={goToProducts}
            className="border border-white text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-white/10 transition"
          >
            Explore Categories
          </button>
        </div>

        <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 text-xs sm:text-sm text-gray-200">
          <span className="flex items-center gap-1.5">
            <Truck size={16} /> Delivery in 2 hours
          </span>

          <span className="flex items-center gap-1.5">
            <Leaf size={16} /> 100% Organic Certified
          </span>
        </div>
      </div>
    </section>
  );
}