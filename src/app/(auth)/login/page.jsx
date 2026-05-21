"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Car } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axiosInstance.post("/api/auth/login", { email, password });
      
      if (response.data.success) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        setUser(response.data.user);
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-2xl z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Car className="text-amber-500 text-2xl" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400 text-sm mt-2">Sign in to your ZippyCar account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-3 text-white outline-none transition-colors" placeholder="your@email.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-3 text-white outline-none transition-colors" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50">
            <LogIn size={18} /> {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Don't have an account? <Link href="/register" className="text-amber-500 hover:text-amber-400 font-semibold">Create Account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;