"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Car, Clock, CheckCircle, XCircle, Receipt, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/api/axiosInstance";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) return;
      try {
        const response = await axiosInstance.get(`/api/bookings/my-bookings?email=${user.email}`);
        if (response.data.success) {
          setBookings(response.data.bookings || []);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!authLoading) fetchBookings();
  }, [user?.email, authLoading]);

  const getStatusStyle = (status) => {
    if (status === "Confirmed") return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
    if (status === "Pending") return "bg-amber-500/10 border-amber-500/20 text-amber-400";
    return "bg-slate-800 border-slate-700 text-slate-400";
  };

  const getStatusIcon = (status) => {
    if (status === "Confirmed") return <CheckCircle size={12} />;
    if (status === "Pending") return <Clock size={12} className="animate-pulse" />;
    return <XCircle size={12} />;
  };

  if (authLoading || isLoading) {
    return (<div className="min-h-screen bg-[#090d16] flex items-center justify-center"><div className="w-12 h-12 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin" /></div>);
  }

  if (!user) {
    return (<div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center gap-4"><AlertCircle className="text-amber-500" size={48} /><p className="text-slate-300">Please login to view your bookings.</p><Link href="/login" className="bg-amber-500 text-slate-950 px-6 py-2 rounded-xl font-bold">Login</Link></div>);
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center border-b border-slate-800 pb-4">
          <div><h1 className="text-3xl font-bold flex items-center gap-2"><Calendar className="text-amber-500" /> My <span className="text-amber-500">Bookings</span></h1><p className="text-slate-400 text-sm mt-1">Track your rental history</p></div>
          <div className="text-sm bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full">Total: {bookings.length}</div>
        </div>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div key={booking._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="bg-[#111827] border border-slate-800 rounded-2xl p-5 hover:border-amber-500/30 transition-all">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="relative w-full md:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0"><Image src={booking.image} alt={booking.carModel} fill className="object-cover" /></div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div><span className="text-xs text-slate-500">Vehicle</span><p className="font-bold text-lg">{booking.carModel}</p></div>
                    <div><span className="text-xs text-slate-500">Period</span><p className="text-sm">{booking.startDate} → {booking.endDate}</p><span className="text-xs text-slate-500">{booking.duration} days</span></div>
                    <div><span className="text-xs text-slate-500">Total Price</span><p className="text-xl font-black text-amber-500">${booking.totalPrice}</p></div>
                    <div><span className="text-xs text-slate-500">Status</span><div><span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(booking.status)}`}>{getStatusIcon(booking.status)} {booking.status}</span></div></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#111827] rounded-2xl"><Car className="text-slate-600 mx-auto mb-3" size={48} /><p className="text-slate-400">No bookings yet.</p><Link href="/cars" className="inline-block mt-4 bg-amber-500 text-slate-950 px-6 py-2 rounded-xl font-bold">Explore Cars</Link></div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;