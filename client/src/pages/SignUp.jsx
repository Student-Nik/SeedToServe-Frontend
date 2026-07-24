import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaLeaf, FaTruck, FaSeedling } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/helpers/showToast";
import GoogleLogin from "@/components/GoogleLogin";

// Validation Schema
const formSchema = z
  .object({
    firstName: z.string().min(3, "First Name is required"),
    lastName: z.string().min(3, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    registrationType: z.enum(["Farmer", "Buyer"], {
      required_error: "Select a registration type",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Animation variants
const containerStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registrationType: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message || "Registration failed");
      }
      showToast("success", data.message || "Registration successful!");
      navigate("/login");
    } catch (err) {
      showToast("error", err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* ---------------- LEFT / BRAND PANEL ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full lg:w-1/2 min-h-[260px] lg:min-h-screen bg-[#1C1C1C] text-white flex flex-col justify-between overflow-hidden px-8 py-10 lg:px-14 lg:py-14"
      >
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1400&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/80 to-[#1C1C1C]/40" />

        {/* Logo / Brand name */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative z-10 flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-md bg-[#E24A3B] flex items-center justify-center font-bold text-white text-lg">
            S
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            SeedToServe
          </span>
        </motion.div>

        {/* Hero copy */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="show"
          className="relative z-10 hidden sm:block max-w-md"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4"
          >
            Join The Harvest
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-3xl lg:text-4xl font-extrabold leading-tight mb-4"
          >
            Farm Fresh Starts
            <br />
            With You
          </motion.h1>
          <motion.p variants={fadeUp} className="text-gray-300 text-sm lg:text-base">
            Whether you're a farmer selling your harvest or a buyer looking
            for the freshest produce, create your account and join the
            SeedToServe community.
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2 text-gray-200">
              <FaTruck className="text-[#E24A3B]" />
              Delivery in 2 hours
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <FaLeaf className="text-[#E24A3B]" />
              100% Organic
            </div>
          </motion.div>
        </motion.div>

        {/* Footer credit */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative z-10 flex items-center gap-2 text-gray-400 text-xs"
        >
          <FaSeedling className="text-[#E24A3B]" />
          <span>&copy; {new Date().getFullYear()} SeedToServe. All rights reserved.</span>
        </motion.div>
      </motion.div>

      {/* ---------------- RIGHT / FORM PANEL ---------------- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="w-full max-w-md"
        >
          <motion.div variants={containerStagger} initial="hidden" animate="show">
            <motion.h2
              variants={fadeUp}
              className="text-2xl lg:text-3xl font-extrabold text-[#1C1C1C] mb-1"
            >
              Create your account
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-sm mb-8">
              Sign up to start buying or selling fresh produce today.
            </motion.p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Registration Type */}
                <motion.div variants={fadeUp}>
                  <FormField
                    control={form.control}
                    name="registrationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1C1C1C] font-medium mb-2 text-sm">
                          Select Registration Type
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-3">
                            {["Farmer", "Buyer"].map((type) => {
                              const selected = field.value === type;
                              return (
                                <button
                                  type="button"
                                  key={type}
                                  onClick={() => field.onChange(type)}
                                  className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-all ${
                                    selected
                                      ? "bg-[#E24A3B] border-[#E24A3B] text-white shadow-sm"
                                      : "bg-white border-gray-300 text-gray-600 hover:border-[#E24A3B]/50"
                                  }`}
                                >
                                  {type}
                                </button>
                              );
                            })}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={fadeUp}>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1C1C1C] font-medium flex items-center gap-2 text-sm">
                            <FaUser className="text-[#E24A3B]" /> First Name
                          </FormLabel>
                          <FormControl>
                            <motion.div whileFocus={{ scale: 1.01 }}>
                              <Input
                                placeholder="First name"
                                {...field}
                                className="border-gray-300 focus:border-[#E24A3B] focus:ring-2 focus:ring-[#E24A3B]/25 transition rounded-lg h-11 text-[#1C1C1C]"
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#1C1C1C] font-medium flex items-center gap-2 text-sm">
                            <FaUser className="text-[#E24A3B]" /> Last Name
                          </FormLabel>
                          <FormControl>
                            <motion.div whileFocus={{ scale: 1.01 }}>
                              <Input
                                placeholder="Last name"
                                {...field}
                                className="border-gray-300 focus:border-[#E24A3B] focus:ring-2 focus:ring-[#E24A3B]/25 transition rounded-lg h-11 text-[#1C1C1C]"
                              />
                            </motion.div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>

                {/* Email */}
                <motion.div variants={fadeUp}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1C1C1C] font-medium flex items-center gap-2 text-sm">
                          <FaEnvelope className="text-[#E24A3B]" /> Email
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.01 }}>
                            <Input
                              placeholder="you@example.com"
                              {...field}
                              className="border-gray-300 focus:border-[#E24A3B] focus:ring-2 focus:ring-[#E24A3B]/25 transition rounded-lg h-11 text-[#1C1C1C]"
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Password */}
                <motion.div variants={fadeUp}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1C1C1C] font-medium flex items-center gap-2 text-sm">
                          <FaLock className="text-[#E24A3B]" /> Password
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.01 }}>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                              className="border-gray-300 focus:border-[#E24A3B] focus:ring-2 focus:ring-[#E24A3B]/25 transition rounded-lg h-11 text-[#1C1C1C]"
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Confirm Password */}
                <motion.div variants={fadeUp}>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1C1C1C] font-medium flex items-center gap-2 text-sm">
                          <FaLock className="text-[#E24A3B]" /> Confirm Password
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.01 }}>
                            <Input
                              type="password"
                              placeholder="Confirm your password"
                              {...field}
                              className="border-gray-300 focus:border-[#E24A3B] focus:ring-2 focus:ring-[#E24A3B]/25 transition rounded-lg h-11 text-[#1C1C1C]"
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    className="w-full py-3 h-11 bg-[#E24A3B] text-white font-semibold rounded-lg shadow-md hover:bg-[#c73f31] transition duration-300"
                    disabled={loading}
                  >
                    {loading ? "Signing Up..." : "Create Account"}
                  </Button>
                </motion.div>
              </form>
            </Form>

            <motion.div variants={fadeUp} className="flex items-center gap-3 my-6">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </motion.div>

            <motion.div variants={fadeUp}>
              <GoogleLogin />
            </motion.div>

            <motion.p variants={fadeUp} className="text-sm text-gray-600 mt-8 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#E24A3B] font-semibold hover:underline"
              >
                Login here
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;