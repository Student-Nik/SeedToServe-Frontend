import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaTractor, FaSeedling } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const VIDEO_URL =
  "https://res.cloudinary.com/dfpgxonqe/video/upload/f_auto,q_auto/Vedios_lgdrbw.mp4";
const A = "https://res.cloudinary.com/dfpgxonqe/image/upload/v1766040822/A_ryzhv9.jpg";
const B = "https://res.cloudinary.com/dfpgxonqe/image/upload/v1766040893/B_oafepw.jpg";
const C = "https://res.cloudinary.com/dfpgxonqe/image/upload/v1766040918/C_egpqa9.jpg";
const D = "https://res.cloudinary.com/dfpgxonqe/image/upload/v1766040936/D_njrcqc.jpg";
const E = "https://res.cloudinary.com/dfpgxonqe/image/upload/v1766040971/E_gijyke.jpg";

const features = [
  {
    title: "Professional Farmers",
    description:
      "Our farmers bring years of experience to ensure the highest quality yield.",
    icon: "🚜",
  },
  {
    title: "Fresh Vegetables",
    description: "Sustainably grown produce straight from our eco farms.",
    icon: "🥦",
  },
  {
    title: "Agriculture Products",
    description: "We provide a wide range of organic agricultural products.",
    icon: "🌾",
  },
  {
    title: "100% Guaranteed",
    description: "Quality and freshness guaranteed for every delivery.",
    icon: "✅",
  },
];

const services = [
  {
    title: "Harvest Concepts",
    description:
      "Farming and animal husbandry discussed with farmers and scientists.",
    icon: <FaTractor className="text-[#E24A3B] text-2xl" />,
    image: B,
  },
  {
    title: "Farming Products",
    description:
      "We cultivate, nurture, and deliver premium-grade farming products.",
    icon: <GiFarmer className="text-[#E24A3B] text-2xl" />,
    image: C,
  },
  {
    title: "Soil Fertilization",
    description:
      "Improving soil health and productivity through natural techniques.",
    icon: <FaSeedling className="text-[#E24A3B] text-2xl" />,
    image: D,
  },
];

// Shared animation variants
const containerStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden pb-10">
      {/* ---------------- Hero Section ---------------- */}
      <div className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] overflow-hidden rounded-b-[24px] sm:rounded-b-[40px] shadow-lg">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover brightness-[.45]"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        </div>
        {/* Extra dark gradient for text legibility, matching brand black */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/90 via-[#1C1C1C]/30 to-[#1C1C1C]/10" />

        {/* Large brand watermark behind the hero content, visible on the video */}
        <motion.h2
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 hidden md:flex items-center justify-end pr-6 lg:pr-16 z-0 text-[64px] lg:text-[110px] font-extrabold tracking-tight text-white/10 whitespace-nowrap"
        >
          SeedToServe
        </motion.h2>

        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 md:px-16 text-white">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 md:hidden mb-2">
              <span className="text-2xl font-extrabold tracking-tight">
                Seed<span className="text-[#E24A3B]">To</span>Serve
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-xs sm:text-sm w-fit uppercase tracking-wider"
            >
              Believe in Quality
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 sm:mt-6 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
            >
              Quality & Trust: <br className="hidden sm:block" /> Direct From
              The Farm
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 sm:mt-6 text-sm sm:text-lg max-w-xl text-gray-200"
            >
              Get the freshest fruits, vegetables, dairy and organic products
              sourced directly from local farmers, delivered to your
              doorstep.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => navigate("/signup")}
                  className="rounded-lg bg-[#E24A3B] hover:bg-[#c73f31] text-white px-6 sm:px-8 py-5 sm:py-6 font-semibold text-sm sm:text-base shadow-md"
                >
                  Shop Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  className="rounded-lg border-white/60 text-white bg-white/10 hover:bg-white/20 px-6 sm:px-8 py-5 sm:py-6 font-semibold text-sm sm:text-base backdrop-blur-sm"
                >
                  Explore Categories
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ---------------- Features Section ---------------- */}
      <div className="w-full mt-12 sm:mt-16 px-4 sm:px-6 md:px-8 pb-12 sm:pb-16">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeUp} whileHover={{ y: -8 }}>
              <Card className="relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center text-2xl rounded-full bg-[#E24A3B]/10 shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1C1C1C]">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
                <div className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-full text-sm text-gray-500">
                  ↗
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ---------------- Who We Are Section ---------------- */}
      <motion.section
        className="w-full px-6 md:px-12 py-10 sm:py-14"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            src={A}
            alt="Farmer at work"
            className="rounded-3xl shadow-md w-full object-cover h-64 sm:h-80 md:h-96"
          />
          <div>
            <p className="uppercase text-xs sm:text-sm tracking-wider text-[#E24A3B] font-semibold mb-2">
              Who We Are
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-4 leading-snug">
              Currently we are growing and selling organic food
            </h2>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              SeedToServe connects local farmers directly with your kitchen —
              cutting out the middlemen so produce stays fresher and prices
              stay fair for everyone.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-2xl sm:text-3xl text-[#E24A3B]">
                  435+
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Tons of Harvest Grown
                </p>
              </div>
              <div>
                <p className="font-bold text-2xl sm:text-3xl text-[#E24A3B]">
                  Eco Farms
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">Across India</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ---------------- Best Agriculture Services Section ---------------- */}
      <motion.section
        className="w-full bg-[#1C1C1C] text-white py-14 sm:py-20 px-6 md:px-12 rounded-[24px] sm:rounded-[40px] mx-4 sm:mx-6 md:mx-8"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-10 sm:mb-12">
          <p className="uppercase text-xs sm:text-sm tracking-wider text-[#E24A3B] mb-2 font-semibold">
            Our Services
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Best Agriculture Services
          </h2>
        </div>
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <Card className="bg-white text-[#1C1C1C] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {service.icon}
                    <p className="uppercase text-xs sm:text-sm tracking-wide text-gray-500">
                      {service.title}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ---------------- Organic Vegetables Section ---------------- */}
      <motion.section
        className="w-full mt-10 px-4 sm:px-6 md:px-12"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card className="bg-white rounded-[24px] sm:rounded-[40px] shadow-md overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center p-6 sm:p-8 md:p-10">
            {/* Left Image */}
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1 }}
              viewport={{ once: true }}
            >
              <img
                src={E}
                alt="Organic Vegetables"
                className="w-full rounded-3xl object-cover h-64 sm:h-80 md:h-[350px]"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="md:pl-12 mt-8 md:mt-0"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <div className="mb-3">
                <span className="text-xs px-3 py-1 rounded-full bg-[#E24A3B]/10 text-[#E24A3B] font-semibold">
                  Free Quote
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight">
                Organic Vegetables <br /> in Our Store
              </h2>

              <p className="text-gray-500 max-w-md mt-4 text-sm sm:text-base">
                We deliver freshly harvested organic vegetables from
                eco-friendly farms directly to your kitchen — healthy,
                natural, and chemical-free.
              </p>

              <motion.div
                className="mt-6"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Button
                  className="rounded-full bg-[#E24A3B] hover:bg-[#c73f31] text-white px-6 sm:px-8 py-5 sm:py-6 font-semibold text-base sm:text-lg shadow-md"
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