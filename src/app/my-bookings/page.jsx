"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FaCalendarCheck, FaCar, FaClock, FaCheckCircle, 
  FaTimesCircle, FaReceipt 
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext"; 

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchMyBookings = async () => {
      if (!user?.email) return;

      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8000/api/bookings/my-bookings?email=${user.email}`);
        const data = await response.json();

        if (response.ok) {
          setBookings(data);
        }
      } catch (error) {
        console.error("Error fetching filtered bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      fetchMyBookings();
    }
  }, [user?.email, authLoading]);

  const getStatusStyle = (status) => {
    if (status === "Confirmed") return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
    if (status === "Pending") return "bg-amber-500/10 border-amber-500/20 text-amber-400";
    return "bg-slate-800 border-slate-700 text-slate-400";
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-xs font-mono tracking-widest uppercase">
          Loading Your Bookings...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center gap-3">
        <FaTimesCircle className="text-red-500 text-4xl mb-2" />
        <p className="text-slate-300 text-sm font-semibold">Please log in to view your bookings.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        
        <div className="mb-10 text-center md:text-left border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3 justify-center md:justify-start">
              <FaCalendarCheck className="text-amber-500 text-2xl sm:text-3xl" />
              My Rental <span className="text-amber-500">Bookings</span>
            </h1>
            <p className="text-slate-400 mt-2 text-xs sm:text-sm">
              Track your scheduled luxury asset deployments, invoices, and garage schedules.
            </p>
          </div>
          <div className="text-xs font-mono bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-300">
            Total Logs: <span className="text-amber-400 font-bold">{bookings.length}</span>
          </div>
        </div>

        {bookings.length > 0 && (
          <div className="hidden md:block bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-5">Vehicle Asset</th>
                  <th className="p-5">Booking ID</th>
                  <th className="p-5">Schedule Period</th>
                  <th className="p-5">Duration</th>
                  <th className="p-5">Gross Bill</th>
                  <th className="p-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm font-medium">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-900/30 transition-colors group">
                    <td className="p-5 flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-800 group-hover:border-slate-700 transition-colors">
                        <Image src={booking.image} alt={booking.carModel} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-white block font-bold group-hover:text-amber-500 transition-colors">{booking.carModel}</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500/70">Premium</span>
                      </div>
                    </td>
                    
                    <td className="p-5 font-mono text-xs text-slate-400 font-bold">
                      BK-{booking._id ? booking._id.substring(0, 8).toUpperCase() : "N/A"}
                    </td>
                    
                    <td className="p-5 text-slate-300 text-xs font-semibold">
                      <div className="flex flex-col gap-0.5">
                        <span>From: {booking.startDate}</span>
                        <span className="text-slate-500">To: {booking.endDate}</span>
                      </div>
                    </td>
                    
                    <td className="p-5 text-slate-300 font-mono text-xs font-bold">{booking.duration} Days</td>
                    
                    <td className="p-5 font-black text-amber-500">${booking.totalPrice}</td>
                    
                    <td className="p-5 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wide ${getStatusStyle(booking.status)}`}>
                        {booking.status === "Confirmed" && <FaCheckCircle className="text-[10px]" />}
                        {booking.status === "Pending" && <FaClock className="text-[10px] animate-pulse" />}
                        {booking.status === "Completed" && <FaReceipt className="text-[10px]" />}
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {bookings.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {bookings.map((booking) => (
              <motion.div 
                whileHover={{ y: -2 }}
                key={booking._id} 
                className="bg-[#111827] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-14 bg-slate-800 rounded-xl overflow-hidden border border-slate-800 shrink-0">
                    <Image src={booking.image} alt={booking.carModel} fill className="object-cover" />
                  </div>
                  <div>
                    <span className={`inline-flex px-2 py-0.5 border rounded-md text-[9px] font-mono font-bold uppercase tracking-widest mb-1 ${getStatusStyle(booking.status)}`}>
                      {booking.status}
                    </span>
                    <h3 className="text-base font-bold text-white leading-tight">{booking.carModel}</h3>
                  </div>
                </div>

                <div className="w-full border-t border-slate-800/60" />

                <div className="grid grid-cols-2 gap-y-3 text-xs font-medium text-slate-400">
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">Booking ID</span>
                    <span className="font-mono text-slate-300 font-bold">
                      BK-{booking._id ? booking._id.substring(0, 8).toUpperCase() : "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">Duration</span>
                    <span className="text-slate-300 font-bold">{booking.duration} Days Rate</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] uppercase text-slate-500 block">Schedule Period</span>
                    <span className="text-slate-300 font-semibold">{booking.startDate} <span className="text-slate-600">to</span> {booking.endDate}</span>
                  </div>
                </div>

                <div className="w-full border-t border-slate-800/60 pt-3 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300">Gross Settlement:</span>
                  <span className="text-amber-500 font-black text-base">${booking.totalPrice}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {bookings.length === 0 && (
          <div className="text-center py-16 bg-[#111827] border border-slate-800 rounded-2xl p-8">
            <FaCar className="text-slate-600 text-4xl mx-auto mb-3" />
            <p className="text-slate-400 text-sm">You haven't made any premium fleet deployments yet.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookingsPage;