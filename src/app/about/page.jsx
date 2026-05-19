"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCar, FaShieldAlt, FaUsers, FaChartLine } from "react-icons/fa";

const AboutPage = () => {
  const stats = [
    { icon: <FaCar />, label: "Vehicles Deployed", value: "500+" },
    { icon: <FaShieldAlt />, label: "Trusted Security", value: "100%" },
    { icon: <FaUsers />, label: "Happy Renters", value: "12k+" },
    { icon: <FaChartLine />, label: "Market Growth", value: "45%" },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Redefining <span className="text-amber-500">Luxury Travel</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            ZippyCar is more than just a rental platform. We are building the future of 
            premium vehicle sharing, connecting owners and drivers through trust, technology, 
            and superior service.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-[#111827] border border-slate-800 p-6 rounded-2xl text-center"
            >
              <div className="text-amber-500 text-2xl mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            <p className="leading-relaxed">
              We aim to simplify the process of premium car rental. Whether you are looking 
              for a sedan for a business trip or a luxury car for a special occasion, 
              ZippyCar ensures a seamless, secure, and transparent experience.
            </p>
            <p className="leading-relaxed">
              Our fleet is meticulously maintained and verified to guarantee that every 
              journey you take is safe and comfortable.
            </p>
          </div>
          <div className="bg-slate-800 rounded-3xl h-72 w-full flex items-center justify-center border border-slate-700 shadow-2xl">
            <div className="relative h-72 w-full rounded-3xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center">
  <svg viewBox="0 0 200 100" className="w-full h-full opacity-30">
    <path d="M0 100 Q 50 20, 100 50 T 200 0 V 100 Z" fill="#f59e0b" />
    <circle cx="150" cy="30" r="20" fill="#ffffff" />
  </svg>
  <div className="absolute text-white font-bold text-xl uppercase tracking-widest">
    ZippyCar Premium Fleet
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;