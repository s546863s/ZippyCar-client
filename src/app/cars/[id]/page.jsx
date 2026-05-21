"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  FaCar,
  FaCogs,
  FaGasPump,
  FaUserFriends,
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaTimes,
  FaCrown,
  FaReceipt,
  FaExclamationTriangle,
  FaEnvelope,
} from "react-icons/fa";

const CarDetailsPage = () => {
  const { id } = useParams();
  
  const { user, loading: authLoading } = useAuth();

  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [rentalDays, setRentalDays] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`
        );

        const data = await response.json();

        if (response.ok) {
          setCar(data);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCarDetails();
    }
  }, [id]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const differenceInTime = end.getTime() - start.getTime();

      const differenceInDays = Math.ceil(
        differenceInTime / (1000 * 3600 * 24)
      );

      if (differenceInDays > 0) {
        setRentalDays(differenceInDays);
        setTotalCost(differenceInDays * car.dailyPrice);
      } else {
        setRentalDays(0);
        setTotalCost(0);
      }
    }
  }, [startDate, endDate, car]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.email) {
      return setErrorModal({
        isOpen: true,
        title: "Login Required",
        message: "You must be logged in to book a vehicle. Please log in first!",
      });
    }

    if (rentalDays <= 0) {
      return setErrorModal({
        isOpen: true,
        title: "Invalid Date Range",
        message: "Please select a valid future date range for your rental!",
      });
    }

    setIsBookingLoading(true);

    const bookingInfo = {
      carId: car._id,
      carModel: car.carModel,
      image: car.image,
      userEmail: user.email,
      startDate,
      endDate,
      duration: rentalDays,
      totalPrice: totalCost,
      status: "Confirmed",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingInfo),
        }
      );

      if (response.ok) {
        setIsModalOpen(true);
      } else {
        setErrorModal({
          isOpen: true,
          title: "Booking Failed",
          message: "Failed to complete your booking. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      setErrorModal({
        isOpen: true,
        title: "Server Error",
        message: "An unexpected server error occurred. Please check your connection.",
      });
    } finally {
      setIsBookingLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStartDate("");
    setEndDate("");
    setRentalDays(0);
    setTotalCost(0);
  };

  const handleCloseErrorModal = () => {
    setErrorModal({ isOpen: false, title: "", message: "" });
  };

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-xs font-mono tracking-widest uppercase">
          Loading Details...
        </p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400">Car not found.</p>
        <Link
          href="/cars"
          className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold uppercase"
        >
          Back to Cars
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="mb-8">
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-500 transition-colors group"
          >
            <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
            Back to Cars
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full h-64 sm:h-[400px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={car.image}
                alt={car.carModel}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="space-y-3">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold uppercase rounded-md tracking-wider">
                {car.type}
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {car.carModel}
              </h1>

              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                {car.description ||
                  "Premium luxury vehicle with high-end comfort and performance."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 text-amber-500 flex items-center justify-center rounded-lg">
                  <FaCogs />
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">
                    Transmission
                  </span>

                  <span className="text-sm font-bold">
                    {car.transmission}
                  </span>
                </div>
              </div>

              <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 text-amber-500 flex items-center justify-center rounded-lg">
                  <FaGasPump />
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">Fuel</span>

                  <span className="text-sm font-bold">{car.fuel}</span>
                </div>
              </div>

              <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 text-amber-500 flex items-center justify-center rounded-lg">
                  <FaUserFriends />
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">Seats</span>

                  <span className="text-sm font-bold">
                    {car.seats} Seats
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827]/50 border border-slate-800/80 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-200">
                Included Features
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-amber-500 shrink-0 text-xs" />
                  Full Insurance Included
                </div>

                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-amber-500 shrink-0 text-xs" />
                  24/7 Roadside Support
                </div>

                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-amber-500 shrink-0 text-xs" />
                  GPS Tracking Enabled
                </div>

                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-amber-500 shrink-0 text-xs" />
                  Fully Cleaned Before Delivery
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 xl:col-span-4 bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 lg:sticky lg:top-28"
          >
            <div>
              <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">
                Daily Price
              </span>

              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-amber-500">
                  ${car.dailyPrice}
                </span>

                <span className="text-sm text-slate-400">/ day</span>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Logged In As (Email)
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs pointer-events-none" />

                  <input
                    type="email"
                    readOnly
                    disabled
                    value={user?.email || "Not Logged In"}
                    className="w-full bg-slate-900/40 border border-slate-800/80 text-slate-500 rounded-xl pl-11 pr-4 py-3 text-xs outline-none tracking-wide cursor-not-allowed font-mono select-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Pick-Up Date
                </label>

                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none" />

                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-300 outline-none uppercase tracking-wider transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Return Date
                </label>

                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none" />

                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/40 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-300 outline-none uppercase tracking-wider transition-all duration-200"
                  />
                </div>
              </div>

              {rentalDays > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 space-y-2 text-xs text-slate-400 mt-2 font-medium"
                >
                  <div className="flex justify-between">
                    <span>Daily Rate:</span>

                    <span className="text-white">
                      ${car.dailyPrice} × {rentalDays} Days
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Insurance & GPS:</span>

                    <span className="text-emerald-500 font-bold">FREE</span>
                  </div>

                  <div className="w-full border-t border-slate-800/80 my-2" />

                  <div className="flex justify-between items-baseline text-sm">
                    <span className="font-bold text-slate-200">Total:</span>

                    <span className="text-amber-500 font-black text-lg">
                      ${totalCost}
                    </span>
                  </div>
                </motion.div>
              )}

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isBookingLoading}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-extrabold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-50"
              >
                <FaCar className="text-xs" />

                {isBookingLoading ? "Processing..." : "Book Now"}
              </motion.button>
            </form>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-800/80 font-medium">
              <div className="flex items-center gap-1.5">
                <FaShieldAlt className="text-amber-500/70" />
                Secure Booking
              </div>

              <div className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-amber-500/70" />
                Pick-Up Available
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#111827] border border-slate-800 max-w-md w-full rounded-2xl p-6 text-center shadow-2xl z-10 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <FaTimes className="text-sm" />
              </button>

              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-500 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 relative">
                <FaCrown className="animate-pulse" />

                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md animate-ping opacity-30 pointer-events-none" />
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white">
                Booking Confirmed!
              </h2>

              <p className="text-xs text-slate-400 mt-1.5 max-w-xs mx-auto">
                Your booking has been added successfully.
              </p>

              <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4 my-5 text-left text-xs space-y-2.5 font-medium text-slate-400">
                <div className="flex justify-between items-center">
                  <span>Car:</span>

                  <span className="text-white font-bold">
                    {car.carModel}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>User Email:</span>

                  <span className="text-slate-300 font-mono">
                    {user?.email}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Duration:</span>

                  <span className="text-amber-400 font-mono font-bold">
                    {rentalDays} Days
                  </span>
                </div>

                <div className="w-full border-t border-slate-800/40 my-1" />

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-bold">Total:</span>

                  <span className="text-emerald-400 font-black text-base">
                    ${totalCost}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/my-bookings"
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                >
                  <FaReceipt className="text-[10px]" />
                  My Bookings
                </Link>

                <button
                  onClick={handleCloseModal}
                  className="flex-1 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {errorModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseErrorModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-[#111827] border border-rose-500/20 max-w-sm w-full rounded-2xl p-6 text-center shadow-2xl z-10 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />

              <button
                onClick={handleCloseErrorModal}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <FaTimes className="text-sm" />
              </button>

              <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 text-rose-500 mx-auto rounded-full flex items-center justify-center text-xl mb-4">
                <FaExclamationTriangle
                  className="animate-bounce"
                  style={{ animationDuration: "2s" }}
                />
              </div>

              <h2 className="text-lg font-extrabold tracking-tight text-white">
                {errorModal.title}
              </h2>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {errorModal.message}
              </p>

              <button
                onClick={handleCloseErrorModal}
                className="w-full mt-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-rose-600/10"
              >
                Understood
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarDetailsPage;