import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/images/logo.png";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-white border-b border-gray-200 text-[#1C1C1C] px-6 py-3 shadow-sm relative z-50"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Brand lockup (logo + wordmark) */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="SeedToServe logo"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#E24A3B]/20"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-[#1C1C1C]">
              Seed<span className="text-[#E24A3B]">To</span>Serve
            </span>
            <span className="hidden sm:block text-[10px] font-medium tracking-widest uppercase text-gray-400">
              Farm Fresh, Delivered Daily
            </span>
          </div>
        </motion.div>

        {/* Right: Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium">
          <li>
            <Link to="/login">
              <motion.span
                whileHover={{ color: "#E24A3B" }}
                className="text-sm text-gray-600 font-medium transition-colors"
              >
                Login
              </motion.span>
            </Link>
          </li>
          <Link to="/signup">
            <motion.li
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-2 bg-[#E24A3B] hover:bg-[#c73f31] text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-300 shadow-sm"
            >
              Sign Up
            </motion.li>
          </Link>
        </ul>

        {/* Mobile Hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-xl text-[#1C1C1C]"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-3 pt-4 pb-2 border-t border-gray-100 mt-3">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className="text-sm font-medium text-gray-600 px-2 py-2 hover:text-[#E24A3B] transition-colors"
                >
                  Login
                </motion.div>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#E24A3B] hover:bg-[#c73f31] text-white rounded-lg px-4 py-2.5 text-sm font-semibold text-center shadow-sm transition-colors duration-300"
                >
                  Sign Up
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Topbar;