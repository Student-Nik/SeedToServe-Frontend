import CategoryGrid from "@/components/UserDashboard/CategoryGrid";
import HeroSection from "@/components/UserDashboard/HeroSection";
import ProductSection from "@/components/UserDashboard/ProductSection";
import PromoBanner from "@/components/UserDashboard/PromoBanner";
import { useEffect, useState } from "react";

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

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/buy/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("Products Response:", data);

      setVegetables(data?.Vegetables || []);
      setFruits(data?.Fruits || []);
      setDairy(data?.Dairy || []);
      setGrains(data?.Grains || []);
    } catch (err) {
      console.error(err);
      setError("Couldn't load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <div id="categories">
        <CategoryGrid />
      </div>

      {/* Seasonal Banner */}
      <div className="px-4 sm:px-6">
        <PromoBanner
          tag="Seasonal Picks"
          title="Seasonal Products, Handpicked Fresh"
          desc="Enjoy the best of the season - sourced fresh from local farms every week."
          ctaText="Shop Seasonal"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-center text-sm text-red-500 py-4">
          {error}
        </p>
      )}

      {/* Products */}
      {loading ? (
        <p className="text-center text-sm text-gray-400 py-10">
          Loading fresh picks...
        </p>
      ) : (
        <>
          <ProductSection
            title="Fresh Vegetables"
            subtitle="Straight from the farm, picked this morning"
            products={vegetables}
          />

          <ProductSection
            title="Fresh Fruits"
            subtitle="Naturally sweet and packed with nutrients"
            products={fruits}
          />

          <ProductSection
            title="Dairy Products"
            subtitle="Farm-fresh dairy delivered every morning"
            products={dairy}
          />

          <ProductSection
            title="Grains"
            subtitle="Healthy grains for everyday meals"
            products={grains}
          />
        </>
      )}

      {/* Bottom Banners */}
      <div className="px-4 sm:px-6 pb-14 grid sm:grid-cols-2 gap-5">
        <PromoBanner
          tag="100% Certified Organic"
          tagColor="bg-green-600"
          title="Pure Organic Products, Naturally Grown"
          desc="No pesticides, no chemicals — just pure goodness from certified organic farms."
          ctaText="Shop Organic"
          bg="bg-gray-900"
        />

        <PromoBanner
          tag="Limited Time Offer"
          tagColor="bg-white/20"
          title="Flat 25% Off"
          desc="On your first order above ₹499. Use code FRESH25 at checkout."
          ctaText="Grab the Deal"
          ctaColor="bg-white text-gray-900 hover:bg-gray-100"
          bg="bg-green-900"
        />
      </div>
    </div>
  );
};

export default UserDashboard;