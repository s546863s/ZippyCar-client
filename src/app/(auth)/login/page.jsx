"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaGoogle, FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Custom UI validation function
  const validateForm = () => {
    const errors = {};
    
    if (!email.trim()) {
      errors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle standard credentials login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const isValid = validateForm();
    if (!isValid) {
      // Show colorful error toast if form validation fails
      toast.error("Please fix the errors in the form!"); 
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Essential for receiving and storing httpOnly cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password!");
      }

      // Show bright and colorful success toast on successful login
      toast.success("Login successful! Welcome back.");
    
      // Clear form states safely
      setEmail("");
      setPassword("");
      setFieldErrors({});

      // Allow toast animation to finish before handling page redirect and hard refresh
      setTimeout(() => {
        window.location.href = "/"; // Force a full reload to reset auth contexts/navbar states globally
      }, 1500);

    } catch (err) {
      // Show bright red toast for any backend or server errors
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google OAuth authentication trigger
  const handleGoogleAuth = () => {
    // Redirects the client window directly to the backend Google login gateway
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden select-none">
      
      {/* Toast container configuration using explicit colored theme */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        theme="colored" 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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
            Welcome <span className="text-amber-500">Back</span>
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Enter your credentials to access your luxury garage.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} noValidate className="space-y-5">
          
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
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Password</label>
              <a href="#" className="text-xs text-amber-500/80 hover:text-amber-400 transition-colors">Forgot?</a>
            </div>
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

          {/* Submit Button */}
          <motion.button  
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit" 
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/10 mt-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute w-full border-t border-slate-800" />
          <span className="relative bg-[#111827] px-3 text-xs text-slate-500 uppercase tracking-widest">Or Continue With</span>
        </div>

        {/* Google Login Button */}
        <motion.button  
          whileTap={{ scale: 0.98 }}
          type="button" // Explicitly explicitly defined to avoid triggers with form submission
          onClick={handleGoogleAuth}
          className="w-full py-3.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-md"
        >
          <FaGoogle className="text-amber-500" /> Google Account
        </motion.button>

        {/* Redirect Link */}
        <p className="text-center text-sm text-slate-400 mt-8">
          Don't have an account?{" "}
          <Link href="/register" className="text-amber-500 font-bold hover:underline">
            Register Here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;