"use client";

import React from "react";
// Next.js optimized Image component
import Image from "next/image";
// Using HeroUI's highly optimized button
import { Button } from "@heroui/react";
// Framer Motion for premium & smooth hardware-accelerated animations
import { motion } from "framer-motion";
// Gravity UI icons
import { ArrowRight, Star } from "@gravity-ui/icons";

const Hero = () => {
  // Animation variants for staggered text entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section className="relative bg-[#090d16] text-white overflow-hidden pt-4 pb-16 lg:pt-6 lg:pb-24">
      {/* Background radial glow effect with GPU acceleration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500 opacity-5 blur-[120px] rounded-full pointer-events-none transform-gpu" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content Column - Animated using Framer Motion */}
        <motion.div 
          className="space-y-6 text-center lg:text-left z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge Wrapper */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full text-xs text-amber-500">
            <Star width={12} height={12} className="fill-amber-500" />
            <span className="font-medium tracking-wide">Premium Car Rental Solution</span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-balance">
            Drive The <span className="text-amber-500">Future</span> of Comfort & Style
          </motion.h1>
          
          {/* Subtitle / Description */}
          <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
            Experience premium mobility with Bangladesh's ultimate car rental solution. Fast setup, stylish choices, and robust reliability tailored just for you.
          </motion.p>
          
          {/* Interactive Call-To-Action Area */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
            <Button
              className="px-8 py-6 bg-amber-500 text-slate-950 font-bold rounded-xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)] hover:bg-amber-600 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Explore Fleet
              <ArrowRight width={16} height={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            
            <Button
              variant="bordered"
              className="px-8 py-6 bg-slate-800/50 hover:bg-slate-700 border-slate-700 hover:border-slate-600 text-white font-semibold rounded-xl transition-all duration-300 cursor-pointer"
            >
              How It Works
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Media Column - Animated Smooth Fade-in from Right */}
        <motion.div 
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          {/* Decorative linear gradient backdrop */}
          <div className="absolute inset-0 bg-linear-to-tr from-amber-500/10 to-transparent rounded-full blur-2xl w-80 h-80 mx-auto pointer-events-none" />
          
          {/* Next.js Optimized Image element */}
          <Image 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70" 
            alt="ZippyCar premium luxury car" 
            width={600}
            height={400}
            priority // Critical LCP optimization
            className="w-full h-auto max-w-lg lg:max-w-xl object-contain drop-shadow-2xl rounded-2xl transform-gpu"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;