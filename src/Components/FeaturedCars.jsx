"use client";

import React from "react";
// Import Next.js optimized Image component
import Image from "next/image";
// Import Gravity UI icons
import { CircleCheck, Gear, Sliders, ShieldCheck } from "@gravity-ui/icons";

// Dummy data structure for local array iteration
const dummyCars = [
  {
    id: 1,
    name: "Luxury Sports Sedan",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
    price: 4500,
    type: "Automatic",
    fuel: "Octane",
    rating: "4.9"
  },
  {
    id: 2,
    name: "Offroad Luxury SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
    price: 6500,
    type: "Manual",
    fuel: "Diesel",
    rating: "4.8"
  },
  {
    id: 3,
    name: "Efficient City Hatchback",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d",
    price: 2500,
    type: "Automatic",
    fuel: "Electric",
    rating: "4.7"
  }
];

const FeaturedCars = () => {
  return (
    <section className="bg-[#090d16] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our <span className="text-amber-500">Featured</span> Fleet
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Choose from our premium class collections that suit your next business trip or getaway.
          </p>
        </div>

        {/* Responsive Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyCars.map((car) => (
            <div 
              key={car.id} 
              className="bg-[#111827] border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col"
            >
              {/* Image Box Wrapper with Next.js Image handling */}
              <div className="relative h-48 w-full bg-slate-900">
                <Image 
                  src={car.image} 
                  alt={car.name} 
                  fill
                  sizes="(max-w-7xl) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 text-xs font-bold px-3 py-1 rounded-lg text-amber-500 flex items-center gap-1">
                  ★ {car.rating}
                </span>
              </div>

              {/* Specifications Box */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">
                    {car.name}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-400 border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Gear width={14} height={14} className="text-amber-500" />
                      <span>{car.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sliders width={14} height={14} className="text-amber-500" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <ShieldCheck width={14} height={14} className="text-emerald-500" />
                      <span className="text-emerald-400">Fully Insured Platform</span>
                    </div>
                  </div>
                </div>

                {/* Footer / Price & Call-to-action */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xl font-black text-white">৳{car.price}</span>
                    <span className="text-xs text-slate-400"> / day</span>
                  </div>
                  <button className="px-4 py-2 bg-slate-800 hover:bg-amber-500 border border-slate-700 hover:border-amber-500 text-white hover:text-slate-950 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-1">
                    <CircleCheck width={14} height={14} />
                    Book Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCars;