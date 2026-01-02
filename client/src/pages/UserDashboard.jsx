import React, { useEffect, useState } from "react";
import { ProductFlipCard } from "@/components/ProductFlipCard";
import { showToast } from "@/helpers/showToast";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH ALL PRODUCTS (DIRECT API)
  const fetchAllProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/show/product");
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductFlipCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
