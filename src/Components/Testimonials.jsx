"use client";

import React from "react";
// Import Next.js optimized Image component
import Image from "next/image";
// Import pure Gravity UI icons
import { Star, Person } from "@gravity-ui/icons";

const Testimonials = () => {
  // Mock customer feedback dataset
  const reviews = [
    {
      id: 1,
      name: "Anisur Rahman",
      role: "Corporate Executive",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      comment: "Renting a premium sedan from ZippyCar was incredibly flawless. The digital verification took minutes, and the car condition was pristine. Highly recommended for corporate trips!",
      rating: 5,
    },
    {
      id: 2,
      name: "Tanjila Akter",
      role: "Tech Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      comment: "I used their luxury SUV for a family getaway to Sylhet. The 24/7 roadside mechanical support assurance gave us complete peace of mind. Exceptional service quality!",
      rating: 5,
    },
    {
      id: 3,
      name: "Sajid Hasan",
      role: "Travel Vlogger",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      comment: "Absolutely transparent pricing! No hidden fees or extra maintenance costs at pickup. The automatic transmission made long highway driving completely effortless.",
      rating: 4,
    }
  ];

  return (
    <section className="bg-[#090d16] text-white py-20 border-t border-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Metadata */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            What Our <span className="text-amber-500">Clients</span> Say
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Discover real experiences from professional drivers and corporate clients who rely on our elite rental fleet.
          </p>
        </div>

        {/* 3-Column Testimonial Layout Grid using Tailwind v4.0 rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((user) => (
            <div 
              key={user.id}
              className="bg-[#111827] border border-slate-800/80 hover:border-amber-500/30 rounded-2xl p-6 lg:p-8 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Five Star Dynamic Rating Metrics */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index} 
                      width={14} 
                      height={14} 
                      className={`${index < user.rating ? "fill-amber-500 text-amber-500" : "text-slate-600"}`} 
                    />
                  ))}
                </div>

                {/* Customer Comment Content Box */}
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  {user.comment}
                </p>
              </div>

              {/* User Bio Meta Row inside Card Footer */}
              <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center gap-4">
                <div className="relative w-12 h-12 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <Image 
                    src={user.avatar} 
                    alt={user.name} 
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
                    {user.name}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {user.role}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;