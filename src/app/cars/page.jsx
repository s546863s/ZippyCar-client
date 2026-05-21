"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Settings, Fuel, Users, Search, SlidersHorizontal } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get("/api/cars");
        if (response.data.success) {
          setCars(response.data.cars || response.data);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.carModel?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || car.type?.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    if (sortBy === "low-to-high") return a.dailyPrice - b.dailyPrice;
    if (sortBy === "high-to-low") return b.dailyPrice - a.dailyPrice;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 text-center md:text-left border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div><h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Explore Our <span className="text-amber-500">Premium Fleet</span></h1><p className="text-slate-400 mt-2">Select from our curated elite vehicles.</p></div>
          <div className="text-sm font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full">Available: {isLoading ? "..." : filteredCars.length}</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 sm:p-6 mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} /><input type="text" placeholder="Search car model..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-900/60 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none" /></div>
          <div className="flex items-center gap-2 overflow-x-auto"><SlidersHorizontal size={14} className="text-slate-500 shrink-0" />{["All", "Sedan", "SUV", "Hatchback", "Luxury", "Sports"].map(type => (<button key={type} onClick={() => setSelectedType(type)} className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${selectedType === type ? "bg-amber-500 text-slate-950" : "bg-slate-900/40 border border-slate-800 text-slate-400 hover:text-white"}`}>{type}</button>))}</div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 outline-none cursor-pointer"><option value="default">Sort By: Default</option><option value="low-to-high">Price: Low to High</option><option value="high-to-low">Price: High to Low</option></select>
        </div>

        {isLoading ? (<div className="flex flex-col items-center py-20"><div className="w-12 h-12 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin" /><p className="text-slate-500 text-xs mt-4">Loading Cars...</p></div>) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCars.map((car) => (<motion.div layout key={car._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ y: -6 }} className="bg-[#111827] border border-slate-800/80 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-300 group shadow-xl">
                <div className="relative h-48 w-full overflow-hidden"><Image src={car.image} alt={car.carModel} fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-1"><span className="text-xs font-bold text-amber-500/80 uppercase tracking-widest">{car.type}</span><span className="text-[11px] text-slate-500">{car.brand}</span></div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors">{car.carModel}</h3>
                  <div className="w-full border-t border-slate-800/60 my-4" />
                  <div className="grid grid-cols-3 gap-2 text-slate-400 text-xs font-medium mb-6"><div className="flex items-center gap-1.5 bg-slate-900/50 p-2 rounded-xl"><Settings size={12} className="text-amber-500" /><span>{car.transmission}</span></div><div className="flex items-center gap-1.5 bg-slate-900/50 p-2 rounded-xl"><Fuel size={12} className="text-amber-500" /><span>{car.fuel}</span></div><div className="flex items-center gap-1.5 bg-slate-900/50 p-2 rounded-xl"><Users size={12} className="text-amber-500" /><span>{car.seats} Seats</span></div></div>
                  <div className="flex items-center justify-between"><div><span className="text-xl font-black text-white">${car.dailyPrice}</span><span className="text-xs text-slate-400"> / day</span></div><Link href={`/cars/${car._id}`} className="px-4 py-2 bg-slate-800 hover:bg-amber-500 text-white hover:text-slate-950 text-xs font-bold rounded-lg transition-all flex items-center gap-1"><Car size={12} /> Book Now</Link></div>
                </div>
              </motion.div>))}
            </AnimatePresence>
          </div>)}
        {!isLoading && filteredCars.length === 0 && (<div className="text-center py-20 bg-[#111827] rounded-2xl"><p className="text-slate-400">No cars found.</p><button onClick={() => { setSearchQuery(""); setSelectedType("All"); setSortBy("default"); }} className="mt-4 px-5 py-2.5 bg-amber-500 text-slate-950 text-xs font-bold uppercase rounded-xl hover:bg-amber-400">Reset Filters</button></div>)}
      </div>
    </div>
  );
};

export default CarsPage;