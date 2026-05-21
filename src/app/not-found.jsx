"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Car, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }} className="w-32 h-32 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Car className="text-amber-500" size={48} />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-8xl font-black bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">404</motion.h1>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl font-bold mt-4">Page Not Found</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-400 mt-2">The page you're looking for doesn't exist or has been moved.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-4 justify-center mt-8">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 px-5 py-2.5 border border-slate-700 rounded-xl hover:bg-slate-800 transition"><ArrowLeft size={16} /> Go Back</button>
          <Link href="/" className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 rounded-xl font-bold hover:bg-amber-400 transition"><Home size={16} /> Home</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;