import React from "react";
import { FaSeedling, FaHeart } from "react-icons/fa";

const AdminFooter = () => {
  return (
    <footer className="bg-[#1C1C1C] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-[#E24A3B] flex items-center justify-center">
              <FaSeedling className="text-white text-lg" />
            </div>

            <div className="leading-tight">
              <p className="font-extrabold text-lg">
                SeedToServe
              </p>

              <p className="text-xs text-gray-400">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} SeedToServe. All rights reserved.
          </p>

          {/* Made With */}
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <span>Made with</span>
            <FaHeart className="text-[#E24A3B]" />
            <span>for farmers</span>
          </div>

        </div>

        {/* Bottom Border / Message */}
        <div className="border-t border-gray-700 py-4 text-center">
          <p className="text-xs text-gray-500">
            Connecting farmers directly with consumers.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default AdminFooter;
