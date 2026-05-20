"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence added for smooth hide/show
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaArrowLeft, FaImage } from "react-icons/fa";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Field-specific error and server error states
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const router = useRouter();

  // Custom UI validation function
  const validateForm = () => {
    const errors = {};
    
    if (!name.trim()) {
      errors.name = "Full Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess("");
    
    const isValid = validateForm();
    if (!isValid) return; 

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, photoURL }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      setSuccess(data.message || "Registration successful!");
      
      // Clearing state
      setName("");
      setPhotoURL(""); 
      setEmail("");
      setPassword("");
      setFieldErrors({});

      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden select-none">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-2xl z-10"
      >
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-amber-500 transition-colors mb-6 group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Create <span className="text-amber-500">Account</span>
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Join ZippyCar today to unlock premium rentals instantly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} noValidate className="space-y-5">
          
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={`w-full bg-slate-900/60 border ${fieldErrors.name ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-amber-500/50'} rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200`}
              />
            </div>
            {fieldErrors.name && (
              <p className="text-xs text-red-400 font-medium pl-1">{fieldErrors.name}</p>
            )}
          </div>

          {/* Profile Image URL Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Profile Image URL</label>
            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
              <input 
                type="url" 
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/your-photo.jpg"
                className="w-full bg-slate-900/60 border border-slate-800 focus:border-amber-500/50 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={`w-full bg-slate-900/60 border ${fieldErrors.email ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-amber-500/50'} rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200`}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-xs text-red-400 font-medium pl-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-slate-900/60 border ${fieldErrors.password ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-amber-500/50'} rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200`}
              />
            </div>
            {fieldErrors.password && (
              <p className="text-xs text-red-400 font-medium pl-1">{fieldErrors.password}</p>
            )}
          </div>

          {/* —————————————————————————————————————————————————————————— */}
          {/* Custom message area just above the button (with animation) */}
          {/* —————————————————————————————————————————————————————————— */}
          <AnimatePresence mode="wait">
            {/* If an error comes from the backend */}
            {serverError && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
                <span>{serverError}</span>
              </motion.div>
            )}

            {/* If registration is successful */}
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl font-medium flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button 
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit" 
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/10 mt-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Registering..." : "Sign Up"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute w-full border-t border-slate-800" />
          <span className="relative bg-[#111827] px-3 text-xs text-slate-500 uppercase tracking-widest">Or Register With</span>
        </div>

        {/* Google Login */}
        <motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-md"
        >
          <FaGoogle className="text-amber-500" /> Google Account
        </motion.button>

        {/* Redirect Link */}
        <p className="text-center text-sm text-slate-400 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-500 font-bold hover:underline">
            Login Here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;