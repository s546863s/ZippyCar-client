"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Heart, DollarSign, Cpu } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    { id: 1, icon: Shield, title: "Fully Insured Fleet", desc: "Drive with absolute peace of mind. Every car comes with full comprehensive insurance coverage." },
    { id: 2, icon: DollarSign, title: "No Hidden Charges", desc: "What you see is exactly what you pay. Transparent pricing with zero surprise fees." },
    { id: 3, icon: Cpu, title: "Instant Digital Setup", desc: "Skip the endless paperwork. Book and verify your profile online within 5 minutes." },
    { id: 4, icon: Heart, title: "24/7 Roadside Support", desc: "Never stranded alone. Our dedicated mechanical team is active round-the-clock." }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="bg-[#090d16] text-white py-20 border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Why Choose <span className="text-amber-500">ZippyCar</span> Experience</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm">We redefine urban mobility by blending elite luxury assets with seamless modern technology.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div key={item.id} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -6 }} className="bg-[#111827] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 group shadow-xl">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all duration-300">
                <item.icon className="text-amber-500 text-2xl group-hover:scale-110 transition-transform duration-300" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mt-4 group-hover:text-amber-500 transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;