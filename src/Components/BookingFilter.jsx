"use client";

import React from "react";
// Integrating react-hook-form for elite performance with zero re-renders
import { useForm } from "react-hook-form";
// Framer motion for hardware-accelerated fluid motion transitions
import { motion } from "framer-motion";
// HeroUI wrappers for streamlined accessible buttons
import { Button } from "@heroui/react";
// Pure Gravity UI icons
import { MapPin, Calendar, Magnifier } from "@gravity-ui/icons";

const BookingFilter = () => {
  // Setup React Hook Form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      location: "",
      pickupDate: "",
      dropoffDate: "",
    }
  });

  const onSubmit = (data) => {
    console.log("Animated Search Context Submitted:", data);
  };

  // Animation variants for the inner input cards on hover/focus
  const inputHoverVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.015, 
      y: -2,
      transition: { duration: 0.2, ease: "easeOut" } 
    }
  };

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4 relative -mt-8 sm:-mt-12 z-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] p-6 lg:p-8 transform-gpu">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-end">
          
          {/* Input Box: Pickup Location with micro-interactions */}
          <motion.div 
            className="space-y-2"
            variants={inputHoverVariants}
            initial="initial"
            whileHover="hover"
          >
            <label className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5 select-none">
              <MapPin width={14} height={14} className="text-amber-500 animate-pulse" /> Pick-up Location
            </label>
            <div className="relative">
              <select 
                {...register("location")}
                className="w-full bg-slate-800 hover:bg-slate-750 border border-slate-700 focus:border-amber-500 text-white text-sm rounded-xl px-4 py-3.5 focus:outline-hidden transition-all duration-200 cursor-pointer appearance-none transform-gpu"
              >
                <option value="" className="bg-[#111827]">Select Division...</option>
                <option value="rajshahi" className="bg-[#111827]">Rajshahi Division</option>
                <option value="dhaka" className="bg-[#111827]">Dhaka Division</option>
                <option value="chittagong" className="bg-[#111827]">Chattogram Division</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500 text-xs">▼</div>
            </div>
          </motion.div>

          {/* Input Box: Pickup Date */}
          <motion.div 
            className="space-y-2"
            variants={inputHoverVariants}
            initial="initial"
            whileHover="hover"
          >
            <label className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5 select-none">
              <Calendar width={14} height={14} className="text-amber-500" /> Pick-up Date
            </label>
            <input 
              type="date" 
              {...register("pickupDate")}
              className="w-full bg-slate-800 hover:bg-slate-750 border border-slate-700 focus:border-amber-500 text-white text-sm rounded-xl px-4 py-3 [color-scheme:dark] focus:outline-hidden transition-all duration-200 cursor-pointer transform-gpu"
            />
          </motion.div>

          {/* Input Box: Drop-off Date */}
          <motion.div 
            className="space-y-2"
            variants={inputHoverVariants}
            initial="initial"
            whileHover="hover"
          >
            <label className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5 select-none">
              <Calendar width={14} height={14} className="text-amber-500" /> Drop-off Date
            </label>
            <input 
              type="date" 
              {...register("dropoffDate")}
              className="w-full bg-slate-800 hover:bg-slate-750 border border-slate-700 focus:border-amber-500 text-white text-sm rounded-xl px-4 py-3 [color-scheme:dark] focus:outline-hidden transition-all duration-200 cursor-pointer transform-gpu"
            />
          </motion.div>

          {/* Call-to-action Button with scale feedback */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Button 
              type="submit" 
              className="w-full h-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl py-3.5 px-6 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_20px_-5px_rgba(245,158,11,0.25)] cursor-pointer group"
            >
              <Magnifier width={16} height={16} className="group-hover:rotate-12 transition-transform duration-200" />
              Find Best Deal
            </Button>
          </motion.div>

        </form>
      </div>
    </motion.div>
  );
};

export default BookingFilter;