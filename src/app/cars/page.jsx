"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaCar, FaCogs, FaGasPump, FaUserFriends, FaSearch, FaSlidersH } from "react-icons/fa";

const CarsPage = () => {
  // ১. মক কার ডাটাবেজ সেটআপ
  const allCars = [
    {
      id: "1",
      name: "BMW 5 Series",
      type: "Sedan",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      price: 120,
      transmission: "Automatic",
      fuel: "Octane",
      seats: 5,
      isFeatured: true
    },
    {
      id: "2",
      name: "Audi Q7 Luxury",
      type: "SUV",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935",
      price: 180,
      transmission: "Automatic",
      fuel: "Hybrid",
      seats: 7,
      isFeatured: true
    },
    {
      id: "3",
      name: "Mercedes-Benz E-Class",
      type: "Sedan",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
      price: 150,
      transmission: "Automatic",
      fuel: "Octane",
      seats: 5,
      isFeatured: false
    },
    {
      id: "4",
      name: "Toyota Land Cruiser",
      type: "SUV",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
      price: 220,
      transmission: "Automatic",
      fuel: "Diesel",
      seats: 7,
      isFeatured: false
    },
    {
      id: "5",
      name: "Civic Turbo Type R",
      type: "Sedan",
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
      price: 90,
      transmission: "Manual",
      fuel: "Octane",
      seats: 5,
      isFeatured: false
    },
    {
      id: "6",
      name: "Range Rover Vogue",
      type: "SUV",
      image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5",
      price: 250,
      transmission: "Automatic",
      fuel: "Hybrid",
      seats: 5,
      isFeatured: true
    }
  ];

  // ২. স্টেট ম্যানেজমেন্ট (সার্চ, ফিল্টার ও সর্টিং)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // ৩. ফিল্টারিং এবং সর্টিং লজিক হ্যান্ডেলিং
  const filteredCars = allCars
    .filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "All" || car.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "low-to-high") return a.price - b.price;
      if (sortBy === "high-to-high") return b.price - a.price;
      return 0; // default
    });

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      
      {/* Background Decorative Element */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Explore Our <span className="text-amber-500">Premium Fleet</span>
            </h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Select from our curated elite vehicles for your absolute comfort.
            </p>
          </div>
          <div className="text-sm font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full self-center md:self-auto">
            Available Cars: {filteredCars.length}
          </div>
        </div>

        {/* Search, Filter, and Sort Control Hub */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 sm:p-6 mb-10 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* Search Box */}
          <div className="relative w-full">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
            <input
              type="text"
              placeholder="Search car model name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
            />
          </div>

          {/* Filter Type Options */}
          <div className="flex items-center gap-2 w-full overflow-x-auto no-scrollbar">
            <FaSlidersH className="text-slate-500 text-xs shrink-0 hidden sm:block" />
            {["All", "Sedan", "SUV"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border shrink-0 ${
                  selectedType === type
                    ? "bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/10"
                    : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Sort Selection Menu */}
          <div className="w-full">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-800 focus:border-amber-500/40 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none transition-all duration-200 cursor-pointer"
            >
              <option value="default">Sort By: Featured</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Cars Layout Grid System */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car) => (
              <motion.div
                layout
                key={car.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="bg-[#111827] border border-slate-800/80 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col justify-between shadow-xl"
              >
                {/* Car Thumbnail Wrapper */}
                <div className="relative w-full h-48 sm:h-52 bg-slate-800 overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-w-7xl) 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={car.isFeatured}
                  />
                  {car.isFeatured && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider">
                      Elite
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
                    <span className="text-amber-500 font-extrabold text-sm">${car.price}</span> / day
                  </div>
                </div>

                {/* Content Details Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-500/80 uppercase tracking-widest block mb-1">
                      {car.type}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors duration-200">
                      {car.name}
                    </h3>
                    
                    {/* Horizontal Divider Line */}
                    <div className="w-full border-t border-slate-800/60 my-4" />

                    {/* Features Matrix Specifications Icons */}
                    <div className="grid grid-cols-3 gap-2 text-slate-400 text-xs font-medium mb-6">
                      <div className="flex items-center gap-1.5 bg-slate-900/50 p-2 rounded-xl border border-slate-800/40">
                        <FaCogs className="text-amber-500 text-[13px] shrink-0" />
                        <span className="truncate">{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-900/50 p-2 rounded-xl border border-slate-800/40">
                        <FaGasPump className="text-amber-500 text-[13px] shrink-0" />
                        <span className="truncate">{car.fuel}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-900/50 p-2 rounded-xl border border-slate-800/40">
                        <FaUserFriends className="text-amber-500 text-[13px] shrink-0" />
                        <span>{car.seats} Seats</span>
                      </div>
                    </div>
                  </div>

                  {/* Core CTA Booking Action Button */}
                  <Link 
                    href={`/cars/${car.id}`}
                    className="w-full py-3.5 bg-slate-900 border border-slate-800 hover:bg-amber-500 hover:border-amber-500 hover:text-slate-950 text-slate-200 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md"
                  >
                    <FaCar className="text-xs group-hover/btn:rotate-12 transition-transform" />
                    View Details
                  </Link>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State Screen Handle */}
        {filteredCars.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-xl"
          >
            <p className="text-slate-400 text-base">No premium rides match your search criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedType("All"); setSortBy("default"); }}
              className="mt-4 px-5 py-2.5 bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default CarsPage;