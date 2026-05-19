"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FaCalendarCheck, FaCar, FaClock, FaCheckCircle, 
  FaTimesCircle, FaReceipt, FaMapMarkerAlt 
} from "react-icons/fa";

const MyBookingsPage = () => {
  // ১. ডেমো বুকিং হিস্ট্রি ডাটাবেজ
  const [bookings, setBookings] = useState([
    {
      id: "BK-8801",
      carName: "BMW 5 Series",
      type: "Sedan",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      startDate: "2026-05-20",
      endDate: "2026-05-23",
      totalDays: 3,
      totalCost: 360,
      status: "Confirmed", // Confirmed, Pending, Completed
    },
    {
      id: "BK-4322",
      carName: "Range Rover Vogue",
      type: "SUV",
      image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5",
      startDate: "2026-06-01",
      endDate: "2026-06-03",
      totalDays: 2,
      totalCost: 500,
      status: "Pending",
    },
    {
      id: "BK-1094",
      carName: "Civic Turbo Type R",
      type: "Sedan",
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
      startDate: "2026-04-12",
      endDate: "2026-04-13",
      totalDays: 1,
      totalCost: 90,
      status: "Completed",
    },
  ]);

  // স্ট্যাটাস অনুযায়ী নিওন ব্যাজ কালার সেট করার ফাংশন
  const getStatusStyle = (status) => {
    if (status === "Confirmed") return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
    if (status === "Pending") return "bg-amber-500/10 border-amber-500/20 text-amber-400";
    return "bg-slate-800 border-slate-700 text-slate-400";
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Header Metadata block */}
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

        {/* Desktop Data Grid View (Table System) */}
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
                <tr key={booking.id} className="hover:bg-slate-900/30 transition-colors group">
                  {/* Vehicle Meta */}
                  <td className="p-5 flex items-center gap-4">
                    <div className="relative w-16 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-800 group-hover:border-slate-700 transition-colors">
                      <Image src={booking.image} alt={booking.carName} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="text-white block font-bold group-hover:text-amber-500 transition-colors">{booking.carName}</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500/70">{booking.type}</span>
                    </div>
                  </td>
                  
                  {/* ID */}
                  <td className="p-5 font-mono text-xs text-slate-400 font-bold">{booking.id}</td>
                  
                  {/* Dates */}
                  <td className="p-5 text-slate-300 text-xs font-semibold">
                    <div className="flex flex-col gap-0.5">
                      <span>From: {booking.startDate}</span>
                      <span className="text-slate-500">To: {booking.endDate}</span>
                    </div>
                  </td>
                  
                  {/* Duration */}
                  <td className="p-5 text-slate-300 font-mono text-xs font-bold">{booking.totalDays} Days</td>
                  
                  {/* Cost */}
                  <td className="p-5 font-black text-amber-500">${booking.totalCost}</td>
                  
                  {/* Status Badges */}
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

        {/* Mobile Responsive Layout Card System */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {bookings.map((booking) => (
            <motion.div 
              whileHover={{ y: -2 }}
              key={booking.id} 
              className="bg-[#111827] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-14 bg-slate-800 rounded-xl overflow-hidden border border-slate-800 shrink-0">
                  <Image src={booking.image} alt={booking.carName} fill className="object-cover" />
                </div>
                <div>
                  <span className={`inline-flex px-2 py-0.5 border rounded-md text-[9px] font-mono font-bold uppercase tracking-widest mb-1 ${getStatusStyle(booking.status)}`}>
                    {booking.status}
                  </span>
                  <h3 className="text-base font-bold text-white leading-tight">{booking.carName}</h3>
                </div>
              </div>

              <div className="w-full border-t border-slate-800/60" />

              <div className="grid grid-cols-2 gap-y-3 text-xs font-medium text-slate-400">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Booking ID</span>
                  <span className="font-mono text-slate-300 font-bold">{booking.id}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Duration</span>
                  <span className="text-slate-300 font-bold">{booking.totalDays} Days Rate</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] uppercase text-slate-500 block">Schedule Period</span>
                  <span className="text-slate-300 font-semibold">{booking.startDate} <span className="text-slate-600">to</span> {booking.endDate}</span>
                </div>
              </div>

              <div className="w-full border-t border-slate-800/60 pt-3 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-300">Gross Settlement:</span>
                <span className="text-amber-500 font-black text-base">${booking.totalCost}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty Logging Hub Exception Handle */}
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