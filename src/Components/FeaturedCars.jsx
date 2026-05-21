"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Settings, Fuel, Users, Star } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get("/api/cars");
        if (response.data.success) {
          const carsData = response.data.cars || response.data;
          setCars(carsData.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-[#090d16] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 text-xs mt-4">Loading featured cars...</p>
        </div>
      </section>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="bg-[#090d16] text-white py-20 overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our <span className="text-amber-500">Featured</span> Fleet
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm">Choose from our premium class collections that suit your next trip.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <motion.div key={car._id} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -8 }} className="bg-[#111827] border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 group shadow-xl">
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                <Image src={car.image} alt={car.carModel} fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 text-xs font-bold px-3 py-1 rounded-lg text-amber-500 flex items-center gap-1">
                  <Star size={12} fill="#f59e0b" /> {car.rating || "4.9"}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">{car.carModel}</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-400 border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2"><Settings size={14} className="text-amber-500" /><span>{car.transmission}</span></div>
                    <div className="flex items-center gap-2"><Fuel size={14} className="text-amber-500" /><span>{car.fuel}</span></div>
                    <div className="flex items-center gap-2 col-span-2"><Users size={14} className="text-amber-500" /><span>{car.seats} Seats</span></div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div><span className="text-xl font-black text-white">${car.dailyPrice}</span><span className="text-xs text-slate-400"> / day</span></div>
                  <Link href={`/cars/${car._id}`} className="px-4 py-2 bg-slate-800 hover:bg-amber-500 border border-slate-700 hover:border-amber-500 text-white hover:text-slate-950 text-xs font-bold rounded-lg transition-all duration-300 flex items-center gap-1">
                    <Car size={14} /> Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;