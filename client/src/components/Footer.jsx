import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Phone, Mail } from "lucide-react";
import icon from "../assets/images/logo.png";

export default function Footer() {
    return (
        <footer className="bg-[#F1F4D8] pt-30 pb-10 relative overflow-hidden">
            <div className="w-full bg-[#E4E78A] py-4 px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Phone size={18} />
                    <p className="text-sm text-gray-800 font-medium">+91 7219213732</p>
                </div>
                <div className="flex items-center gap-2">
                    <Mail size={18} />
                    <p className="text-sm text-gray-800 font-medium">seedtoservewebapplication@gmail.com</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mt-12">
                <div>
                    <div className="flex items-center gap-2">
                        <img src={icon} alt="logo" className="w-10 h-10 rounded-full" />
                        <h1 className="text-2xl font-semibold">SeedToServe</h1>
                    </div>

                    <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                        🌱 SeedToServe – Empowering Farmers, Connecting Communities
                        An e-commerce platform that lets Indian farmers sell directly to consumers, cutting out middlemen and ensuring fair prices.
                    </p>

                    <div className="flex items-center gap-3 mt-5">
                        <a className="bg-white shadow p-2 rounded-full hover:bg-green-100 cursor-pointer">
                            <FaFacebookF size={14} />
                        </a>
                        <a className="bg-white shadow p-2 rounded-full hover:bg-green-100 cursor-pointer">
                            <FaTwitter size={14} />
                        </a>
                        <a className="bg-white shadow p-2 rounded-full hover:bg-green-100 cursor-pointer">
                            <FaLinkedinIn size={14} />
                        </a>
                        <a href="https://www.instagram.com/the.seedtoserve?igsh=MWIyY20zeWNscGViYg==" className="bg-white shadow p-2 rounded-full hover:bg-green-100 cursor-pointer">
                            <FaInstagram size={14} />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="hover:text-green-600 cursor-pointer">Buy</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Working Time</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                        <li>Mon - Fri: 9.00am - 5.00pm</li>
                        <li>Saturday: 10.00am - 6.00pm</li>
                        <li>Sunday Closed</li>
                    </ul>
                </div>

                {/* Address */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Our Address</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        shivajinagar Pune <br />
                        41101, India
                    </p>
                </div>
            </div>

            {/* Bottom Border */}
            <div className="border-t border-gray-300 mt-12 pt-4 pb-2"></div>

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between text-sm text-gray-600">
                <div className="flex gap-6">
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                </div>
                <div>
                    *****************
                </div>
                <p className="mt-3 md:mt-0">
                    Copyright © 2025 SeedToServe, All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}