"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Edit2, Trash2, Plus, AlertTriangle, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "react-toastify";

const MyAddedCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get("/api/cars");
        if (response.data.success) {
          const allCars = response.data.cars || response.data;
          setCars(allCars.filter(car => car.userEmail?.toLowerCase() === user?.email?.toLowerCase()));
        }
      } catch (error) {
        toast.error("Failed to fetch cars");
      } finally {
        setIsLoading(false);
      }
    };
    if (user?.email) fetchCars();
  }, [user?.email]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await axiosInstance.delete(`/api/cars/${deleteTarget._id}`);
      setCars(cars.filter(c => c._id !== deleteTarget._id));
      toast.success("Car deleted successfully");
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setDeleteTarget(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Car className="text-amber-500" /> My <span className="text-amber-500">Added Cars</span>
            </h1>
            <p className="text-slate-400 text-sm">Manage your listed vehicles</p>
          </div>
          <Link href="/add-car" className="bg-amber-500 text-slate-950 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-400 transition">
            <Plus size={18} /> Add New Car
          </Link>
        </div>

        {cars.length > 0 ? (
          <div className="space-y-4">
            {cars.map((car) => (
              <div key={car._id} className="bg-[#111827] border border-slate-800 rounded-2xl p-5 hover:border-amber-500/30 transition-all">
                <div className="flex flex-col md:flex-row gap-5 items-center">
                  <div className="relative w-full md:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={car.image} alt={car.carModel} fill className="object-cover" />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-xs text-slate-500">Car Model</span>
                      <p className="font-bold text-lg">{car.carModel}</p>
                      <span className="text-xs text-slate-500">{car.brand} • {car.type}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500">Daily Price</span>
                      <p className="text-xl font-black text-amber-500">${car.dailyPrice}<span className="text-sm">/day</span></p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500">Status</span>
                      <p>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${car.availability === "Available" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                          {car.availability}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/edit-car/${car._id}`} className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 hover:bg-amber-500/20 transition">
                      <Edit2 size={18} />
                    </Link>
                    <button onClick={() => setDeleteTarget(car)} className="p-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/20 transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#111827] rounded-2xl">
            <Car className="text-slate-600 mx-auto mb-3" size={48} />
            <p className="text-slate-400">No cars added yet.</p>
            <Link href="/add-car" className="inline-block mt-4 bg-amber-500 text-slate-950 px-6 py-2 rounded-xl font-bold">Add Your First Car</Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div onClick={() => setDeleteTarget(null)} className="absolute inset-0 bg-black/80" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-[#111827] border border-red-800 max-w-md w-full rounded-2xl p-6 text-center relative z-10">
              <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
              <h2 className="text-xl font-bold">Delete Car?</h2>
              <p className="text-slate-400 mt-2">Are you sure you want to delete "{deleteTarget.carModel}"? This cannot be undone.</p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2 bg-slate-800 rounded-xl">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-2 bg-red-500 rounded-xl font-bold">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyAddedCarsPage;