"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Testimonials = () => {
  const reviews = [
    { id: 1, name: "Anisur Rahman", role: "Corporate Executive", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", comment: "Renting a premium sedan from ZippyCar was flawless. The digital verification took minutes, and the car condition was pristine. Highly recommended!", rating: 5 },
    { id: 2, name: "Tanjila Akter", role: "Tech Entrepreneur", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", comment: "I used their luxury SUV for a family getaway. The 24/7 roadside support gave us complete peace of mind. Exceptional service quality!", rating: 5 },
    { id: 3, name: "Sajid Hasan", role: "Travel Vlogger", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", comment: "Absolutely transparent pricing! No hidden fees or extra costs. The automatic transmission made highway driving effortless.", rating: 4 }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="bg-[#090d16] text-white py-20 border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">What Our <span className="text-amber-500">Clients</span> Say</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm">Discover real experiences from professional drivers and corporate clients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((user, index) => (
            <motion.div key={user.id} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -6 }} className="bg-[#111827] border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 lg:p-8 transition-all duration-300 group shadow-xl">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (<Star key={i} size={14} className={i < user.rating ? "fill-amber-500 text-amber-500" : "text-slate-700"} />))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic">"{user.comment}"</p>
              <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-4">
                <div className="relative w-12 h-12 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <Image src={user.avatar} alt={user.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">{user.name}</h4>
                  <span className="text-xs text-slate-400">{user.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;