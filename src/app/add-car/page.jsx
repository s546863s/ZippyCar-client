"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  FaCar,
  FaCloudUploadAlt,
  FaDollarSign,
  FaCogs,
  FaGasPump,
  FaUserFriends,
  FaClipboardList,
  FaHashtag,
  FaCheckCircle,
  FaHome,
  FaPlusCircle
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCarPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    carModel: "",
    brand: "",
    type: "Sedan",
    dailyPrice: "",
    transmission: "Automatic",
    fuel: "Octane",
    seats: "5",
    vehicleNumber: "",
    image: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please log in to add a car!");
      return;
    }

    setIsSubmitting(true);

    try {
      const finalData = {
        carModel: formData.carModel,
        brand: formData.brand,
        type: formData.type,
        dailyPrice: Number(formData.dailyPrice),
        transmission: formData.transmission,
        fuel: formData.fuel,
        seats: Number(formData.seats),
        vehicleNumber: formData.vehicleNumber,
        image: formData.image,
        description: formData.description,
        userEmail: user.email,
        availability: "Available",
        bookingCount: 0,
      };

      const response = await fetch(
        "http://localhost:8000/api/cars/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add car!");
      }

      toast.success("Car added successfully!");
      setShowModal(true);

      setFormData({
        carModel: "",
        brand: "",
        type: "Sedan",
        dailyPrice: "",
        transmission: "Automatic",
        fuel: "Octane",
        seats: "5",
        vehicleNumber: "",
        image: "",
        description: "",
      });
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Checking Authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-3xl mx-auto z-10 relative">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            List Your <span className="text-amber-500">Premium Car</span>
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Fill out the details to add your car.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Vehicle Model Name
                </label>
                <div className="relative">
                  <FaCar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input
                    type="text"
                    name="carModel"
                    required
                    value={formData.carModel}
                    onChange={handleChange}
                    placeholder="e.g., Q7 Luxury Sport"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Car Brand
                </label>
                <div className="relative">
                  <FaClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input
                    type="text"
                    name="brand"
                    required
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g., Audi"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Car Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl px-4 py-3.5 text-sm text-slate-300 outline-none transition-all duration-200 cursor-pointer"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Hypercar">Hypercar</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Daily Price
                </label>
                <div className="relative">
                  <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input
                    type="number"
                    name="dailyPrice"
                    required
                    value={formData.dailyPrice}
                    onChange={handleChange}
                    placeholder="e.g., 120"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Vehicle Number
                </label>
                <div className="relative">
                  <FaHashtag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input
                    type="text"
                    name="vehicleNumber"
                    required
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    placeholder="e.g., DHAKA-Metro-123"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Transmission
                </label>
                <div className="relative">
                  <FaCogs className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none" />
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-300 outline-none transition-all duration-200 cursor-pointer"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Fuel Type
                </label>
                <div className="relative">
                  <FaGasPump className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none" />
                  <select
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-300 outline-none transition-all duration-200 cursor-pointer"
                  >
                    <option value="Octane">Octane</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Seats
                </label>
                <div className="relative">
                  <FaUserFriends className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none" />
                  <select
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
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

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Image URL
              </label>
              <div className="relative">
                <FaCloudUploadAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base" />
                <input
                  type="url"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/car.jpg"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Description
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write details about the car..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 resize-none leading-relaxed"
              />
            </div>

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
                  Processing...
                </>
              ) : (
                <>
                  <FaCloudUploadAlt className="text-base" />
                  Add Car
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative z-10"
            >
              <div className="flex justify-center mb-4">
                <FaCheckCircle className="text-emerald-500 text-5xl sm:text-6xl animate-bounce" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Success!
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Your luxury vehicle has been listed successfully. What would you like to do next?
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
                >
                  <FaPlusCircle className="text-amber-500 text-base" />
                  Add Another Car
                </button>

                <button
                  onClick={() => router.push("/")}
                  className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaHome className="text-base" />
                  Go to Home
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddCarPage;