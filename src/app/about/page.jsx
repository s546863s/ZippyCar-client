"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Award, Clock, Users } from "lucide-react";

const AboutPage = () => {
  const stats = [
    { icon: Users, value: "10K+", label: "Happy Customers" },
    { icon: Award, value: "50+", label: "Premium Vehicles" },
    { icon: Clock, value: "24/7", label: "Roadside Support" },
    { icon: Shield, value: "100%", label: "Insured Fleet" },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">About <span className="text-amber-500">ZippyCar</span></h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Redefining urban mobility with premium car rental solutions</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="text-slate-400 leading-relaxed">Founded in 2024, ZippyCar has revolutionized the car rental industry in Bangladesh by combining luxury vehicles with cutting-edge digital technology. Our mission is to provide seamless, transparent, and premium mobility solutions for modern travelers.</p>
            <p className="text-slate-400 leading-relaxed">With a fleet of over 50 premium vehicles and 24/7 customer support, we ensure every journey is memorable. From luxury sedans to spacious SUVs, we have the perfect car for every occasion.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d" alt="About ZippyCar" fill className="object-cover" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-[#111827] border border-slate-800 rounded-2xl p-6 text-center">
              <stat.icon className="text-amber-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111827] border border-slate-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Drive?</h2>
          <p className="text-slate-400 mb-6">Join thousands of satisfied customers who trust ZippyCar for their mobility needs.</p>
          <a href="/cars" className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3 rounded-xl transition-all duration-300">Explore Our Fleet</a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;