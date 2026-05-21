"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FaCar, FaPlus, FaTrashAlt, FaEdit, FaTools, FaCalendarAlt, 
  FaTimes, FaExclamationTriangle, FaSave, FaDollarSign, FaTag 
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const MyAddedCarsPage = () => {
  const { user, loading: authLoading } = useAuth();
  
  // স্টেটস
  const [myCars, setMyCars] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // মডাল এবং অ্যাক্টিভ কার ট্র্যাকিং স্টেটস
  const [activeCar, setActiveCar] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // এডিট ফর্মের লোকাল স্টেটস
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStatus, setEditStatus] = useState("");

  // ১. ডায়নামিকভাবে ইউজারের ইমেইল অনুযায়ী ডেটা ফেচ করা
  useEffect(() => {
    const fetchMyCars = async () => {
      if (!user?.email) return;
      
      try {
        setIsDataLoading(true);
        // আপনার ব্যাকএন্ড এন্ডপয়েন্ট অনুযায়ী ইউজার ইমেইল দিয়ে কুয়েরি করা হলো
        const response = await fetch(`http://localhost:8000/api/cars?email=${user.email}`);
        const data = await response.json();
        
        if (response.ok) {
          setMyCars(data);
        } else {
          toast.error("Failed to load cars data!");
        }
      } catch (err) {
        console.error("Error fetching cars:", err);
        toast.error("Something went wrong while fetching data!");
      } finally {
        setIsDataLoading(false);
      }
    };

    if (!authLoading) {
      fetchMyCars();
    }
  }, [user, authLoading]);

  // ২. ডিলিট লজিক (API Request সহ)
  const openDeleteModal = (car) => {
    setActiveCar(car);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteCar = async () => {
    if (!activeCar) return;

    try {
      // ডেটাবেজ থেকে ডিলিট করার জন্য API কল (ধরে নেওয়া হয়েছে আইডিটি _id ফিল্ডে আছে)
      const response = await fetch(`http://localhost:8000/api/cars/${activeCar._id || activeCar.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the car from database.");
      }

      // UI স্টেট আপডেট
      setMyCars(myCars.filter((car) => (car._id || car.id) !== (activeCar._id || activeCar.id)));
      setIsDeleteModalOpen(false);
      
      toast.success(`🚗 ${activeCar.carModel || activeCar.name} has been removed!`, {
        position: "top-center",
        theme: "dark",
      });
      
      setActiveCar(null);
    } catch (err) {
      toast.error(err.message || "Could not delete vehicle!");
    }
  };

  // ৩. এডিট লজিক (API Request সহ)
  const openEditModal = (car) => {
    setActiveCar(car);
    setEditName(car.carModel || car.name);
    setEditPrice(car.dailyPrice || car.price);
    setEditStatus(car.availability || car.status);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!activeCar) return;

    try {
      const updatedInfo = {
        carModel: editName,
        dailyPrice: Number(editPrice),
        availability: editStatus
      };

      // ডেটাবেজে আপডেট করার জন্য PATCH/PUT API কল
      const response = await fetch(`http://localhost:8000/api/cars/${activeCar._id || activeCar.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to update vehicle details.");
      }

      // UI স্টেট সাথে সাথে ডায়নামিকালি আপডেট
      setMyCars(myCars.map((car) => 
        (car._id || car.id) === (activeCar._id || activeCar.id) 
          ? { ...car, carModel: editName, name: editName, dailyPrice: Number(editPrice), price: Number(editPrice), availability: editStatus, status: editStatus }
          : car
      ));

      setIsEditModalOpen(false);
      
      toast.success(`✏️ ${editName} has been updated successfully!`, {
        position: "top-center",
        theme: "dark",
      });
      
      setActiveCar(null);
    } catch (err) {
      toast.error(err.message || "Could not update vehicle!");
    }
  };

  // অথেনটিকেশন বা ডেটা লোড হওয়ার সময়ের কন্ডিশনাল রেন্ডারিং
  if (authLoading || isDataLoading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Loading Fleet Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Header Action Block */}
        <div className="mb-10 text-center md:text-left border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3 justify-center md:justify-start">
              <FaTools className="text-amber-500 text-2xl" />
              My Added <span className="text-amber-500">Vehicles</span>
            </h1>
            <p className="text-slate-400 mt-2 text-xs sm:text-sm">
              Manage your personal high-end vehicles deployed to the ZippyCar public garage.
            </p>
          </div>
          
          <Link 
            href="/add-car"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md shadow-amber-500/10 cursor-pointer"
          >
            <FaPlus className="text-[10px]" /> Add Another Car
          </Link>
        </div>

        {/* Desktop Data Grid View */}
        {myCars.length > 0 && (
          <div className="hidden md:block bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-5">Car Details</th>
                  <th className="p-5">Date Deployed</th>
                  <th className="p-5">Price / Day</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-center">Management Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm font-medium">
                <AnimatePresence mode="popLayout">
                  {myCars.map((car) => {
                    const carId = car._id || car.id;
                    const name = car.carModel || car.name;
                    const price = car.dailyPrice || car.price;
                    const status = car.availability || car.status;
                    const date = car.dateAdded || new Date(car.createdAt).toLocaleDateString() || "N/A";

                    return (
                      <motion.tr 
                        key={carId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-slate-900/30 transition-colors group"
                      >
                        <td className="p-5 flex items-center gap-4">
                          <div className="relative w-16 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-800 group-hover:border-slate-700 transition-colors">
                            <Image src={car.image} alt={name} fill className="object-cover" unoptimized />
                          </div>
                          <div>
                            <span className="text-white block font-bold group-hover:text-amber-500 transition-colors">{name}</span>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500/70">{car.type}</span>
                          </div>
                        </td>

                        <td className="p-5 text-slate-400 text-xs font-mono">
                          <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-slate-600" /> {date}</span>
                        </td>

                        <td className="p-5 font-black text-amber-500">${price}</td>

                        <td className="p-5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 border rounded-md text-[10px] font-mono font-bold uppercase tracking-wide ${
                            status === "Available" 
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                              : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          }`}>
                            {status}
                          </span>
                        </td>

                        <td className="p-5 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button 
                              onClick={() => openEditModal(car)}
                              className="p-2.5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-amber-500 rounded-xl text-xs transition-all duration-200 cursor-pointer"
                              title="Modify Vehicle Specifications"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              onClick={() => openDeleteModal(car)}
                              className="p-2.5 bg-slate-900 border border-slate-800 hover:border-red-500/40 hover:text-red-400 rounded-xl text-xs transition-all duration-200 cursor-pointer"
                              title="Purge From Fleet"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Responsive Layout */}
        {myCars.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:hidden">
            <AnimatePresence mode="popLayout">
              {myCars.map((car) => {
                const carId = car._id || car.id;
                const name = car.carModel || car.name;
                const price = car.dailyPrice || car.price;
                const status = car.availability || car.status;
                const date = car.dateAdded || new Date(car.createdAt).toLocaleDateString() || "N/A";

                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={carId} 
                    className="bg-[#111827] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-14 bg-slate-800 rounded-xl overflow-hidden border border-slate-800 shrink-0">
                        <Image src={car.image} alt={name} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1">
                        <span className={`inline-flex px-2 py-0.5 border rounded-md text-[9px] font-mono font-bold uppercase tracking-widest mb-1 ${
                          status === "Available" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                        }`}>
                          {status}
                        </span>
                        <h3 className="text-base font-bold text-white leading-tight">{name}</h3>
                      </div>
                    </div>

                    <div className="w-full border-t border-slate-800/60" />

                    <div className="grid grid-cols-2 gap-y-2 text-xs font-medium text-slate-400">
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 block">Rate / Day</span>
                        <span className="text-amber-500 font-bold">${price}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 block">Added On</span>
                        <span className="text-slate-300 font-mono">{date}</span>
                      </div>
                    </div>

                    <div className="w-full border-t border-slate-800/60 pt-3 flex gap-3">
                      <button 
                        onClick={() => openEditModal(car)}
                        className="flex-1 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl hover:border-amber-500/40 hover:text-amber-500 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <FaEdit /> Modify
                      </button>
                      <button 
                        onClick={() => openDeleteModal(car)}
                        className="flex-1 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider rounded-xl hover:border-red-500/30 hover:text-red-400 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {myCars.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-xl"
          >
            <FaCar className="text-slate-700 text-5xl mx-auto mb-4" />
            <p className="text-slate-400 text-sm">You haven't listed any premium vehicles yet.</p>
            <Link 
              href="/add-car"
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
            >
              <FaPlus /> Deploy First Asset
            </Link>
          </motion.div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#111827] border border-red-500/20 max-w-sm w-full rounded-2xl p-6 text-center shadow-2xl z-10 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
              
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-400 mx-auto rounded-full flex items-center justify-center text-xl mb-3">
                <FaExclamationTriangle />
              </div>

              <h2 className="text-xl font-black text-white">Remove Vehicle?</h2>
              <p className="text-xs text-slate-400 mt-2">
                Are you sure you want to purge <span className="text-red-400 font-bold">{activeCar?.carModel || activeCar?.name}</span> from the public fleet? This operation is permanent.
              </p>

              <div className="flex gap-3 mt-5">
                <button 
                  onClick={confirmDeleteCar}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Confirm Delete
                </button>
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl hover:border-slate-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Form Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#111827] border border-slate-800 max-w-md w-full rounded-2xl p-6 shadow-2xl z-10 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <FaTimes className="text-xs" />
              </button>

              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                <FaEdit className="text-amber-500 text-sm" /> Modify Specifications
              </h2>
              <p className="text-[11px] text-slate-400 mt-1">
                Updating asset logs for ID: <span className="font-mono text-amber-500 font-bold">{activeCar?._id || activeCar?.id}</span>
              </p>

              <form onSubmit={handleEditSubmit} className="space-y-4 mt-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vehicle Name</label>
                  <div className="relative">
                    <FaTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-xs" />
                    <input 
                      type="text" 
                      required 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Price Per Day ($)</label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-xs" />
                    <input 
                      type="number" 
                      required 
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 outline-none transition-all font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Availability Status</label>
                  <select 
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-slate-200 outline-none transition-all font-bold tracking-wide cursor-pointer"
                  >
                    <option value="Available">🟢 AVAILABLE</option>
                    <option value="Rented">🔵 RENTED</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/10"
                  >
                    <FaSave /> Save Changes
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl hover:border-slate-700 transition-all cursor-pointer"
                  >
                    Discard
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MyAddedCarsPage;