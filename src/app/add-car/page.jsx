"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaCar, FaCloudUploadAlt, FaDollarSign, FaCogs, 
  FaGasPump, FaUserFriends, FaClipboardList, FaCheckCircle 
} from "react-icons/fa";

const AddCarPage = () => {
  // ১. ফর্ম স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "Sedan",
    price: "",
    transmission: "Automatic",
    fuel: "Octane",
    seats: "5",
    image: "",
    desc: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // মক এপিআই রিকোয়েস্ট টাইমিং (২ সেকেন্ড)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      console.log("Newly Added Car Asset Data:", formData);
      
      // ৩ সেকেন্ড পর সাকসেস মেসেজ রিসেট হবে
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          brand: "",
          type: "Sedan",
          price: "",
          transmission: "Automatic",
          fuel: "Octane",
          seats: "5",
          image: "",
          desc: ""
        });
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      
      {/* Background Cyber Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-3xl mx-auto z-10 relative">
        
        {/* Header Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            List Your <span className="text-amber-500">Premium Car</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Fill out the operational specifications to add your vehicle to the ZippyCar elite pool.
          </p>
        </div>

        {/* Dynamic Success Alert Alert Box */}
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 text-sm font-medium"
          >
            <FaCheckCircle className="shrink-0 text-base animate-bounce" />
            <span>Success! Your luxury asset has been registered and deployed to the fleet server.</span>
          </motion.div>
        )}

        {/* Core Multi-Input Form Sheet */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Car Name & Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Vehicle Model Name</label>
                <div className="relative">
                  <FaCar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input 
                    type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g., Q7 Luxury Sport"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Car Brand / Maker</label>
                <div className="relative">
                  <FaClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input 
                    type="text" name="brand" required value={formData.brand} onChange={handleChange} placeholder="e.g., Audi"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Category Type & Price Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Body Category Type</label>
                <select 
                  name="type" value={formData.type} onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl px-4 py-3.5 text-sm text-slate-300 outline-none transition-all duration-200 cursor-pointer"
                >
                  <option value="Sedan">Sedan Premium</option>
                  <option value="SUV">SUV Crossover</option>
                  <option value="Coupe">Sports Coupe</option>
                  <option value="Hypercar">Elite Hypercar</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Rental Price Rate (Per Day)</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input 
                    type="number" name="price" required value={formData.price} onChange={handleChange} placeholder="e.g., 150"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Transmission, Fuel, Seats Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Transmission</label>
                <div className="relative">
                  <FaCogs className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none" />
                  <select 
                    name="transmission" value={formData.transmission} onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-300 outline-none transition-all duration-200 cursor-pointer"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Fuel / Engine Type</label>
                <div className="relative">
                  <FaGasPump className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none" />
                  <select 
                    name="fuel" value={formData.fuel} onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-300 outline-none transition-all duration-200 cursor-pointer"
                  >
                    <option value="Octane">Octane</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Electric/Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Total Seats Capacity</label>
                <div className="relative">
                  <FaUserFriends className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none" />
                  <select 
                    name="seats" value={formData.seats} onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-300 outline-none transition-all duration-200 cursor-pointer"
                  >
                    <option value="2">2 Seats</option>
                    <option value="4">4 Seats</option>
                    <option value="5">5 Seats</option>
                    <option value="7">7 Seats</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Row 4: Image Media URL Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Vehicle Asset Image URL</label>
              <div className="relative">
                <FaCloudUploadAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base" />
                <input 
                  type="url" name="image" required value={formData.image} onChange={handleChange} placeholder="https://images.unsplash.com/your-premium-car-photo"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Row 5: Long Narrative Description Box */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Luxury Showcase Description</label>
              <textarea 
                name="desc" required rows="4" value={formData.desc} onChange={handleChange} placeholder="Describe the outstanding comforts, adaptive suspension details, or audio setups of this premium machine..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 resize-none leading-relaxed"
              />
            </div>

            {/* Core Action Submit Button */}
            <motion.button 
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className={`w-full py-4 text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                isSubmitting 
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                  : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/10 cursor-pointer"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-500 border-t-amber-500 rounded-full animate-spin" />
                  Processing Listing...
                </>
              ) : (
                <>
                  <FaCloudUploadAlt className="text-base" />
                  Deploy Asset Into Fleet
                </>
              )}
            </motion.button>

          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default AddCarPage;