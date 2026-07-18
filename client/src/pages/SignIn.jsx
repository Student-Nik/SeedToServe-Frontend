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
import { FaEnvelope, FaLock, FaLeaf, FaTruck, FaSeedling } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/helpers/showToast";
import GoogleLogin from "../components/GoogleLogin";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

// Validation Schema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password is required"),
});

// Animation variants
const containerStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      console.log("LOGIN RESPONSE:", result);
      console.log(response);

      if (!response.ok) {
        return showToast("error", "Login failed");
      }

      const { token, username, role } = result;

      dispatch(
        setUser({
          user: { username },
          role,
          token,
        }),
      );
      localStorage.setItem("token", token);

      showToast("success", result.message || "Login successful!");

      if (role === "FARMER") {
        navigate("/farmer-popup");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      showToast("error", err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* ---------------- LEFT / BRAND PANEL ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative w-full lg:w-1/2 min-h-[260px] lg:min-h-screen bg-[#1C1C1C] text-white flex flex-col justify-between overflow-hidden px-8 py-10 lg:px-14 lg:py-14"
      >
        {/* Decorative background image, dimmed */}
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

        {/* Middle hero copy - hidden on very small screens, shown on md+ */}
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
            Farm Fresh, Delivered Daily
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-3xl lg:text-4xl font-extrabold leading-tight mb-4"
          >
            Fresh From Farm
            <br />
            To Your Table
          </motion.h1>
          <motion.p variants={fadeUp} className="text-gray-300 text-sm lg:text-base">
            Get the freshest fruits, vegetables, dairy and organic products
            sourced directly from local farmers, delivered to your doorstep.
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
          <motion.div
            variants={containerStagger}
            initial="hidden"
            animate="show"
          >
            <motion.h2
              variants={fadeUp}
              className="text-2xl lg:text-3xl font-extrabold text-[#1C1C1C] mb-1"
            >
              Welcome back
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-sm mb-8">
              Login to your SeedToServe account to continue shopping fresh.
            </motion.p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
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

                <motion.div variants={fadeUp} className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-xs text-gray-500 hover:text-[#E24A3B] transition"
                  >
                    Forgot password?
                  </Link>
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
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </motion.div>
              </form>
            </Form>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 my-6"
            >
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </motion.div>

            <motion.div variants={fadeUp}>
              <GoogleLogin />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-sm text-gray-600 mt-8 text-center"
            >
              Create a new account?{" "}
              <Link
                to="/signup"
                className="text-[#E24A3B] font-semibold hover:underline"
              >
                Sign Up here
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;