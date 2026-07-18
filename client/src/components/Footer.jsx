import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Phone, Mail } from "lucide-react";
import icon from "../assets/images/logo.png";

// Animation variants
const containerStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const socialLinks = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaTwitter, href: "#" },
  { icon: FaLinkedinIn, href: "#" },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/the.seedtoserve?igsh=MWIyY20zeWNscGViYg==",
  },
];

export default function Footer() {
  return (
    <footer className="bg-white pb-5 relative overflow-hidden">
      {/* Top contact strip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full bg-[#1C1C1C] py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-center sm:text-left"
      >
        <motion.div
          whileHover={{ x: 3 }}
          className="flex items-center gap-2"
        >
          <Phone size={18} className="text-[#E24A3B]" />
          <p className="text-sm text-white font-medium">+91 7219213732</p>
        </motion.div>
        <motion.div
          whileHover={{ x: 3 }}
          className="flex items-center gap-2"
        >
          <Mail size={18} className="text-[#E24A3B]" />
          <p className="text-sm text-white font-medium">
            seedtoservewebapplication@gmail.com
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mt-8"
      >
        {/* Brand column */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center gap-2">
            <img src={icon} alt="logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-semibold text-[#1C1C1C]">
              SeedToServe
            </h1>
          </div>

          <p className="text-gray-500 mt-4 text-sm leading-relaxed">
            🌱 SeedToServe – Empowering Farmers, Connecting Communities. An
            e-commerce platform that lets Indian farmers sell directly to
            consumers, cutting out middlemen and ensuring fair prices.
          </p>

          <div className="flex items-center gap-3 mt-5">
            {socialLinks.map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-100 shadow-sm p-2 rounded-full text-gray-700 hover:bg-[#E24A3B] hover:text-white transition-colors cursor-pointer"
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-semibold mb-4 text-[#1C1C1C]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <motion.li
              whileHover={{ x: 4, color: "#E24A3B" }}
              className="cursor-pointer w-fit"
            >
              Buy
            </motion.li>
          </ul>
        </motion.div>

        {/* Working Time */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-semibold mb-4 text-[#1C1C1C]">
            Working Time
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Mon - Fri: 9.00am - 5.00pm</li>
            <li>Saturday: 10.00am - 6.00pm</li>
            <li>Sunday Closed</li>
          </ul>
        </motion.div>

        {/* Address */}
        <motion.div variants={fadeUp}>
          <h3 className="text-lg font-semibold mb-4 text-[#1C1C1C]">
            Our Address
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Shivajinagar, Pune <br />
            411001, India
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border-t border-gray-200 mt-12 pt-4 pb-2 origin-left"
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500"
      >
        <div className="flex gap-6">
          <p className="hover:text-[#E24A3B] transition-colors cursor-pointer">
            Terms & Conditions
          </p>
          <p className="hover:text-[#E24A3B] transition-colors cursor-pointer">
            Privacy Policy
          </p>
        </div>
        <p className="text-gray-400 tracking-widest">*****************</p>
        <p>Copyright © 2025 SeedToServe, All Rights Reserved.</p>
      </motion.div>
    </footer>
  );
}