"use client";

import React from "react";
// Framer Motion for highly accurate viewport timeline entries
import { motion } from "framer-motion";
import { FaSearch, FaKey, FaCar } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      icon: <FaSearch className="text-slate-950 text-xl group-hover:scale-110 transition-transform duration-300" />,
      title: "Find Your Ride",
      desc: "Enter your custom schedule dates and pick-up division to filter out premium available vehicles."
    },
    {
      id: "02",
      icon: <FaKey className="text-slate-950 text-xl group-hover:rotate-12 transition-transform duration-300" />,
      title: "Instant Verification",
      desc: "Upload basic verification credentials to safely unlock digital keys through our dashboard."
    },
    {
      id: "03",
      icon: <FaCar className="text-slate-950 text-xl group-hover:translate-x-1 transition-transform duration-300" />,
      title: "Drive the Future",
      desc: "Complete your online secure gateway transaction, pick up the car keys, and hit the highway."
    }
  ];

  // Timeline Container Configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Step 1 -> Step 2 -> Step 3 entry interval delay
      }
    }
  };

  // Single Process Card Element Variants
  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="bg-[#090d16] text-white py-20 border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content with entry animation */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Rent In <span className="text-amber-500">3 Simple</span> Steps
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Get behind the steering wheel without any heavy administrative delays. Here is our effortless flow.
          </p>
        </motion.div>

        {/* 3 Column steps with staggered frame layout */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={step.id} 
              variants={stepVariants}
              className="relative flex flex-col items-center text-center group transform-gpu"
            >
              
              {/* Outer amber circle wrapper with continuous feedback */}
              <motion.div 
                whileHover={{ scale: 1.08, shadow: "0 10px 25px -5px rgba(245,158,11,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center relative z-10 shadow-[0_8px_20px_-6px_rgba(245,158,11,0.3)] cursor-pointer"
              >
                {step.icon}
                
                {/* Step number badge */}
                <span className="absolute -top-1 -right-2 bg-slate-800 border border-slate-700 text-[10px] text-amber-500 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold select-none">
                  {step.id}
                </span>
              </motion.div>

              {/* Dashed line connector - Hidden on mobile / Animates on group hover */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[58%] w-[84%] h-0.5 border-t-2 border-dashed border-slate-800 group-hover:border-amber-500/30 transition-colors duration-500 pointer-events-none z-0" />
              )}

              {/* Step Context Typography */}
              <div className="mt-8 space-y-3 max-w-xs">
                <h3 className="text-xl font-bold group-hover:text-amber-500 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed text-balance">
                  {step.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;