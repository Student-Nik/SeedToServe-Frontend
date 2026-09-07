import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaUserCircle,
  FaTruck,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Logout from "@/pages/Logout";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: <FaTachometerAlt />, end: true },
    { to: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
    { to: "/admin/delivery-boys", label: "Delivery Boys", icon: <FaTruck /> },
    { to: "/admin/profile", label: "Profile", icon: <FaUserCircle /> },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
      isActive
        ? "bg-[#E24A3B] text-white shadow-md shadow-[#E24A3B]/20"
        : "text-[#2F4C3B] hover:bg-[#E24A3B]/10 hover:text-[#E24A3B]"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-semibold transition-all duration-200 ${
      isActive
        ? "bg-[#E24A3B] text-white shadow-sm"
        : "text-[#2F4C3B] hover:bg-[#E24A3B]/10 hover:text-[#E24A3B]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FDF8F3]/95 backdrop-blur-sm border-b border-[#2F4C3B]/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">

          {/* ================= LOGO ================= */}
          <Link
            to="/admin"
            className="flex items-center gap-2.5 group shrink-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-9 h-9 rounded-lg bg-[#E24A3B] flex items-center justify-center text-white text-lg font-bold shadow-sm group-hover:scale-105 transition-transform">
              S
            </div>

            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-tight text-[#2F4C3B]">
                SeedToServe
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#E24A3B] font-bold">
                Admin Panel
              </span>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-1.5 flex-1 justify-center">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkClass}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* ================= DESKTOP LOGOUT ================= */}
          <div className="hidden lg:flex items-center shrink-0">
            <Logout />
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#2F4C3B] hover:bg-[#E24A3B]/10 hover:text-[#E24A3B] transition shrink-0"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/30 lg:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* ================= MOBILE NAV PANEL ================= */}
      <div
        className={`lg:hidden fixed top-16 left-0 right-0 z-50 bg-[#FDF8F3] border-b border-[#2F4C3B]/10 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1.5 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={mobileNavLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}

          <div className="pt-2 mt-2 border-t border-[#2F4C3B]/10">
            <Logout />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AdminNavbar;