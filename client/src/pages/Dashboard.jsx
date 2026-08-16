import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaTractor, FaSeedling, FaStar, FaQuoteLeft } from "react-icons/fa";
import { GiFarmer, GiFruitBowl, GiMilkCarton, GiWheat } from "react-icons/gi";
import { FiSearch, FiShoppingCart, FiTruck, FiArrowRight } from "react-icons/fi";
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
    icon: <FaTractor className="text-[#E8A33D] text-2xl" />,
    image: B,
  },
  {
    title: "Farming Products",
    description:
      "We cultivate, nurture, and deliver premium-grade farming products.",
    icon: <GiFarmer className="text-[#E8A33D] text-2xl" />,
    image: C,
  },
  {
    title: "Soil Fertilization",
    description:
      "Improving soil health and productivity through natural techniques.",
    icon: <FaSeedling className="text-[#E8A33D] text-2xl" />,
    image: D,
  },
];

const steps = [
  {
    icon: <FiSearch className="text-2xl" />,
    title: "Browse Fresh Picks",
    description:
      "Explore vegetables, fruits, dairy and grains sourced directly from partner farms this week.",
  },
  {
    icon: <FiShoppingCart className="text-2xl" />,
    title: "Place Your Order",
    description:
      "Add what you need to your cart and check out securely — no middlemen, fair farm prices.",
  },
  {
    icon: <FiTruck className="text-2xl" />,
    title: "Get It Delivered",
    description:
      "Your order is packed fresh and delivered to your doorstep within 24–48 hours of harvest.",
  },
];

const stats = [
  { value: "435+", label: "Tons of Harvest Grown" },
  { value: "120+", label: "Partner Farmers" },
  { value: "18", label: "Cities Served" },
  { value: "9,200+", label: "Happy Households" },
];

const testimonials = [
  {
    name: "Anjali Deshmukh",
    role: "Home Chef, Pune",
    quote:
      "The vegetables taste like they did at my grandmother's farm. Delivery is always on time and packaging keeps everything fresh.",
    rating: 5,
  },
  {
    name: "Rohit Sawant",
    role: "Restaurant Owner",
    quote:
      "We switched our entire vegetable sourcing to SeedToServe. Quality is consistent and pricing is fair for both us and the farmers.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Regular Customer",
    quote:
      "Love that I know exactly which farm my produce comes from. It genuinely feels like supporting real people, not a warehouse.",
    rating: 4,
  },
];

const categories = [
  {
    icon: <GiFruitBowl className="text-4xl" />,
    name: "Fruits & Vegetables",
    count: "180+ items",
    tagline: "Picked fresh this week",
    bg: "#1B4332",
    accent: "#E8A33D",
  },
  {
    icon: <GiMilkCarton className="text-4xl" />,
    name: "Dairy & Eggs",
    count: "40+ items",
    tagline: "Farm to fridge, daily",
    bg: "#C1440E",
    accent: "#FBF7EF",
  },
  {
    icon: <GiWheat className="text-4xl" />,
    name: "Grains & Pulses",
    count: "65+ items",
    tagline: "Stone-ground, no additives",
    bg: "#7C9885",
    accent: "#1B4332",
  },
  {
    icon: <FaSeedling className="text-4xl" />,
    name: "Organic Specials",
    count: "30+ items",
    tagline: "Certified chemical-free",
    bg: "#E8A33D",
    accent: "#1B4332",
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
    <div className="relative min-h-screen w-full bg-[#FBF7EF] overflow-hidden pb-10 font-sans">
      {/* ---------------- Hero Section ---------------- */}
      {/* scroll-mt offsets the sticky Topbar height so #home doesn't hide under it */}
      <div
        id="home"
        className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] overflow-hidden rounded-b-[24px] sm:rounded-b-[40px] shadow-lg scroll-mt-20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover brightness-[.4]"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        </div>
        {/* Pine-toned gradient instead of flat black, feels grown not corporate */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/95 via-[#1B4332]/40 to-[#1B4332]/10" />

        {/* Soft gold glow blob — the one signature flourish behind the CTA */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#E8A33D]/20 blur-[100px] z-0"
        />

        {/* Large brand watermark behind the hero content */}
        <motion.h2
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 hidden md:flex items-center justify-end pr-6 lg:pr-16 z-0 text-[64px] lg:text-[110px] font-bold tracking-tight text-white/10 whitespace-nowrap font-display"
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
              <span className="text-2xl font-bold tracking-tight font-display">
                Seed<span className="text-[#E8A33D]">To</span>Serve
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-white/10 backdrop-blur-md border border-[#E8A33D]/40 px-4 py-1 rounded-full text-xs sm:text-sm w-fit uppercase tracking-wider text-[#F5DBA3]"
            >
              🌾 Believe in Quality
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 sm:mt-6 text-3xl sm:text-5xl md:text-6xl font-bold leading-tight font-display"
            >
              Quality & Trust: <br className="hidden sm:block" /> Direct From
              The Farm
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 sm:mt-6 text-sm sm:text-lg max-w-xl text-[#E8E4D8]"
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
                  className="rounded-lg bg-[#C1440E] hover:bg-[#a8380c] text-white px-6 sm:px-8 py-5 sm:py-6 font-semibold text-sm sm:text-base shadow-md"
                >
                  Shop Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a href="#categories">
                  <Button
                    variant="outline"
                    className="rounded-lg border-white/60 text-white bg-white/10 hover:bg-white/20 px-6 sm:px-8 py-5 sm:py-6 font-semibold text-sm sm:text-base backdrop-blur-sm"
                  >
                    Explore Categories
                  </Button>
                </a>
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
              <Card className="relative bg-white border border-[#7C9885]/20 rounded-2xl shadow-sm hover:shadow-lg hover:border-[#E8A33D]/40 transition-all duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center text-2xl rounded-full bg-[#C1440E]/10 shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1B4332] font-display">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#5C5648] mt-2">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
                <div className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center bg-[#FBF7EF] border border-[#7C9885]/20 rounded-full text-sm text-[#7C9885]">
                  ↗
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ---------------- Shop by Category Section ---------------- */}
      <div id="categories" className="w-full px-4 sm:px-6 md:px-12 pb-12 sm:pb-16 scroll-mt-20">
        <div className="text-center mb-8 sm:mb-10">
          <p className="uppercase text-xs sm:text-sm tracking-wider text-[#C1440E] font-semibold mb-2">
            What We Offer
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B4332] font-display">
            Shop by Category
          </h2>
          <p className="text-sm sm:text-base text-[#5C5648] max-w-lg mx-auto mt-3">
            Everything sourced directly from partner farms — no distributors,
            no warehouses sitting on stock for weeks.
          </p>
        </div>
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
        >
          {categories.map((cat, index) => (
            <motion.div key={index} variants={fadeUp} whileHover={{ y: -6 }}>
              <button
                onClick={() => navigate("/signup")}
                style={{ backgroundColor: cat.bg }}
                className="group relative w-full text-left rounded-3xl p-7 sm:p-8 h-48 sm:h-56 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* Oversized watermark icon for visual fill */}
                <div
                  style={{ color: cat.accent }}
                  className="absolute -bottom-6 -right-4 text-[130px] sm:text-[150px] opacity-10 group-hover:opacity-15 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                >
                  {cat.icon}
                </div>

                {/* Subtle radial glow on hover */}
                <div
                  style={{ background: `radial-gradient(circle at 30% 20%, ${cat.accent}22, transparent 60%)` }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div
                      style={{ backgroundColor: `${cat.accent}22`, color: cat.accent }}
                      className="w-14 h-14 flex items-center justify-center rounded-2xl mb-4"
                    >
                      {cat.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 mt-1">
                      {cat.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      style={{ backgroundColor: `${cat.accent}22`, color: cat.accent }}
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {cat.count}
                    </span>
                    <span className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      Shop now <FiArrowRight />
                    </span>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ---------------- Who We Are Section ---------------- */}
      <motion.section
        id="about"
        className="w-full px-6 md:px-12 py-10 sm:py-14 scroll-mt-20"
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
            <p className="uppercase text-xs sm:text-sm tracking-wider text-[#C1440E] font-semibold mb-2">
              Who We Are
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B4332] mb-4 leading-snug font-display">
              Currently we are growing and selling organic food
            </h2>
            <p className="text-[#5C5648] mb-6 text-sm sm:text-base">
              SeedToServe connects local farmers directly with your kitchen —
              cutting out the middlemen so produce stays fresher and prices
              stay fair for everyone.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-2xl sm:text-3xl text-[#C1440E] font-display">
                  435+
                </p>
                <p className="text-[#5C5648] text-xs sm:text-sm">
                  Tons of Harvest Grown
                </p>
              </div>
              <div>
                <p className="font-bold text-2xl sm:text-3xl text-[#C1440E] font-display">
                  Eco Farms
                </p>
                <p className="text-[#5C5648] text-xs sm:text-sm">Across India</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ---------------- Stats / Trust Bar ---------------- */}
      <div className="w-full px-4 sm:px-6 md:px-12 mb-10 sm:mb-14">
        <div className="bg-[#1B4332]/5 border border-[#1B4332]/10 rounded-[24px] sm:rounded-[32px] py-8 sm:py-10 px-6 sm:px-10">
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeUp} className="text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C1440E] font-display">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-[#5C5648] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ---------------- How It Works Section ---------------- */}
      <div id="how-it-works" className="w-full px-4 sm:px-6 md:px-12 pb-12 sm:pb-16 scroll-mt-20">
        <div className="text-center mb-10 sm:mb-12">
          <p className="uppercase text-xs sm:text-sm tracking-wider text-[#C1440E] font-semibold mb-2">
            Simple Process
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B4332] font-display">
            How Ordering Works
          </h2>
        </div>
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-3 gap-6 sm:gap-8 relative"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={fadeUp} className="relative">
              <div className="bg-white border border-[#7C9885]/20 rounded-2xl p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[#C1440E] text-white">
                    {step.icon}
                  </div>
                  <span className="text-xs font-semibold tracking-widest text-[#7C9885]">
                    STEP {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#1B4332] mb-2 font-display">
                  {step.title}
                </h3>
                <p className="text-sm text-[#5C5648]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ---------------- Best Agriculture Services Section ---------------- */}
      <motion.section
        className="relative w-full bg-[#1B4332] text-white py-14 sm:py-20 px-6 md:px-12 rounded-[24px] sm:rounded-[40px] mx-4 sm:mx-6 md:mx-8 overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* subtle warm glow, ties the dark section back to the hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#E8A33D]/10 blur-[90px]"
        />
        <div className="relative text-center mb-10 sm:mb-12">
          <p className="uppercase text-xs sm:text-sm tracking-wider text-[#E8A33D] mb-2 font-semibold">
            Our Services
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display">
            Best Agriculture Services
          </h2>
        </div>
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <Card className="bg-[#FBF7EF] text-[#2B2620] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {service.icon}
                    <p className="uppercase text-xs sm:text-sm tracking-wide text-[#7C9885]">
                      {service.title}
                    </p>
                  </div>
                  <p className="text-[#5C5648] text-sm">{service.description}</p>
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
        <Card className="bg-white rounded-[24px] sm:rounded-[40px] shadow-md overflow-hidden border border-[#7C9885]/20">
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
                <span className="text-xs px-3 py-1 rounded-full bg-[#E8A33D]/15 text-[#a8380c] font-semibold">
                  Free Quote
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4332] leading-tight font-display">
                Organic Vegetables <br /> in Our Store
              </h2>

              <p className="text-[#5C5648] max-w-md mt-4 text-sm sm:text-base">
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
                  className="rounded-full bg-[#C1440E] hover:bg-[#a8380c] text-white px-6 sm:px-8 py-5 sm:py-6 font-semibold text-base sm:text-lg shadow-md"
                  onClick={() => navigate("/signup")}
                >
                  Buy Now →
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Card>
      </motion.section>

      {/* ---------------- Testimonials Section ---------------- */}
      <motion.section
        className="w-full px-4 sm:px-6 md:px-12 py-12 sm:py-16"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-10 sm:mb-12">
          <p className="uppercase text-xs sm:text-sm tracking-wider text-[#C1440E] font-semibold mb-2">
            Customer Stories
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B4332] font-display">
            What Our Customers Say
          </h2>
        </div>
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonials.map((t, index) => (
            <motion.div key={index} variants={fadeUp}>
              <Card className="bg-white border border-[#7C9885]/20 rounded-2xl h-full">
                <CardContent className="p-6 sm:p-7">
                  <FaQuoteLeft className="text-[#E8A33D] text-xl mb-4" />
                  <p className="text-sm text-[#2B2620] mb-5 leading-relaxed">
                    {t.quote}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#1B4332] font-display">
                        {t.name}
                      </p>
                      <p className="text-xs text-[#7C9885]">{t.role}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < t.rating ? "text-[#E8A33D] text-xs" : "text-[#E5E0D3] text-xs"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ---------------- Final CTA Banner ---------------- */}
      <motion.section
        className="w-full px-4 sm:px-6 md:px-12 pb-4 sm:pb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="bg-[#1B4332] rounded-[24px] sm:rounded-[32px] px-6 sm:px-10 py-10 sm:py-14 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 font-display">
            Ready to Taste the Difference?
          </h2>
          <p className="text-sm sm:text-base text-[#E8E4D8] max-w-xl mx-auto mb-7">
            Join thousands of households getting fresh, farm-direct produce
            delivered every week. No middlemen, no compromise on quality.
          </p>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              onClick={() => navigate("/signup")}
              className="rounded-lg bg-[#C1440E] hover:bg-[#a8380c] text-white px-8 py-6 font-semibold text-base shadow-md"
            >
              Create Free Account
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Dashboard;