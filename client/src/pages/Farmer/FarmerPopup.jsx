// src/pages/Success.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FarmerPopup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 via-blue-100 to-white p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="w-[380px] rounded-2xl shadow-xl bg-white text-center border border-blue-200">
          <CardContent className="flex flex-col items-center space-y-6 py-10">

            <CheckCircle2 className="w-20 h-20 text-blue-400 animate-bounce" />

            <div>
              <h2 className="text-2xl font-bold text-blue-900">Welcome Farmer</h2>
              <p className="text-blue-500 text-sm mt-1">SeedToServe</p>
            </div>

        
            <div className="flex flex-col space-y-4 w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 font-medium shadow-md"
                onClick={() => navigate("/addcategory")}
              >
                Add Category
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 font-medium shadow-md"
                onClick={() => navigate("/addproducts")}
              >
                Add Products
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FarmerPopup;
