"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Calendar, Search } from "lucide-react";

const BookingFilter = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (pickupDate) params.append("pickupDate", pickupDate);
    if (dropoffDate) params.append("dropoffDate", dropoffDate);
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <motion.div className="max-w-6xl mx-auto px-4 relative -mt-8 sm:-mt-12 z-20" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] p-6 lg:p-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin size={14} className="text-amber-500" /> Pick-up Location
            </label>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-slate-800 border border-slate-700 focus:border-amber-500 text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none transition-all duration-200 cursor-pointer">
              <option value="">Select Division...</option>
              <option value="rajshahi">Rajshahi Division</option>
              <option value="dhaka">Dhaka Division</option>
              <option value="chittagong">Chattogram Division</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar size={14} className="text-amber-500" /> Pick-up Date
            </label>
            <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full bg-slate-800 border border-slate-700 focus:border-amber-500 text-white text-sm rounded-xl px-4 py-3 [color-scheme:dark] focus:outline-none transition-all duration-200 cursor-pointer" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar size={14} className="text-amber-500" /> Drop-off Date
            </label>
            <input type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} className="w-full bg-slate-800 border border-slate-700 focus:border-amber-500 text-white text-sm rounded-xl px-4 py-3 [color-scheme:dark] focus:outline-none transition-all duration-200 cursor-pointer" />
          </div>
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl py-3.5 px-6 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_20px_-5px_rgba(245,158,11,0.25)] cursor-pointer group">
            <Search size={16} className="group-hover:rotate-12 transition-transform duration-200" />
            Find Best Deal
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default BookingFilter;