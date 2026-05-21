"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FaCar, FaTrashAlt, FaEdit, FaTools, FaTimes, FaUser
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const MyAddedCarsPage = () => {
  const { user, loading: authLoading } = useAuth();
  
  const [allCars, setAllCars] = useState([]);
  const [myCars, setMyCars] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [activeCar, setActiveCar] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStatus, setEditStatus] = useState("");
  
  console.log(myCars)

  // Helper function to validate image URL
  const isValidImageUrl = (url) => {
    if (!url) return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  // Helper function to get safe image URL
  const getSafeImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return null;
  };

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        setIsDataLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars`);
        const data = await response.json();
        if (response.ok) setAllCars(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setIsDataLoading(false);
      }
    };
    if (!authLoading) fetchAllCars();
  }, [authLoading]);

  useEffect(() => {
    if (user?.email && allCars.length > 0) {
      setMyCars(allCars.filter((car) => car.userEmail?.toLowerCase() === user.email?.toLowerCase()));
    }
  }, [user?.email, allCars]);

  const confirmDeleteCar = async () => {
    if (!activeCar) return;
    const carId = activeCar._id || activeCar.id;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${carId}`, { method: "DELETE" });
      setMyCars(myCars.filter((car) => (car._id || car.id) !== carId));
      setIsDeleteModalOpen(false);
      toast.success("Car removed successfully!");
    } catch (err) {
      toast.error("Delete failed!");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!activeCar) return;
    const carId = activeCar._id || activeCar.id;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${carId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carModel: editName, dailyPrice: Number(editPrice), availability: editStatus }),
      });
      setMyCars(myCars.map(c => (c._id || c.id) === carId ? { ...c, carModel: editName, dailyPrice: Number(editPrice), availability: editStatus } : c));
      setIsEditModalOpen(false);
      toast.success("Updated successfully!");
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  const handleImageError = (carId) => {
    setImageErrors(prev => ({ ...prev, [carId]: true }));
  };

  if (authLoading || isDataLoading) return <div className="min-h-screen flex items-center justify-center bg-[#090d16] text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-28 px-6">
      <ToastContainer theme="dark" />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaTools className="text-amber-500" /> My Added Vehicles
        </h1>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase">
                <th className="p-5">Car Details</th>
                <th className="p-5">Price / Day</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCars.map((car) => {
                const safeImageUrl = getSafeImageUrl(car.image);
                const hasImageError = imageErrors[car._id];
                
                return (
                  <tr key={car._id} className="border-b border-slate-800">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div>
                          {safeImageUrl && !hasImageError ? (
                            <Image
                              src={safeImageUrl} 
                              alt={car.carModel} 
                              width={100} 
                              height={60} 
                              className="object-cover rounded"
                              onError={() => handleImageError(car._id)}
                              style={{ width: '100px', height: '60px' }}
                            />
                          ) : (   
                            <div className="w-24 h-16 bg-slate-700 flex items-center justify-center rounded">
                              <FaCar className="text-slate-400 text-2xl" />
                            </div>
                          )}  
                        </div>
                        <div className="font-bold">
                          {car.carModel}
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-amber-500 font-black">${car.dailyPrice}</td>
                    <td className="p-5 text-emerald-400">{car.availability}</td>
                    <td className="p-5 text-center">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => { 
                            setActiveCar(car); 
                            setEditName(car.carModel); 
                            setEditPrice(car.dailyPrice); 
                            setEditStatus(car.availability); 
                            setIsEditModalOpen(true); 
                          }} 
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => { 
                            setActiveCar(car); 
                            setIsDeleteModalOpen(true); 
                          }} 
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <FaTrashAlt size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {myCars.length === 0 && (
          <div className="text-center py-12 bg-[#111827] rounded-2xl mt-4">
            <FaCar className="text-4xl text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No cars added yet. Start adding your vehicles!</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleEditSubmit} className="bg-slate-900 p-8 rounded-xl border border-slate-700 w-full max-w-md">
            <h2 className="text-2xl mb-6 font-bold">Edit Car</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Car Model</label>
                <input 
                  className="w-full p-3 bg-slate-800 rounded-lg text-white border border-slate-700 focus:border-amber-500 focus:outline-none" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Daily Price ($)</label>
                <input 
                  className="w-full p-3 bg-slate-800 rounded-lg text-white border border-slate-700 focus:border-amber-500 focus:outline-none" 
                  type="number" 
                  value={editPrice} 
                  onChange={(e) => setEditPrice(e.target.value)} 
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Status</label>
                <select 
                  className="w-full p-3 bg-slate-800 rounded-lg text-white border border-slate-700 focus:border-amber-500 focus:outline-none"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button 
                type="button" 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-amber-500 px-6 py-2 rounded-lg text-black font-bold hover:bg-amber-400 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 p-8 rounded-xl border border-red-900 w-full max-w-md text-center">
            <FaTimes className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Delete Car</h3>
            <p className="mb-6 text-slate-300">Are you sure you want to delete this car? This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteCar} 
                className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedCarsPage;