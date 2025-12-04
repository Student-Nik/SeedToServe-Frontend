import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaTractor, FaSeedling, FaTools } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";
import A from "@/assets/images/A.jpg";
import B from "@/assets/images/B.jpg";
import C from "@/assets/images/C.jpg";
import D from "@/assets/images/D.jpg";
import E from "@/assets/images/E.jpg";
import { useNavigate } from "react-router-dom";

const features = [
  { title: "Professional Farmers", description: "Our farmers bring years of experience to ensure the highest quality yield.", icon: "🚜" },
  { title: "Fresh Vegetables", description: "Sustainably grown produce straight from our eco farms.", icon: "🥦" },
  { title: "Agriculture Products", description: "We provide a wide range of organic agricultural products.", icon: "🌾" },
  { title: "100% Guaranteed", description: "Quality and freshness guaranteed for every delivery.", icon: "✅" },
];

const services = [
  {
    title: "Harvest Concepts",
    description: "Farming and animal husbandry discussed with farmers and scientists.",
    icon: <FaTractor className="text-green-600 text-2xl" />,
    image: B,
  },
  {
    title: "Farming Products",
    description: "We cultivate, nurture, and deliver premium-grade farming products.",
    icon: <GiFarmer className="text-green-700 text-2xl" />,
    image: C,
  },
  {
    title: "Soil Fertilization",
    description: "Improving soil health and productivity through natural techniques.",
    icon: <FaSeedling className="text-green-600 text-2xl" />,
    image: D,
  },
];

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div className="relative min-h-screen w-full bg-[#FFFBE8] overflow-hidden pb-10">
      {/* Hero Section */}
      <div className="relative w-full h-[550px] overflow-hidden rounded-b-[40px] shadow-lg">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,50,20,0.7)] via-[rgba(10,50,20,0.4)] to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white">
          <motion.div
            className="bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-sm w-fit uppercase tracking-wider"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Believe in Quality
          </motion.div>
          <motion.h1
            className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-lime-200 to-yellow-200 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Quality Trust: <br /> Direct to the Farm
          </motion.h1>
          <motion.p
            className="mt-6 text-lg max-w-2xl text-gray-100 drop-shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            We all need a little space to grow. Give yourself the space you need to find your inner you.
          </motion.p>
          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Button className="rounded-full bg-yellow-300 text-black hover:bg-yellow-200 px-6 py-3 font-semibold">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full mt-16 px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, boxShadow: "rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <Card className="relative bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center text-2xl rounded-full bg-yellow-200">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
                <div className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center bg-white border rounded-full text-sm text-gray-600">
                  ↗
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Who We Are Section */}
      <motion.section
        className="w-full px-6 md:px-12 py-4 bg-[#FFFDF0]"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src={A}
            alt="Farmer"
            className="rounded-3xl shadow-md w-full object-cover md:h-96"
          />
          <div>
            <p className="uppercase text-sm tracking-wider text-gray-500 mb-2">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f2937] mb-4">
              Currently we are growing and selling organic food
            </h2>
            <p className="text-gray-600 mb-6">
              There are many variations of passages of Lorem Ipsum available, but
              the majority have suffered alteration in some form, by injected humour,
              or randomised words which don't look even.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-3xl text-[#2E7D32]">435+</p>
                <p className="text-gray-500 text-sm">Growth Tons of Harvest</p>
              </div>
              <div>
                <p className="font-bold text-3xl text-[#2E7D32]">Eco Farms</p>
                <p className="text-gray-500 text-sm">Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Best Agriculture Services Section */}
      <motion.section
        className="w-full bg-[#5C8A57] text-white py-20 px-6 md:px-12"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <p className="uppercase text-sm tracking-wider text-yellow-200 mb-2">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Best Agriculture Services
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <Card className="bg-white text-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {service.icon}
                    <p className="uppercase text-sm tracking-wide text-gray-500">
                      {service.title}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Organic Vegetables Section */}
      <motion.section
        className="w-full mt-10 px-6 md:px-12"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card className="bg-white rounded-[40px] shadow-md overflow-hidden border-none ">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center p-6 md:p-10">

            {/* Left Image */}
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <img
                src={E} 
                alt="Organic Vegetables"
                className="w-full rounded-3xl object-cover h-[350px]"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="md:pl-12 mt-10 md:mt-0"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="mb-3">
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold shadow-sm">
                  Free Quote
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E2F] leading-tight">
                Organic Vegetables <br /> in Our Store
              </h2>

              <p className="text-gray-600 max-w-md mt-4">
                We deliver freshly harvested organic vegetables from eco-friendly farms
                directly to your kitchen — healthy, natural, and chemical-free.
              </p>

              <motion.div
                className="mt-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Button className="rounded-full bg-[#4E7C4A] hover:bg-[#3f6a3c] text-white px-8 py-6 font-semibold text-lg"
                 onClick={() => navigate("/signup")}
                >
                  Buy Now →
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Card>
      </motion.section>

    </div>
  );
};

export default Dashboard;
