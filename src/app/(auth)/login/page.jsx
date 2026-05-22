"use client";



import React, { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { Mail, Lock, LogIn, Car } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import axiosInstance from "@/api/axiosInstance";

import { toast } from "react-toastify";

import GoogleLogin from "@/Components/GoogleLogin";



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

        if (response.data.token) localStorage.setItem("token", response.data.token);

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

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-2xl z-10">

        <div className="text-center mb-8">

          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">

            <Car className="text-amber-500" size={28} />

          </div>

          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>

        </div>



        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative group">

            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500" size={18} />

            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-3.5 text-white outline-none transition-all" placeholder="Email Address" />

          </div>

          <div className="relative group">

            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500" size={18} />

            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl pl-10 pr-4 py-3.5 text-white outline-none transition-all" placeholder="Password" />

          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">

            {isLoading ? <span className="animate-spin h-5 w-5 border-2 border-slate-950 border-t-transparent rounded-full" /> : <><LogIn size={18} /> Login</>}

          </button>

         

        </form>



        <div className="relative my-6 text-center text-slate-500 text-xs">Or continue with</div>

       

<div className="relative my-6">

  <div className="absolute inset-0 flex items-center">

    <div className="w-full border-t border-slate-700"></div>

  </div>

  <div className="relative flex justify-center text-xs">

    <span className="bg-[#111827] px-3 text-slate-400">Or continue with</span>

  </div>

</div>



<GoogleLogin />



<div className="mt-6 text-center text-xs text-slate-500">

  By continuing, you agree to ZippyCar's

  <Link href="/terms" className="text-amber-500 hover:underline mx-1">Terms</Link>

  and

  <Link href="/privacy" className="text-amber-500 hover:underline ml-1">Privacy Policy</Link>

</div>

        <GoogleLogin />

        <p className="text-center text-slate-400 text-sm mt-6">

          Don't have an account? <Link href="/register" className="text-amber-500 font-semibold cursor-pointer">Create Account</Link>

        </p>

      </motion.div>

    </div>

  );

};



export default LoginPage;