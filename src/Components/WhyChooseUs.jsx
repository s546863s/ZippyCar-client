"use client";

import React from "react";
// Import Framer Motion for premium viewport interactions
import { motion } from "framer-motion";
import { FaShieldAlt, FaHeart, FaDollarSign, FaMicrochip } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaShieldAlt className="text-amber-500 text-2xl group-hover:scale-110 transition-transform duration-300" />,
      title: "Fully Insured Fleet",
      desc: "Drive with absolute peace of mind. Every single car in our premium fleet comes with full comprehensive insurance coverage."
    },
    {
      id: 2,
      icon: <FaDollarSign className="text-amber-500 text-2xl group-hover:scale-110 transition-transform duration-300" />,
      title: "No Hidden Charges",
      desc: "What you see is exactly what you pay. Transparent pricing model with zero surprise fees or backend maintenance costs."
    },
    {
      id: 3,
      icon: <FaMicrochip className="text-amber-500 text-2xl group-hover:rotate-12 transition-transform duration-300" />,
      title: "Instant Digital Setup",
      desc: "Skip the endless paperwork. Book, verify your profile, and approve your luxury ride online within just 5 minutes."
    },
    {
      id: 4,
      icon: <FaHeart className="text-amber-500 text-2xl group-hover:scale-110 transition-transform duration-300" />,
      title: "24/7 Roadside Support",
      desc: "Never stranded alone. Our dedicated mechanical backup team is active round-the-clock across all highway divisions."
    }
  ];

  // Tailwind v3.x Optimized Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.12 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="bg-[#090d16] text-white py-20 border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Choose <span className="text-amber-500">ZippyCar</span> Experience
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            We redefine urban mobility by blending elite luxury assets with seamless modern technology.
          </p>
        </motion.div>

        {/* 4 Column Feature Grid using Strict Tailwind v3.x layout rules */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((item) => (
            <motion.div 
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="bg-[#111827] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 group flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                {/* Icon wrapper */}
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 transition-all duration-300 group-hover:bg-amber-500/10 group-hover:border-amber-500/30">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;