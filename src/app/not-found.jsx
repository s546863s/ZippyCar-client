"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCarCrash, FaArrowLeft, FaHome } from "react-icons/fa";

const NotFound = () => {
  // Animation presets for standard Tailwind v3 compilation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none py-4">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <motion.div
        className="max-w-md w-full text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Icon Wrapper */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex p-6 bg-slate-900 border border-slate-800 rounded-3xl text-amber-500 mb-6 shadow-xl relative group cursor-pointer"
          whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          <FaCarCrash size={64} className="group-hover:text-amber-400 transition-colors" />
          <span className="absolute -top-2 -right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
        </motion.div>

        {/* Big 404 Header */}
        <motion.h1 
          variants={itemVariants}
          className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 select-none"
        >
          404
        </motion.h1>

        {/* Error Messages */}
        <motion.h2 
          variants={itemVariants}
          className="text-xl sm:text-2xl font-bold mt-4 text-white"
        >
          Oops! Wrong Turn.
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="text-sm text-slate-400 mt-3 leading-relaxed"
        >
          The luxury ride or page you are looking for has been moved, deleted, or never existed in our fleet system. Let's get you back on track.
        </motion.p>

        {/* Dynamic Navigation Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-600 text-slate-200 text-sm font-semibold rounded-xl transition-all duration-300 active:scale-95 cursor-pointer shadow-lg"
          >
            <FaArrowLeft className="text-xs" />
            Go Back
          </button>

          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-amber-500/20"
          >
            <FaHome className="text-sm" />
            Back to Home
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default NotFound;