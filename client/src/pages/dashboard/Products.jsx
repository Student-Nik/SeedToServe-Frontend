import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductSearch from "@/components/Products/ProductSearch";
import ProductFilters from "@/components/Products/roductFilters";
import ProductSort from "@/components/Products/ProductSort";
import ProductSkeleton from "@/components/Products/ProductSkeleton";
import EmptyProducts from "@/components/Products/EmptyProducts";
import ProductGrid from "@/components/Products/ProductGrid";


export default function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/buy/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to load products");
      }

      const data = await res.json();

      console.log("Products Response:", data);

      // Flatten grouped products into one array
      const allProducts = [
        ...(data?.Vegetables || []),
        ...(data?.Fruits || []),
        ...(data?.Dairy || []),
        ...(data?.Grains || []),
        ...(data?.Bakery || []),
        ...(data?.Organic || []),
      ];

      setProducts(allProducts);
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

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search
    if (search.trim()) {
      const value = search.toLowerCase();

      list = list.filter(
        (product) =>
          product.name?.toLowerCase().includes(value) ||
          product.categoryName?.toLowerCase().includes(value)
      );
    }

    // Category
    if (category !== "All") {
      list = list.filter(
        (product) =>
          product.categoryName?.toLowerCase() ===
          category.toLowerCase()
      );
    }

    // Sorting
    switch (sort) {
      case "priceLow":
        list.sort((a, b) => a.price - b.price);
        break;

      case "priceHigh":
        list.sort((a, b) => b.price - a.price);
        break;

      case "az":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "za":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;

      default:
        break;
    }

    return list;
  }, [products, search, category, sort]);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((item) => item.categoryName)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Products
          </h1>

          <p className="mt-2 text-gray-500">
            Fresh products directly from trusted local farmers.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5">

          <ProductSearch
            value={search}
            onChange={setSearch}
          />

          <div className="flex flex-col lg:flex-row justify-between gap-4">

            <ProductFilters
              categories={categories}
              selectedCategory={category}
              onCategoryChange={setCategory}
            />

            <ProductSort
              value={sort}
              onChange={setSort}
            />

          </div>
        </div>

        {/* Product Count */}
        <div className="flex items-center justify-between mt-6">

          <h2 className="text-lg font-semibold text-gray-900">
            Products
          </h2>

          <span className="text-sm text-gray-500">
            {filteredProducts.length} Products
          </span>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
            {error}
          </div>
        )}

        {/* Product Grid */}
        <div className="mt-6">

          {loading ? (
            <ProductSkeleton />
          ) : filteredProducts.length === 0 ? (
            <EmptyProducts />
          ) : (
            <ProductGrid
              products={filteredProducts}
            />
          )}

        </div>
      </div>
    </motion.div>
  );
}