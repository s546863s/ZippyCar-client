"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Car, Save, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "react-toastify";
import Image from "next/image";

const EditCarPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    carModel: "",
    brand: "",
    type: "",
    dailyPrice: "",
    transmission: "",
    fuel: "",
    seats: "",
    vehicleNumber: "",
    image: "",
    description: "",
    availability: "Available"
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axiosInstance.get(`/api/cars/${id}`);
        if (response.data.success) {
          const car = response.data.car;
          if (car.userEmail !== user?.email) {
            toast.error("You don't have permission to edit this car");
            router.push("/my-added-cars");
            return;
          }
          setFormData({
            carModel: car.carModel || "",
            brand: car.brand || "",
            type: car.type || "",
            dailyPrice: car.dailyPrice || "",
            transmission: car.transmission || "",
            fuel: car.fuel || "",
            seats: car.seats || "",
            vehicleNumber: car.vehicleNumber || "",
            image: car.image || "",
            description: car.description || "",
            availability: car.availability || "Available"
          });
        }
      } catch (error) {
        toast.error("Failed to load car details");
        router.push("/my-added-cars");
      } finally {
        setIsLoading(false);
      }
    };
    if (id && user?.email) fetchCar();
  }, [id, user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axiosInstance.patch(`/api/cars/${id}`, formData);
      if (response.data.success) {
        toast.success("Car updated successfully!");
        router.push("/my-added-cars");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update car");
    } finally {
      setIsSubmitting(false);
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
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111827] border border-slate-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <Car className="text-amber-500" size={28} />
            <h1 className="text-2xl font-bold">Edit Car: <span className="text-amber-500">{formData.carModel}</span></h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Car Model *</label>
                <input type="text" name="carModel" value={formData.carModel} onChange={handleChange} required className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Brand *</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Car Type *</label>
                <select name="type" value={formData.type} onChange={handleChange} required className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none">
                  <option value="">Select Type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Sports">Sports</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Daily Price ($) *</label>
                <input type="number" name="dailyPrice" value={formData.dailyPrice} onChange={handleChange} required min="0" className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Transmission *</label>
                <select name="transmission" value={formData.transmission} onChange={handleChange} required className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none">
                  <option value="">Select</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Fuel Type *</label>
                <select name="fuel" value={formData.fuel} onChange={handleChange} required className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none">
                  <option value="">Select</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Seats *</label>
                <input type="number" name="seats" value={formData.seats} onChange={handleChange} required min="1" max="15" className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Vehicle Number *</label>
                <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} required className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Image URL *</label>
                <input type="url" name="image" value={formData.image} onChange={handleChange} required className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none" />
                {formData.image && (
                  <div className="mt-2 relative h-32 w-full rounded-xl overflow-hidden">
                    <Image src={formData.image} alt="Car preview" fill className="object-cover" />
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Availability</label>
                <select name="availability" value={formData.availability} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none">
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-800">
              <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition flex items-center gap-2 disabled:opacity-50">
                <Save size={18} /> {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" onClick={() => router.back()} className="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition flex items-center gap-2">
                <X size={18} /> Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditCarPage;