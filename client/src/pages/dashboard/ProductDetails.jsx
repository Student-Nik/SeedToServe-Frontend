import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiArrowLeft,
  FiTruck,
  FiShield,
  FiRotateCcw,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
} from "react-icons/fi";
import { showToast } from "@/helpers/showToast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [expandedSection, setExpandedSection] = useState("description");

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/show/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch product");

      const data = await res.json();
      console.log("product response:", data); // TEMP: verify field names
      setProduct(data);
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (product && next > product.stock) return product.stock;
      return next;
    });
  };

const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/api/customer/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: quantity,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "Failed to add to cart");
    }

    const message = await res.text();
    console.log("cart add response:", message); // e.g. "Cart updated successfully"

    showToast("success", `${product.name} to cart`);
  } catch (err) {
    console.error(err);
    showToast("error", "Failed to add product to cart");
  }
};;


  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= 20;
  const stockPercent = Math.min(100, (product.stock / 500) * 100);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      {/* TOP NAV */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-2"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft size={20} /> Back
          </Button>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-red-500">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.categoryId}`} className="hover:text-red-500">
              {product.categoryName}
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium truncate max-w-[160px]">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-5">
        {/* Mobile breadcrumb */}
        <div className="sm:hidden text-xs text-gray-500 flex items-center gap-1 mb-4 overflow-x-auto whitespace-nowrap">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to={`/category/${product.categoryId}`}>{product.categoryName}</Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* ---------------- IMAGE ---------------- */}
          <div className="space-y-3">
            <div className="relative bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="absolute top-3 left-3 z-10 flex gap-2">
                <span className="bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  Fresh
                </span>
                {lowStock && (
                  <span className="bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    Selling fast
                  </span>
                )}
              </div>
              <button
                onClick={() => setWishlisted((w) => !w)}
                className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:scale-105 transition"
              >
                <FiHeart
                  size={18}
                  className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}
                />
              </button>
              <img
                src={product.imageBase64}
                alt={product.name}
                className="w-full h-80 sm:h-96 lg:h-[26rem] object-cover"
              />
            </div>

            {/* Trust badges row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-white rounded-xl border p-3 flex flex-col items-center text-center gap-1">
                <FiTruck className="text-emerald-600" size={18} />
                <span className="text-[11px] sm:text-xs text-gray-600 leading-tight">
                  Fast delivery
                </span>
              </div>
              <div className="bg-white rounded-xl border p-3 flex flex-col items-center text-center gap-1">
                <FiShield className="text-blue-600" size={18} />
                <span className="text-[11px] sm:text-xs text-gray-600 leading-tight">
                  Quality checked
                </span>
              </div>
              <div className="bg-white rounded-xl border p-3 flex flex-col items-center text-center gap-1">
                <FiRotateCcw className="text-orange-600" size={18} />
                <span className="text-[11px] sm:text-xs text-gray-600 leading-tight">
                  Easy returns
                </span>
              </div>
            </div>
          </div>

          {/* ---------------- DETAILS ---------------- */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl shadow-sm border p-5 sm:p-6 space-y-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">
                  {product.categoryName}
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                    outOfStock
                      ? "bg-red-50 text-red-600 border-red-100"
                      : "bg-blue-50 text-blue-600 border-blue-100"
                  }`}
                >
                  {outOfStock ? "Out of Stock" : "In Stock"}
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                <span className="text-sm text-gray-500">
                  · inclusive of all taxes
                </span>
              </div>

              {/* Stock indicator */}
              <div className="bg-gray-50 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {outOfStock ? (
                      "Currently unavailable"
                    ) : (
                      <>
                        <span className="font-semibold text-gray-800">
                          {product.stock}
                        </span>{" "}
                        Stock available
                      </>
                    )}
                  </span>
                  {lowStock && (
                    <span className="text-orange-600 text-xs font-medium">
                      Low stock
                    </span>
                  )}
                </div>
                {!outOfStock && (
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        lowStock ? "bg-orange-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${stockPercent}%` }}
                    />
                  </div>
                )}
              </div>

              {/* QUANTITY */}
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={outOfStock}
                      className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="w-10 text-center font-semibold text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={outOfStock}
                      className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Subtotal:{" "}
                    <span className="font-semibold text-gray-800">
                      ₹{(product.price * quantity).toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>

              {/* DESKTOP ACTIONS */}
              <div className="hidden md:grid  pt-1">
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 h-11"
                  disabled={outOfStock}
                  onClick={handleAddToCart}
                >
                  <FiShoppingCart size={18} /> Add to Cart
                </Button>
              </div>
              <button
                className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
              >
                <FiShare2 size={16} /> Share this product
              </button>
            </div>

            {/* Category info card */}
            <div className="bg-white rounded-2xl shadow-sm border p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <FiCheckCircle className="text-emerald-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Sourced under {product.categoryName}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Verified farmer-listed product, checked for quality before dispatch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- EXPANDABLE INFO SECTIONS ---------------- */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border divide-y">
          <div>
            <button
              onClick={() => toggleSection("description")}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
            >
              <span className="font-semibold text-gray-800">Product Description</span>
              {expandedSection === "description" ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {expandedSection === "description" && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description && product.description.trim().length > 0
                    ? product.description
                    : "No description has been added for this product yet."}
                </p>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection("details")}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
            >
              <span className="font-semibold text-gray-800">Product Details</span>
              {expandedSection === "details" ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {expandedSection === "details" && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <dt className="text-gray-500">Category</dt>
                    <dd className="text-gray-800 font-medium">{product.categoryName}</dd>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <dt className="text-gray-500">Price</dt>
                    <dd className="text-gray-800 font-medium">₹{product.price}</dd>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <dt className="text-gray-500">Availability</dt>
                    <dd className="text-gray-800 font-medium">
                      {outOfStock ? "Out of stock" : `${product.stock} in stock`}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- MOBILE STICKY BAR ---------------- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-2px_8px_rgba(0,0,0,0.06)] z-30">
        <div className="flex items-center gap-3 p-3">
          <div className="flex-shrink-0">
            <p className="text-xs text-gray-500">Total</p>
            <p className="font-bold text-gray-900">
              ₹{(product.price * quantity).toFixed(2)}
            </p>
          </div>
          <Button
            className="flex-1 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 h-11"
            disabled={outOfStock}
            onClick={handleAddToCart}
          >
            <FiShoppingCart size={18} /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;