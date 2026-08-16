import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";
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

// Matches the anchor IDs used in Dashboard.jsx and the links in Topbar.jsx
const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop Categories", href: "#categories" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
];

export default function Footer() {
  return (
    <footer className="bg-[#FBF7EF] pb-5 relative overflow-hidden font-sans">
      {/* Top contact strip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full bg-[#1B4332] py-4 px-4 sm:px-6 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 sm:gap-0 text-center sm:text-left"
      >
        <motion.a
          href="tel:+917219213732"
          whileHover={{ x: 3 }}
          className="flex items-center gap-2"
        >
          <Phone size={18} className="text-[#E8A33D]" />
          <p className="text-sm text-white font-medium">+91 7219213732</p>
        </motion.a>
        <motion.a
          href="mailto:seedtoservewebapplication@gmail.com"
          whileHover={{ x: 3 }}
          className="flex items-center gap-2"
        >
          <Mail size={18} className="text-[#E8A33D]" />
          <p className="text-sm text-white font-medium break-all">
            seedtoservewebapplication@gmail.com
          </p>
        </motion.a>
      </motion.div>

      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-8 md:gap-12 mt-8 sm:mt-10"
      >
        {/* Brand column */}
        <motion.div variants={fadeUp} className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <img
              src={icon}
              alt="SeedToServe logo"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#C1440E]/25"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-[#1B4332] font-display">
              Seed<span className="text-[#C1440E]">To</span>Serve
            </h1>
          </div>

          <p className="text-[#5C5648] mt-4 text-sm leading-relaxed">
            🌱 Empowering farmers, connecting communities. An e-commerce
            platform that lets Indian farmers sell directly to consumers,
            cutting out middlemen and ensuring fair prices.
          </p>

          <div className="flex items-center gap-3 mt-5">
            {socialLinks.map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white shadow-sm border border-[#7C9885]/20 p-2 rounded-full text-[#1B4332] hover:bg-[#C1440E] hover:text-white hover:border-[#C1440E] transition-colors cursor-pointer"
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeUp}>
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#1B4332] font-display">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-[#5C5648] text-sm">
            {quickLinks.map((link) => (
              <motion.li key={link.label} whileHover={{ x: 4 }} className="w-fit">
                <a
                  href={link.href}
                  className="hover:text-[#C1440E] transition-colors"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Working Time */}
        <motion.div variants={fadeUp}>
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#1B4332] font-display">
            Working Time
          </h3>
          <ul className="space-y-2.5 text-[#5C5648] text-sm">
            <li className="flex justify-between gap-4 max-w-[220px]">
              <span>Mon – Fri</span>
              <span className="text-[#2B2620] font-medium">9:00am – 5:00pm</span>
            </li>
            <li className="flex justify-between gap-4 max-w-[220px]">
              <span>Saturday</span>
              <span className="text-[#2B2620] font-medium">10:00am – 6:00pm</span>
            </li>
            <li className="flex justify-between gap-4 max-w-[220px]">
              <span>Sunday</span>
              <span className="text-[#C1440E] font-medium">Closed</span>
            </li>
          </ul>
        </motion.div>

        {/* Address */}
        <motion.div variants={fadeUp}>
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-[#1B4332] font-display">
            Our Address
          </h3>
          <div className="flex items-start gap-2 text-[#5C5648] text-sm leading-relaxed">
            <MapPin size={16} className="text-[#C1440E] mt-0.5 shrink-0" />
            <p>
              Shivajinagar, Pune <br />
              411001, Maharashtra, India
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border-t border-[#7C9885]/20 mt-12 pt-4 pb-2 origin-left"
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-[#7C9885]"
      >
        <div className="flex gap-6">
          <p className="hover:text-[#C1440E] transition-colors cursor-pointer">
            Terms & Conditions
          </p>
          <p className="hover:text-[#C1440E] transition-colors cursor-pointer">
            Privacy Policy
          </p>
        </div>
        <p className="text-[#2B2620]">
          Copyright © 2026 SeedToServe, All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
}