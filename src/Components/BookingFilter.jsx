"use client";

import React from "react";
// Import pure Gravity UI icons
import { MapPin, Calendar, Magnifier } from "@gravity-ui/icons";

const BookingFilter = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 relative -mt-8 sm:-mt-12 z-20">
      <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl p-6 lg:p-8">
        <form className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-end">
          
          {/* Input: Pickup Location */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin width={14} height={14} className="text-amber-500" /> Pick-up Location
            </label>
            <select className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer appearance-none">
              <option value="">Select Division...</option>
              <option value="rajshahi">Rajshahi Division</option>
              <option value="dhaka">Dhaka Division</option>
              <option value="chittagong">Chattogram Division</option>
            </select>
          </div>

          {/* Input: Pickup Date */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar width={14} height={14} className="text-amber-500" /> Pick-up Date
            </label>
            <input 
              type="date" 
              className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
            />
          </div>

          {/* Input: Drop-off Date */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calendar width={14} height={14} className="text-amber-500" /> Drop-off Date
            </label>
            <input 
              type="date" 
              className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
            />
          </div>

          {/* Action Button */}
          <div>
            <button 
              type="submit" 
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl py-3.5 px-6 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              <Magnifier width={16} height={16} />
              Find Best Deal
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BookingFilter;