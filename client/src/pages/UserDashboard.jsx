import CategoryGrid from "@/components/UserDashboard/CategoryGrid";
import HeroSection from "@/components/UserDashboard/HeroSection";
import ProductSection from "@/components/UserDashboard/ProductSection";
import PromoBanner from "@/components/UserDashboard/PromoBanner";
import { getToken } from "@/utils/auth";
import { useEffect, useState } from "react";
import { AlertCircle, RefreshCw, Sprout, Tag, Sparkles, Truck } from "lucide-react";

const UserDashboard = () => {
  const [vegetables, setVegetables] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [dairy, setDairy] = useState([]);
  const [grains, setGrains] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getToken();

      const res = await fetch("http://localhost:8080/buy/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      const data = await res.json();

      console.log("Products Response:", data);

      setVegetables(data?.Vegetables || []);
      setFruits(data?.Fruits || []);
      setDairy(data?.Dairy || []);
      setGrains(data?.Grains || []);
    } catch (err) {
      console.error(err);
      setError("Couldn't load products. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">
      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <div id="categories" className="px-4 sm:px-6 lg:px-8">
        <CategoryGrid />
      </div>

      {/* Seasonal Banner */}
      <div className="px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
        <PromoBanner
          tag="Seasonal Picks"
          icon={Sparkles}
          title="Seasonal Products, Handpicked Fresh"
          desc="Enjoy the best of the season - sourced fresh from local farms every week."
          ctaText="Shop Seasonal"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 sm:mx-6 lg:mx-8 mt-8 flex items-center justify-between gap-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
          <span className="flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </span>
          <button
            onClick={fetchProducts}
            className="flex items-center gap-1.5 font-medium text-red-600 hover:text-red-700 shrink-0"
          >
            <RefreshCw size={14} />
            Retry
          </button>
        </div>
      )}

      {/* Products */}
      <ProductSection
        title="Fresh Vegetables"
        subtitle="Straight from the farm, picked this morning"
        products={vegetables}
        isLoading={loading}
        scrollOnMobile
      />

      <ProductSection
        title="Fresh Fruits"
        subtitle="Naturally sweet and packed with nutrients"
        products={fruits}
        isLoading={loading}
        scrollOnMobile
      />

      {dairy.length > 0 || loading ? (
        <ProductSection
          title="Dairy Essentials"
          subtitle="Farm-sourced milk, cheese and more"
          products={dairy}
          isLoading={loading}
        />
      ) : null}

      {grains.length > 0 || loading ? (
        <ProductSection
          title="Grains & Staples"
          subtitle="Everyday pantry essentials"
          products={grains}
          isLoading={loading}
        />
      ) : null}

      {/* Bottom Banners */}
      <div className="px-4 sm:px-6 lg:px-8 pb-14 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-4">
        <PromoBanner
          tag="100% Certified Organic"
          tagColor="bg-green-600"
          icon={Sprout}
          title="Pure Organic Products, Naturally Grown"
          desc="No pesticides, no chemicals — just pure goodness from certified organic farms."
          ctaText="Shop Organic"
          bg="bg-gray-900"
        />

        <PromoBanner
          tag="No Minimum Order"
          tagColor="bg-white/20"
          icon={Truck}
          title="Free Delivery, Always"
          desc="No delivery fee, no minimum cart value. Order ₹50 or ₹5,000 — it's free either way."
          ctaText="Start Shopping"
          ctaColor="bg-white text-gray-900 hover:bg-gray-100"
          bg="bg-green-900"
        />
      </div>
    </div>
  );
};

export default UserDashboard;
