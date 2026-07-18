import CategoryGrid from "@/components/UserDashboard/CategoryGrid";
import HeroSection from "@/components/UserDashboard/HeroSection";
import ProductSection from "@/components/UserDashboard/ProductSection";
import PromoBanner from "@/components/UserDashboard/PromoBanner";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const PRODUCTS_API = "http://localhost:8080/buy/products";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(PRODUCTS_API, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data?.products ?? []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching products:", err);
          setError("Couldn't load products. Please try again shortly.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  // filter once, client-side, by categoryName
  const byCategory = useMemo(() => {
    const norm = (s) => (s || "").toLowerCase();
    return {
      vegetables: products.filter((p) => norm(p.categoryName).includes("veget")),
      fruits: products.filter((p) => norm(p.categoryName).includes("fruit")),
      dairy: products.filter((p) => norm(p.categoryName).includes("dairy")),
      grains: products.filter((p) => norm(p.categoryName).includes("grain")),
    };
  }, [products]);

  const handleAddToCart = (item) => {
    // TODO: wire up to cart context / API
    console.log("Add to cart:", item);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSection
        onShopNow={() => navigate("/dashboard/products")}
        onExploreCategories={() =>
          document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <div id="categories">
        <CategoryGrid
          onSelectCategory={(name) => navigate(`/dashboard/products?category=${name}`)}
          onViewAll={() => navigate("/dashboard/products")}
        />
      </div>

      <div className="px-4 sm:px-6">
        <PromoBanner
          tag="Seasonal Picks"
          title="Seasonal Products, Handpicked Fresh"
          desc="Enjoy the best of the season - sourced fresh from local farms every week"
          ctaText="Shop Seasonal"
          onCtaClick={() => navigate("/dashboard/products?filter=seasonal")}
        />
      </div>

      {error && (
        <p className="text-center text-sm text-red-500 py-4">{error}</p>
      )}

      {loading ? (
        <p className="text-center text-sm text-gray-400 py-10">Loading fresh picks...</p>
      ) : (
        <>
          <ProductSection
            title="Fresh Vegetables"
            subtitle="Straight from the farm, picked this morning"
            products={byCategory.vegetables}
            onAdd={handleAddToCart}
            onViewAll={() => navigate("/dashboard/products?category=vegetables")}
          />

          <ProductSection
            title="Fresh Fruits"
            subtitle="Naturally sweet and packed with nutrients"
            products={byCategory.fruits}
            onAdd={handleAddToCart}
            onViewAll={() => navigate("/dashboard/products?category=fruits")}
          />

          <ProductSection
            title="Dairy Products"
            subtitle="Farm-fresh dairy delivered every morning"
            products={byCategory.dairy}
            onAdd={handleAddToCart}
            onViewAll={() => navigate("/dashboard/products?category=dairy")}
          />
        </>
      )}

      <div className="px-4 sm:px-6 pb-14 grid sm:grid-cols-2 gap-5">
        <PromoBanner
          tag="100% Certified Organic"
          tagColor="bg-green-600"
          title="Pure Organic Products, Naturally Grown"
          desc="No pesticides, no chemicals - just pure goodness from certified organic farms."
          ctaText="Shop Organic"
          bg="bg-gray-900"
          onCtaClick={() => navigate("/dashboard/products?filter=organic")}
        />
        <PromoBanner
          tag="Limited Time Offer"
          tagColor="bg-white/20"
          title="Flat 25% Off"
          desc="On your first order above ₹499. Use code FRESH25 at checkout."
          ctaText="Grab the Deal"
          ctaColor="bg-white text-gray-900 hover:bg-gray-100"
          bg="bg-green-900"
          onCtaClick={() => navigate("/dashboard/products?promo=FRESH25")}
        />
      </div>
    </div>
  );
};

export default UserDashboard;