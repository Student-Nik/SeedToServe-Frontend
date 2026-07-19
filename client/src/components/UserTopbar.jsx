import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";

const navLinks = [
  { label: "Home"},
  { label: "Products"},
  { label: "Orders"},
];

const categories = ["Vegetables", "Fruits", "Dairy", "Grains", "Organic"];

const UserTopbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50"
    >
      {/* ---------------- Top row ---------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <img
            src={logo}
            alt="SeedToServe logo"
            className="w-9 h-9 rounded-lg object-cover"
          />
          <h1 className="text-lg font-extrabold text-[#1C1C1C] tracking-tight hidden xs:block">
            Seed<span className="text-[#E24A3B]">To</span>Serve
          </h1>
        </motion.div>

        {/* SEARCH BAR (desktop/tablet) */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="w-full flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-[#E24A3B]/50 focus-within:ring-2 focus-within:ring-[#E24A3B]/15 transition">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search for fruits, vegetables, dairy..."
              className="w-full bg-transparent text-sm text-[#1C1C1C] placeholder:text-gray-400 outline-none"
            />
          </div>
        </div>

        {/* ACTION ICONS */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Cart */}
          <motion.div
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/dashboard/cart")}
            className="relative p-2 rounded-full bg-gray-50 hover:bg-[#E24A3B]/10 text-[#1C1C1C] transition cursor-pointer"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-[#E24A3B] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.div>

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/dashboard/profile")}
            className="p-2 rounded-full bg-gray-50 hover:bg-[#E24A3B]/10 text-[#1C1C1C] transition cursor-pointer"
          >
            <User size={18} />
          </motion.div>

          {/* Mobile menu toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full bg-gray-50 text-[#1C1C1C]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </div>

      {/* SEARCH BAR (mobile, own row) */}
      <div className="md:hidden px-4 pb-3">
        <div className="w-full flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-[#E24A3B]/50 focus-within:ring-2 focus-within:ring-[#E24A3B]/15 transition">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search for fruits, vegetables, dairy..."
            className="w-full bg-transparent text-sm text-[#1C1C1C] placeholder:text-gray-400 outline-none"
          />
        </div>
      </div>

      {/* ---------------- Category / Nav row (desktop) ---------------- */}
      <div className="hidden md:flex justify-center gap-8 text-sm font-medium border-t border-gray-100 py-2.5">
        {navLinks.map((link) => (
          <span
            key={link.label}
            onClick={() => navigate(link.path)}
            className="text-gray-600 hover:text-[#E24A3B] cursor-pointer transition-colors"
          >
            {link.label}
          </span>
        ))}
        <span className="w-px bg-gray-200" />
        {categories.map((cat) => (
          <span
            key={cat}
            className={`cursor-pointer transition-colors ${
              cat === "Offers"
                ? "text-[#E24A3B] font-semibold"
                : "text-gray-600 hover:text-[#E24A3B]"
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* ---------------- Mobile dropdown menu ---------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-gray-100"
          >
            <div className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <motion.span
                  key={link.label}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    navigate(link.path);
                    setMenuOpen(false);
                  }}
                  className="py-2 text-sm font-medium text-gray-700 hover:text-[#E24A3B] cursor-pointer transition-colors"
                >
                  {link.label}
                </motion.span>
              ))}
              <div className="h-px bg-gray-100 my-1" />
              <div className="flex flex-wrap gap-x-4 gap-y-2 py-1">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm cursor-pointer transition-colors ${
                      cat === "Offers"
                        ? "text-[#E24A3B] font-semibold"
                        : "text-gray-600 hover:text-[#E24A3B]"
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default UserTopbar;