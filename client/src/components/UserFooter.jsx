import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Phone, Mail } from "lucide-react";
import icon from "../assets/images/logo.png";

export default function UserFooter() {
  return (
    <footer className="bg-white text-gray-600 pb-5 relative overflow-hidden border-t border-gray-100">

      {/* Top Contact Bar */}
      <div className="w-full bg-gray-900 py-4 px-4 sm:px-6 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-red-500 shrink-0" />
          <p className="text-sm font-medium text-white">+91 7219213732</p>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <Mail size={18} className="text-red-500 shrink-0" />
          <p className="text-sm font-medium text-white break-all sm:break-normal">
            seedtoservewebapplication@gmail.com
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mt-10 sm:mt-12 text-center sm:text-left">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-3">
            <img src={icon} alt="logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-bold text-gray-900">
              SeedToServe
            </h1>
          </div>

          <p className="text-gray-500 mt-4 text-sm leading-relaxed max-w-sm">
            🌱 Empowering Farmers, Connecting Communities.
            A platform where Indian farmers sell directly to consumers,
            ensuring freshness and fair pricing.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="bg-gray-100 text-gray-600 p-3 rounded-full 
                             hover:bg-red-500 hover:text-white transition duration-300 
                             cursor-pointer"
                >
                  <Icon size={14} />
                </div>
              )
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li className="hover:text-red-500 cursor-pointer transition">
              Buy
            </li>
            <li className="hover:text-red-500 cursor-pointer transition">
              Products
            </li>
            <li className="hover:text-red-500 cursor-pointer transition">
              About Us
            </li>
          </ul>
        </div>

        {/* Working Time */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Working Time
          </h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>Mon - Fri: 9.00am - 5.00pm</li>
            <li>Saturday: 10.00am - 6.00pm</li>
            <li>Sunday Closed</li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Our Address
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Shivajinagar, Pune <br />
            411001, India
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-100 mt-10 sm:mt-12 pt-6 pb-2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 text-sm text-gray-400 text-center">
        <div className="flex gap-6">
          <p className="hover:text-red-500 cursor-pointer transition">
            Terms & Conditions
          </p>
          <p className="hover:text-red-500 cursor-pointer transition">
            Privacy Policy
          </p>
        </div>

        <p className="mt-0">
          © 2025 <span className="text-red-500 font-medium">SeedToServe</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}