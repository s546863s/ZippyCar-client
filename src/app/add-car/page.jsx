"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Car,
  DollarSign,
  Settings,
  Fuel,
  Users,
  Image,
  AlignLeft,
  Plus,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "react-toastify";

const AddCarPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    carModel: "",
    brand: "",
    type: "Sedan",
    dailyPrice: "",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: "4",
    availability: "Available",
    vehicleNumber: "",
    image: "",
    description: "",
    userEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, image: url }));
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("Please login to add a car!");
      router.push("/login");
      return;
    }

    setIsLoading(true);
    const submitData = {
      ...formData,
      userEmail: user.email,
      dailyPrice: Number(formData.dailyPrice),
      seats: Number(formData.seats),
    };

    try {
      const response = await axiosInstance.post("/api/cars/add", submitData);
      if (response.data.success) {
        toast.success("Car added successfully!");
        router.push("/my-added-cars");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add car!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Add New <span className="text-amber-500">Vehicle</span>
          </h1>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4">
            List your car for rent on ZippyCar platform
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-[#111827] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Car Model *
              </label>
              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none"
                placeholder="Toyota Camry"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none"
                placeholder="Toyota"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Car Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
              >
                <option>Sedan</option>
                <option>SUV</option>
                <option>Hatchback</option>
                <option>Luxury</option>
                <option>Sports</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Daily Price ($) *
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="number"
                  name="dailyPrice"
                  value={formData.dailyPrice}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-3 text-white outline-none"
                  placeholder="50"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Transmission
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
              >
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Fuel Type
              </label>
              <select
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
              >
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Seats
              </label>
              <select
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
              >
                <option>2</option>
                <option>4</option>
                <option>5</option>
                <option>7</option>
                <option>8</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Vehicle Number *
              </label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none"
                placeholder="DHAKA-1234"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Image URL *
            </label>
            <div className="relative">
              <Image
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleImageChange}
                required
                className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-3 text-white outline-none"
                placeholder="https://example.com/car-image.jpg"
              />
            </div>
          </div>

          {imagePreview && (
            <div className="relative h-48 rounded-xl overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none resize-none"
              placeholder="Describe the car features, condition, etc."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Plus size={18} />{" "}
            {isLoading ? "Adding Car..." : "Add Car to Fleet"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default AddCarPage;
