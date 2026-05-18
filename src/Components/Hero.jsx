"use client";

import React from "react";
// Next.js optimized Image component
import Image from "next/image";
// Gravity UI icons
import { ArrowRight, Star } from "@gravity-ui/icons";

const Hero = () => {
  return (
    <section className="relative bg-[#090d16] text-white overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background radial glow effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500 opacity-5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content Column */}
        <div className="space-y-6 text-center lg:text-left z-10">
          {/* Badge Wrapper */}
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full text-xs text-amber-500">
            <Star width={12} height={12} className="fill-amber-500" />
            <span className="font-medium tracking-wide">Premium Car Rental Solution</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
            Drive The <span className="text-amber-500">Future</span> of Comfort & Style
          </h1>
          
          {/* Subtitle / Description */}
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Experience premium mobility with Bangladesh's ultimate car rental solution. Fast setup, stylish choices, and robust reliability tailored just for you.
          </p>
          
          {/* Interactive Call-To-Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
            <button className="px-8 py-3.5 bg-amber-500 text-slate-950 font-bold rounded-xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.3)] hover:bg-amber-600 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer">
              Explore Fleet
              <ArrowRight width={16} height={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold rounded-xl transition-all duration-300 cursor-pointer">
              How It Works
            </button>
          </div>
        </div>

        {/* Right Media Column */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Updated: Decorative linear gradient backdrop */}
          <div className="absolute inset-0 bg-linear-to-tr from-amber-500/10 to-transparent rounded-full blur-2xl w-80 h-80 mx-auto pointer-events-none" />
          
          {/* Next.js Optimized Image element */}
          <Image 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70" 
            alt="ZippyCar premium luxury car" 
            width={600}
            height={400}
            priority // Preloads asset instantly for critical LCP optimization
            className="w-full h-auto max-w-lg lg:max-w-xl object-contain drop-shadow-2xl rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;