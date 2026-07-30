import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";
import icon from "../assets/images/logo.png";

export default function UserFooter() {
  return (
    <footer className="bg-white border-t border-gray-200">

      {/* Contact Bar */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-5 py-3 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">

          <div className="flex items-center gap-2 text-white">
            <Phone size={16} className="text-red-500" />
            <span>+91 7219213732</span>
          </div>

          <div className="flex items-center gap-2 text-white break-all md:break-normal">
            <Mail size={16} className="text-red-500" />
            <span>seedtoservewebapplication@gmail.com</span>
          </div>

        </div>
      </div>

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Logo */}

        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={icon}
              alt="logo"
              className="w-11 h-11 rounded-full"
            />

            <h2 className="text-xl font-bold text-gray-900">
              SeedToServe
            </h2>
          </div>

          <p className="text-sm text-gray-500 leading-6">
            Empowering farmers by connecting them directly with customers,
            ensuring fresh produce, better prices, and a sustainable future.
          </p>

          <div className="flex gap-3 mt-5">

            <a
              href="#"
              className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition"
            >
              <FaFacebookF size={15} />
            </a>

            <a
              href="#"
              className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition"
            >
              <FaInstagram size={15} />
            </a>

            <a
              href="#"
              className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition"
            >
              <FaLinkedinIn size={15} />
            </a>

            <a
              href="#"
              className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition"
            >
              <FaTwitter size={15} />
            </a>

          </div>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="text-gray-900 font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm text-gray-500">

            <li>
              <a href="/" className="hover:text-red-500 transition">
                Home
              </a>
            </li>

            <li>
              <a href="/products" className="hover:text-red-500 transition">
                Products
              </a>
            </li>

            <li>
              <a href="/about" className="hover:text-red-500 transition">
                About Us
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-red-500 transition">
                Contact
              </a>
            </li>

          </ul>
        </div>

        {/* Working Hours */}

        <div>
          <h3 className="text-gray-900 font-semibold mb-4">
            Working Hours
          </h3>

          <ul className="space-y-3 text-sm text-gray-500">

            <li>Monday - Friday</li>
            <li>9:00 AM - 5:00 PM</li>

            <li>Saturday</li>
            <li>10:00 AM - 6:00 PM</li>

            <li>Sunday : Closed</li>

          </ul>
        </div>

        {/* Address */}

        <div>

          <h3 className="text-gray-900 font-semibold mb-4">
            Contact
          </h3>

          <div className="flex items-start gap-2 text-sm text-gray-500">

            <MapPin
              size={18}
              className="text-red-500 mt-1 flex-shrink-0"
            />

            <p>
              Shivajinagar,
              <br />
              Pune - 411001,
              <br />
              Maharashtra, India
            </p>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-200">

        <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">

          <div className="flex gap-6 text-gray-500">

            <a href="#" className="hover:text-red-500 transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-red-500 transition">
              Terms & Conditions
            </a>

          </div>

          <p className="text-gray-500 text-center">
            © 2025{" "}
            <span className="font-semibold text-red-500">
              SeedToServe
            </span>{" "}
            All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}