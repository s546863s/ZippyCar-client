"use client";

import React from "react";
import { FaSearch, FaKey, FaCar } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      icon: <FaSearch className="text-slate-950 text-xl" />,
      title: "Find Your Ride",
      desc: "Enter your custom schedule dates and pick-up division to filter out premium available vehicles."
    },
    {
      id: "02",
      icon: <FaKey className="text-slate-950 text-xl" />,
      title: "Instant Verification",
      desc: "Upload basic verification credentials to safely unlock digital keys through our dashboard."
    },
    {
      id: "03",
      icon: <FaCar className="text-slate-950 text-xl" />,
      title: "Drive the Future",
      desc: "Complete your online secure gateway transaction, pick up the car keys, and hit the highway."
    }
  ];

  return (
    <section className="bg-[#090d16] text-white py-20 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Rent In <span className="text-amber-500">3 Simple</span> Steps
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Get behind the steering wheel without any heavy administrative delays. Here is our effortless flow.
          </p>
        </div>

        {/* 3 Column steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center text-center group">
              
              {/* Outer circle */}
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center relative z-10 shadow-lg group-hover:scale-105 transition-transform duration-300">
                {step.icon}
                {/* Step number badge */}
                <span className="absolute -top-1 -right-2 bg-slate-800 border border-slate-700 text-[10px] text-amber-500 w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold">
                  {step.id}
                </span>
              </div>

              {/* Dashed line between steps - hidden on mobile */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 border-t border-dashed border-slate-700 pointer-events-none" />
              )}

              {/* Text content */}
              <div className="mt-6 space-y-2 max-w-xs">
                <h3 className="text-xl font-bold group-hover:text-amber-500 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;