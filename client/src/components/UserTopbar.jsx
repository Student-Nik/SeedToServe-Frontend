import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Package,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";

const categories = [
  "Vegetables",
  "Fruits",
  "Dairy",
  "Grains",
  "Organic",
];

const navLinks = [
  {
    label: "Home",
    path: "/dashboard",
  },
  {
    label: "My Orders",
    path: "/dashboard/order-details",
  },
  {
    label: "Cart",
    path: "/dashboard/cart",
  },
];

const UserTopbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0 group"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-[#E24A3B]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <img
              src={logo}
              alt="SeedToServe logo"
              className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl object-cover ring-1 ring-gray-200 shadow-md group-hover:ring-[#E24A3B]/40 group-hover:shadow-lg transition-all duration-300"
            />
          </div>

          <h1 className="text-xl sm:text-2xl md:text-[1.7rem] font-extrabold tracking-tight leading-none">
            <span className="text-[#1C1C1C]">
              Seed
            </span>
            <span className="text-[#E24A3B]">
              To
            </span>
            <span className="text-[#1C1C1C]">
              Serve
            </span>
          </h1>
        </motion.div>

        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="w-full flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-[#E24A3B]/50 focus-within:ring-2 focus-within:ring-[#E24A3B]/15 transition">
            <Search
              size={16}
              className="text-gray-400 shrink-0"
            />

            <input
              type="text"
              placeholder="Search for fruits, vegetables, dairy..."
              className="w-full bg-transparent text-sm text-[#1C1C1C] placeholder:text-gray-400 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">

          <motion.div
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              navigate("/dashboard/cart")
            }
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

          <motion.div
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              navigate("/dashboard/order-details")
            }
            className="p-2 rounded-full bg-gray-50 hover:bg-[#E24A3B]/10 text-[#1C1C1C] transition cursor-pointer"
            title="My Orders"
          >
            <Package size={18} />
          </motion.div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden p-2 rounded-full bg-gray-50 text-[#1C1C1C]"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </motion.button>
        </div>
      </div>

      <div className="md:hidden px-4 pb-3">
        <div className="w-full flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-[#E24A3B]/50 focus-within:ring-2 focus-within:ring-[#E24A3B]/15 transition">
          <Search
            size={16}
            className="text-gray-400 shrink-0"
          />

          <input
            type="text"
            placeholder="Search for fruits, vegetables, dairy..."
            className="w-full bg-transparent text-sm text-[#1C1C1C] placeholder:text-gray-400 outline-none"
          />
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
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
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="text-sm cursor-pointer transition-colors text-gray-600 hover:text-[#E24A3B]"
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