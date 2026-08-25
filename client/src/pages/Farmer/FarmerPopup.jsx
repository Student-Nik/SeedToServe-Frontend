// src/pages/Success.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Tags, PackagePlus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FarmerPopup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[420px]"
      >
        <Card className="rounded-2xl shadow-xl bg-white text-center border border-neutral-200 overflow-hidden">
          <CardContent className="flex flex-col items-center space-y-6 py-10 px-6 sm:px-10">

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
              className="w-20 h-20 rounded-full bg-[#E24A3B]/10 flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-[#E24A3B]" strokeWidth={2.2} />
            </motion.div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] tracking-tight">
                Welcome, Farmer
              </h2>
              <p className="text-sm text-neutral-500">
                Your <span className="text-[#E24A3B] font-medium">SeedToServe</span> account is ready to go
              </p>
            </div>

            <div className="w-full h-px bg-neutral-100" />

            <div className="flex flex-col space-y-3 w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full flex items-center justify-between bg-[#E24A3B] hover:bg-[#c93e30] text-white rounded-xl py-3.5 px-5 font-medium shadow-md shadow-[#E24A3B]/20 transition-colors"
                onClick={() => navigate("/addcategory")}
              >
                <span className="flex items-center gap-2.5">
                  <Tags className="w-5 h-5" />
                  Add Category
                </span>
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group w-full flex items-center justify-between bg-[#1C1C1C] hover:bg-neutral-800 text-white rounded-xl py-3.5 px-5 font-medium shadow-md transition-colors"
                onClick={() => navigate("/addproducts")}
              >
                <span className="flex items-center gap-2.5">
                  <PackagePlus className="w-5 h-5" />
                  Add Products
                </span>
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>

            <p className="text-xs text-neutral-400 pt-1">
              You can always do this later from your dashboard
            </p>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FarmerPopup;