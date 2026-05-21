"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Key, Car } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    { id: "01", icon: Search, title: "Find Your Ride", desc: "Enter your schedule dates and pick-up division to filter out premium available vehicles." },
    { id: "02", icon: Key, title: "Instant Verification", desc: "Upload basic verification credentials to safely unlock digital keys through our dashboard." },
    { id: "03", icon: Car, title: "Drive the Future", desc: "Complete your secure gateway transaction, pick up the car keys, and hit the highway." }
  ];

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="bg-[#090d16] text-white py-20 border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Rent In <span className="text-amber-500">3 Simple</span> Steps</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm">Get behind the steering wheel without any heavy administrative delays.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {steps.map((step, index) => (
            <motion.div key={step.id} variants={stepVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <step.icon className="text-slate-950 text-xl" />
                <span className="absolute -top-1 -right-2 bg-slate-800 border border-slate-700 text-[10px] text-amber-500 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold">{step.id}</span>
              </div>
              {index < steps.length - 1 && <div className="hidden md:block absolute top-8 left-[58%] w-[84%] h-0.5 border-t-2 border-dashed border-slate-800 group-hover:border-amber-500/30 transition-colors duration-500" />}
              <div className="mt-8 space-y-3 max-w-xs">
                <h3 className="text-xl font-bold group-hover:text-amber-500 transition-colors">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;