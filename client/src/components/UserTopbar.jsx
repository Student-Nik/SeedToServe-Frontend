import React, { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";

const UserTopbar = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="w-full px-4 py-3">
      <div className="flex items-center justify-between bg-[#3E5F62] rounded-full px-4 py-2 shadow-lg">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <FaBars className="text-white text-lg cursor-pointer md:hidden" />

          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
            <span className="hidden md:block text-white font-semibold">
              SeedToServe
            </span>
          </div>
        </div>

        <div className="hidden md:block flex-1 mx-4">
          <input
            type="text"
            placeholder="Search for Grocery, Stores, Vegetable"
            className="w-full px-4 py-2 rounded-full text-sm outline-none"
          />
        </div>

        {showSearch && (
          <div className="md:hidden mx-2">
            <input
              type="text"
              autoFocus
              placeholder="Search..."
              className="w-36 px-3 py-1.5 rounded-full text-sm outline-none"
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          
          {!showSearch && (
            <span className="hidden md:flex text-white text-sm font-medium">
              ⚡ Order now and get it within{" "}
              <span className="text-yellow-300">15 min!</span>
            </span>
          )}

          <FaSearch
            className="md:hidden text-white text-lg cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          />

          <IoMdNotificationsOutline className="text-white text-xl cursor-pointer" />

          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
        </div>
      </div>
    </header>
  );
};

export default UserTopbar;
