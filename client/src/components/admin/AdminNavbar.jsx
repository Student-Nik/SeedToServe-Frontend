import React, { useState } from "react";
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

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-[#E24A3B] text-white shadow-sm"
        : "text-gray-700 hover:bg-[#E24A3B]/10 hover:text-[#E24A3B]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* ================= LOGO ================= */}
          <Link
            to="/admin"
            className="flex items-center gap-2 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-9 h-9 rounded-md bg-[#E24A3B] flex items-center justify-center text-white text-lg font-bold group-hover:scale-105 transition-transform">
              S
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-tight text-[#1C1C1C]">
                SeedToServe
              </span>

              <span className="text-[10px] uppercase tracking-widest text-[#E24A3B] font-semibold">
                Admin Panel
              </span>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden md:flex items-center gap-2">

            {/* Dashboard */}
            <NavLink
              to="/admin"
              end
              className={navLinkClass}
            >
              <FaTachometerAlt />
              Dashboard
            </NavLink>

            {/* Orders */}
            <NavLink
              to="/admin/orders"
              className={navLinkClass}
            >
              <FaShoppingCart />
              Orders
            </NavLink>

            {/* Delivery Boys */}
            <NavLink
              to="/admin/delivery-boys"
              className={navLinkClass}
            >
              <FaTruck />
              Delivery Boys
            </NavLink>

            {/* Profile */}
            <NavLink
              to="/admin/profile"
              className={navLinkClass}
            >
              <FaUserCircle />
              Profile
            </NavLink>

          </nav>

          {/* ================= DESKTOP LOGOUT ================= */}
          <div className="hidden md:block">
            <Logout />
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#1C1C1C] hover:bg-[#E24A3B]/10 hover:text-[#E24A3B] transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes size={20} />
            ) : (
              <FaBars size={20} />
            )}
          </button>
        </div>

        {/* ================= MOBILE NAV ================= */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col gap-2">

              {/* Dashboard */}
              <NavLink
                to="/admin"
                end
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTachometerAlt />
                Dashboard
              </NavLink>

              {/* Orders */}
              <NavLink
                to="/admin/orders"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaShoppingCart />
                Orders
              </NavLink>

              {/* Delivery Boys */}
              <NavLink
                to="/admin/delivery-boys"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTruck />
                Delivery Boys
              </NavLink>

              {/* Profile */}
              <NavLink
                to="/admin/profile"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUserCircle />
                Profile
              </NavLink>

              {/* Existing Logout Component */}
              <Logout />

            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;