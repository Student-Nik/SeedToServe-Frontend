import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/images/logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "/#categories" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "About Us", to: "/#about" },
];

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Subtle elevation once the user scrolls past the hero, keeps the bar
  // from feeling like a flat strip glued to the top on longer pages
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 w-full bg-[#FBF7EF]/95 backdrop-blur-md text-[#2B2620] px-4 sm:px-6 md:px-10 py-3 z-50 border-b transition-shadow duration-300 ${
        scrolled ? "shadow-sm border-[#7C9885]/15" : "border-transparent"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Brand lockup (logo + wordmark) */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="SeedToServe logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-[#C1440E]/25"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#1B4332] font-display">
              Seed<span className="text-[#C1440E]">To</span>Serve
            </span>
            <span className="hidden sm:block text-[10px] font-medium tracking-widest uppercase text-[#7C9885]">
              Farm Fresh, Delivered Daily
            </span>
          </div>
        </motion.div>

        {/* Center: Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to}>
                <motion.span
                  whileHover={{ color: "#C1440E" }}
                  className="text-sm text-[#5C5648] font-medium transition-colors"
                >
                  {link.label}
                </motion.span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Desktop Auth Actions */}
        <ul className="hidden md:flex items-center gap-4 sm:gap-5 font-medium">
          <li>
            <Link to="/login">
              <motion.span
                whileHover={{ color: "#C1440E" }}
                className="text-sm text-[#5C5648] font-medium transition-colors"
              >
                Login
              </motion.span>
            </Link>
          </li>
          <Link to="/signup">
            <motion.li
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-2 bg-[#C1440E] hover:bg-[#a8380c] text-white rounded-lg px-4 sm:px-5 py-2 text-sm font-semibold transition-colors duration-300 shadow-sm"
            >
              Sign Up
            </motion.li>
          </Link>
        </ul>

        {/* Mobile Hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-xl text-[#1B4332] p-1"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
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
            className="lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-1 pt-4 pb-3 border-t border-[#7C9885]/20 mt-3 max-w-7xl mx-auto">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)}>
                  <motion.div
                    whileTap={{ scale: 0.97 }}
                    className="text-sm font-medium text-[#5C5648] px-2 py-2.5 hover:text-[#C1440E] transition-colors"
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}

              <div className="h-px bg-[#7C9885]/20 my-2" />

              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className="text-sm font-medium text-[#5C5648] px-2 py-2.5 hover:text-[#C1440E] transition-colors"
                >
                  Login
                </motion.div>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#C1440E] hover:bg-[#a8380c] text-white rounded-lg px-4 py-2.5 text-sm font-semibold text-center shadow-sm transition-colors duration-300 mt-1"
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