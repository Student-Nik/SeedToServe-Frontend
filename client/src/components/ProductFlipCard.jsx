/* eslint-disable jsx-a11y/alt-text */
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ProductFlipCard({ product }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-40 h-60 md:w-60 md:h-80 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1000px" }}
    >
      {/* FRONT */}
      <motion.div
        className="absolute inset-0 bg-white rounded-xl flex items-center justify-center shadow-md"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <img
          src={product.image}
          className="h-32 w-32 object-contain"
        />
      </motion.div>

      {/* BACK */}
      <motion.div
        className="absolute inset-0 bg-[#FAFDEE] rounded-xl p-4 flex flex-col justify-between shadow-md"
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.5 }}
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        <div className="text-center">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm">₹{product.price}</p>
        </div>

        <Button className="w-full">Add to Cart</Button>
      </motion.div>
    </div>
  );
}
