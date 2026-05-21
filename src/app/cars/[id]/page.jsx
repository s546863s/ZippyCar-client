"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "react-toastify";
import { ArrowLeft, Calendar, Car, Settings, Fuel, Users, Shield, MapPin, CheckCircle, Crown, Receipt, AlertTriangle } from "lucide-react";

const CarDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rentalDays, setRentalDays] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axiosInstance.get(`/api/cars/${id}`);
        if (response.data.success) {
          setCar(response.data.car);
        } else {
          toast.error("Car not found");
          router.push("/cars");
        }
      } catch (error) {
        toast.error("Failed to load car details");
        router.push("/cars");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchCar();
  }, [id, router]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 3600 * 24));
      if (days > 0) {
        setRentalDays(days);
        setTotalCost(days * car.dailyPrice);
      } else {
        setRentalDays(0);
        setTotalCost(0);
      }
    }
  }, [startDate, endDate, car]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("Please login to book a vehicle!");
      router.push("/login");
      return;
    }
    if (rentalDays <= 0) {
      toast.error("Please select valid dates!");
      return;
    }

    setIsBookingLoading(true);
    try {
      const response = await axiosInstance.post("/api/bookings/add", {
        carId: car._id, carModel: car.carModel, image: car.image, userEmail: user.email,
        startDate, endDate, duration: rentalDays, totalPrice: totalCost, status: "Confirmed"
      });
      if (response.data.success) {
        setIsModalOpen(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed!");
    } finally {
      setIsBookingLoading(false);
    }
  };

  if (isLoading) {
    return (<div className="min-h-screen bg-[#090d16] flex items-center justify-center"><div className="w-12 h-12 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin" /></div>);
  }
  if (!car) return null;

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/cars" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-500 mb-8 group"><ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Cars</Link>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="relative h-80 rounded-2xl overflow-hidden"><Image src={car.image} alt={car.carModel} fill className="object-cover" /></div>
            <div><span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold uppercase rounded-md">{car.type}</span><h1 className="text-3xl font-bold mt-4">{car.carModel}</h1><p className="text-slate-400 mt-2">{car.description || "Premium luxury vehicle with high-end comfort and performance."}</p></div>
            <div className="grid grid-cols-3 gap-4"><div className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center gap-3"><Settings className="text-amber-500" size={20} /><div><span className="text-xs text-slate-400">Transmission</span><p className="font-bold">{car.transmission}</p></div></div><div className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center gap-3"><Fuel className="text-amber-500" size={20} /><div><span className="text-xs text-slate-400">Fuel</span><p className="font-bold">{car.fuel}</p></div></div><div className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center gap-3"><Users className="text-amber-500" size={20} /><div><span className="text-xs text-slate-400">Seats</span><p className="font-bold">{car.seats} Seats</p></div></div></div>
            <div className="bg-[#111827]/50 border border-slate-800/80 rounded-2xl p-6"><h3 className="font-bold mb-4">Included Features</h3><div className="grid grid-cols-2 gap-3 text-sm"><div className="flex items-center gap-2"><CheckCircle size={14} className="text-amber-500" />Full Insurance</div><div className="flex items-center gap-2"><CheckCircle size={14} className="text-amber-500" />24/7 Roadside</div><div className="flex items-center gap-2"><CheckCircle size={14} className="text-amber-500" />GPS Tracking</div><div className="flex items-center gap-2"><CheckCircle size={14} className="text-amber-500" />Free Cancellation</div></div></div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 sticky top-28 space-y-6">
              <div><span className="text-xs text-slate-400">Daily Price</span><div className="text-3xl font-black text-amber-500">${car.dailyPrice}<span className="text-sm text-slate-400"> / day</span></div></div>
              <form onSubmit={handleBooking} className="space-y-4">
                <div><label className="text-xs font-semibold text-slate-300">Pick-Up Date</label><div className="relative mt-1"><Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" /><input type="date" required value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-3 text-white outline-none" /></div></div>
                <div><label className="text-xs font-semibold text-slate-300">Return Date</label><div className="relative mt-1"><Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" /><input type="date" required value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-3 text-white outline-none" /></div></div>
                {rentalDays > 0 && (<div className="bg-slate-900/80 rounded-xl p-4 space-y-2 text-sm"><div className="flex justify-between"><span>Daily Rate:</span><span>${car.dailyPrice} × {rentalDays} days</span></div><div className="border-t border-slate-800 my-2" /><div className="flex justify-between font-bold"><span>Total:</span><span className="text-amber-500 text-lg">${totalCost}</span></div></div>)}
                <button type="submit" disabled={isBookingLoading} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"><Car size={18} />{isBookingLoading ? "Processing..." : "Book Now"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>{isModalOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center px-4"><div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" /><motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#111827] border border-slate-800 max-w-md w-full rounded-2xl p-6 text-center relative z-10"><div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-500 mx-auto rounded-full flex items-center justify-center mb-4"><Crown size={32} className="animate-pulse" /></div><h2 className="text-2xl font-bold">Booking Confirmed!</h2><p className="text-slate-400 text-sm mt-1">Your booking has been added successfully.</p><div className="bg-slate-900/60 rounded-xl p-4 my-5 text-left text-sm space-y-2"><div className="flex justify-between"><span>Car:</span><span className="font-bold">{car.carModel}</span></div><div className="flex justify-between"><span>Duration:</span><span className="text-amber-400 font-bold">{rentalDays} Days</span></div><div className="border-t border-slate-800 my-2" /><div className="flex justify-between font-bold"><span>Total:</span><span className="text-emerald-400 text-lg">${totalCost}</span></div></div><div className="flex gap-3"><Link href="/my-bookings" className="flex-1 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-center">My Bookings</Link><button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-slate-900 border border-slate-800 rounded-xl">Close</button></div></motion.div></div>)}</AnimatePresence>
    </div>
  );
};

export default CarDetailsPage;