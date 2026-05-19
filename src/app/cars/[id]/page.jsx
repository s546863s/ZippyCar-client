"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCar, FaCogs, FaGasPump, FaUserFriends, FaArrowLeft, 
  FaCalendarAlt, FaCheckCircle, FaShieldAlt, FaMapMarkerAlt,
  FaTimes, FaCrown, FaReceipt
} from "react-icons/fa";

const CarDetailsPage = () => {
  const { id } = useParams();

  // ১. ডেমো ডাটাবেজ
  const carDatabase = {
    "1": { name: "BMW 5 Series", type: "Sedan", price: 120, transmission: "Automatic", fuel: "Octane", seats: 5, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e", desc: "Experience the ultimate driving machine. The BMW 5 Series blends breathtaking luxury with dynamic sporty performance, perfect for high-profile executive trips and smooth highway cruising." },
    "2": { name: "Audi Q7 Luxury", type: "SUV", price: 180, transmission: "Automatic", fuel: "Hybrid", seats: 7, image: "https://images.unsplash.com/photo-1563720223185-11003d516935", desc: "The Audi Q7 is a masterpiece of luxury and space. Equipped with legendary Quattro all-wheel drive, premium sound acoustic setups, and ample 7-passenger seating capacity for elite family getaways." },
    "3": { name: "Mercedes-Benz E-Class", type: "Sedan", price: 150, transmission: "Automatic", fuel: "Octane", seats: 5, image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8", desc: "Unmatched sophistication and cutting-edge intelligence. The Mercedes-Benz E-Class redefines urban travel comfort with adaptive air suspensions and high-fidelity ambient interior architectures." },
    "4": { name: "Toyota Land Cruiser", type: "SUV", price: 220, transmission: "Automatic", fuel: "Diesel", seats: 7, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf", desc: "The king of all terrains. Known for absolute bulletproof reliability and extreme cross-country performance, our premium Land Cruiser is built to conquer rugged cross-divisional highways." },
    "5": { name: "Civic Turbo Type R", type: "Sedan", price: 90, transmission: "Manual", fuel: "Octane", seats: 5, image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2", desc: "For the pure driving enthusiasts who crave analog controls and high-revving turbo power. The Civic Type R brings racetrack aerodynamics straight into your weekend street rentals." },
    "6": { name: "Range Rover Vogue", type: "SUV", price: 250, transmission: "Automatic", fuel: "Hybrid", seats: 5, image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5", desc: "Peerless status and imperial luxury. The Range Rover Vogue offers an unmatched floating-ride experience, active noise cancellation cabins, and command driving dynamics." }
  };

  const car = carDatabase[id] || carDatabase["1"];

  // ২. বুকিং ফর্ম ও মডাল স্টেট ম্যানেজমেন্ট
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [rentalDays, setRentalDays] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // মডাল কন্ট্রোল স্টেট

  // ৩. ডাইনামিক দিন ও প্রাইস ক্যালকুলেশন
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      
      if (differenceInDays > 0) {
        setRentalDays(differenceInDays);
        setTotalCost(differenceInDays * car.price);
      } else {
        setRentalDays(0);
        setTotalCost(0);
      }
    }
  }, [startDate, endDate, car.price]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (rentalDays <= 0) return alert("Please select a valid future date range!");
    
    // অ্যালার্টের পরিবর্তে মডাল ওপেন হবে
    setIsModalOpen(true);
  };

  // মডাল ক্লোজ এবং ফর্ম রিসেট ফাংশন
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStartDate("");
    setEndDate("");
    setRentalDays(0);
    setTotalCost(0);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      
      {/* Decorative Blur Ambient */}
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Navigation Action Back Link */}
        <div className="mb-8">
          <Link href="/cars" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-500 transition-colors group">
            <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" /> Back to Fleet Garage
          </Link>
        </div>

        {/* Two-Column Grid Layout: Details vs Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Media & Specs */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full h-64 sm:h-[400px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image src={car.image} alt={car.name} fill className="object-cover" priority />
            </motion.div>

            <div className="space-y-3">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold uppercase rounded-md tracking-wider">
                {car.type} Category
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{car.name}</h1>
              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">{car.desc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 text-amber-500 flex items-center justify-center rounded-lg"><FaCogs /></div>
                <div><span className="text-xs text-slate-400 block">Transmission</span><span className="text-sm font-bold">{car.transmission}</span></div>
              </div>
              <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 text-amber-500 flex items-center justify-center rounded-lg"><FaGasPump /></div>
                <div><span className="text-xs text-slate-400 block">Fuel Engine</span><span className="text-sm font-bold">{car.fuel}</span></div>
              </div>
              <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 text-amber-500 flex items-center justify-center rounded-lg"><FaUserFriends /></div>
                <div><span className="text-xs text-slate-400 block">Capacity</span><span className="text-sm font-bold">{car.seats} Seats Registered</span></div>
              </div>
            </div>

            <div className="bg-[#111827]/50 border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-200">Rental Premium Assurances</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
                <div className="flex items-center gap-2.5"><FaCheckCircle className="text-amber-500 shrink-0 text-xs" /> Full Comprehensive Insurance Included</div>
                <div className="flex items-center gap-2.5"><FaCheckCircle className="text-amber-500 shrink-0 text-xs" /> 24/7 Divisional Roadside Mechanical Support</div>
                <div className="flex items-center gap-2.5"><FaCheckCircle className="text-amber-500 shrink-0 text-xs" /> Realtime GPS Live Fleet Tracking Enabled</div>
                <div className="flex items-center gap-2.5"><FaCheckCircle className="text-amber-500 shrink-0 text-xs" /> Completely Sanitized & Detailed Before Handover</div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Controller Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 xl:col-span-4 bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 lg:sticky lg:top-28"
          >
            <div>
              <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Standard Hub Rate</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-amber-500">${car.price}</span>
                <span className="text-sm text-slate-400">/ day</span>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Pick-Up Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none" />
                  <input type="date" required value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-300 outline-none uppercase tracking-wider transition-all duration-200" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Return Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none" />
                  <input type="date" required value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-300 outline-none uppercase tracking-wider transition-all duration-200" />
                </div>
              </div>

              {rentalDays > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 space-y-2 text-xs text-slate-400 mt-2 font-medium">
                  <div className="flex justify-between"><span>Base Day Rate:</span><span className="text-white">${car.price} x {rentalDays} Days</span></div>
                  <div className="flex justify-between"><span>GPS & Insurance Fees:</span><span className="text-emerald-500 font-bold">FREE / Complementary</span></div>
                  <div className="w-full border-t border-slate-800/80 my-2" />
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="font-bold text-slate-200">Total Calculation:</span>
                    <span className="text-amber-500 font-black text-lg">${totalCost}</span>
                  </div>
                </motion.div>
              )}

              <motion.button whileTap={{ scale: 0.98 }} type="submit" className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer mt-4">
                <FaCar className="text-xs" /> Reserve Asset Slot
              </motion.button>
            </form>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-800/80 font-medium">
              <div className="flex items-center gap-1.5"><FaShieldAlt className="text-amber-500/70" /> Secured Verification</div>
              <div className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-amber-500/70" /> Fleet Hub Pickup</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ==================== 🎉 PREMIUM CONGRATS MODAL ==================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            
            {/* Backdrop Blur Overlap */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Core Modal Box Sheet */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#111827] border border-slate-800 max-w-md w-full rounded-2xl p-6 text-center shadow-2xl z-10 relative overflow-hidden"
            >
              {/* Top Cyber Line Glow */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              
              {/* Close Action Trigger */}
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <FaTimes className="text-sm" />
              </button>

              {/* Glowing Animated Crown Icon Container */}
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-500 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 relative">
                <FaCrown className="animate-pulse" />
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md animate-ping opacity-30 pointer-events-none" />
              </div>

              {/* Typography Heading Headers */}
              <h2 className="text-2xl font-black tracking-tight text-white">
                Congratulations, Captain!
              </h2>
              <p className="text-xs text-slate-400 mt-1.5 max-w-xs mx-auto">
                Your premium fleet request has been authorized and securely added to the garage schedules.
              </p>

              {/* Custom Mini Invoice Breakdown inside Modal */}
              <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4 my-5 text-left text-xs space-y-2.5 font-medium text-slate-400">
                <div className="flex justify-between items-center">
                  <span>Selected Machine:</span>
                  <span className="text-white font-bold">{car.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Deployment Timeline:</span>
                  <span className="text-amber-400 font-mono font-bold">{rentalDays} Days Premium Slot</span>
                </div>
                <div className="w-full border-t border-slate-800/40 my-1" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-bold">Total Allocation:</span>
                  <span className="text-emerald-400 font-black text-base">${totalCost}</span>
                </div>
              </div>

              {/* Action Redirection Route Triggers */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/my-bookings" 
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                >
                  <FaReceipt className="text-[10px]" /> View Bookings
                </Link>
                <button 
                  onClick={handleCloseModal}
                  className="flex-1 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Keep Browsing
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarDetailsPage;