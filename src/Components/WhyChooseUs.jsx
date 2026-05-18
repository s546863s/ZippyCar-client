"use client";

import React from "react";
import { FaShieldAlt, FaHeart, FaDollarSign, FaMicrochip } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaShieldAlt className="text-amber-500 text-2xl" />,
      title: "Fully Insured Fleet",
      desc: "Drive with absolute peace of mind. Every single car in our premium fleet comes with full comprehensive insurance coverage."
    },
    {
      id: 2,
      icon: <FaDollarSign className="text-amber-500 text-2xl" />,
      title: "No Hidden Charges",
      desc: "What you see is exactly what you pay. Transparent pricing model with zero surprise fees or backend maintenance costs."
    },
    {
      id: 3,
      icon: <FaMicrochip className="text-amber-500 text-2xl" />,
      title: "Instant Digital Setup",
      desc: "Skip the endless paperwork. Book, verify your profile, and approve your luxury ride online within just 5 minutes."
    },
    {
      id: 4,
      icon: <FaHeart className="text-amber-500 text-2xl" />,
      title: "24/7 Roadside Support",
      desc: "Never stranded alone. Our dedicated mechanical backup team is active round-the-clock across all highway divisions."
    }
  ];

  return (
    <section className="bg-[#090d16] text-white py-20 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Choose <span className="text-amber-500">ZippyCar</span> Experience
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            We redefine urban mobility by blending elite luxury assets with seamless modern technology.
          </p>
        </div>

        {/* 4 Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/30 rounded-2xl p-6 transition-all duration-300 group flex flex-col"
            >
              <div className="space-y-4">
                {/* Icon wrapper */}
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 transition-all duration-300 group-hover:bg-amber-500/10 group-hover:border-amber-500/40">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold group-hover:text-amber-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;