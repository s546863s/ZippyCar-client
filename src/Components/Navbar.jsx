"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaCar, FaSignOutAlt, FaPlusCircle, FaBriefcase } from "react-icons/fa";

import ZippyCarLogo from "./CarLogo/ZippyCarLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const isActive = (route) => pathname === route;

  const user = {
    name: "Md. Abdus Salam",
    email: "salam@example.com",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Cars", path: "/cars" },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.1, ease: "easeIn" } }
  };

  const mobileContainerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { height: { duration: 0.3, ease: "easeOut" }, staggerChildren: 0.05, delayChildren: 0.05 } },
    exit: { opacity: 0, height: 0, transition: { height: { duration: 0.2, ease: "easeIn" }, opacity: { duration: 0.1 } } }
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    /* Fixed: backdrop-blur-xl (v3 standard) */
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.35)] select-none">
      <div className="pointer-events-none absolute inset-0 bg-white/[0.02]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Fixed: focus:outline-none (v3 standard) instead of focus:outline-hidden */}
          <Link href="/" className="group flex items-center focus:outline-none">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="transition-all duration-300">
              <ZippyCarLogo />
            </motion.div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-amber-400/10 text-amber-400 shadow-lg shadow-amber-500/10"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="relative z-10">{link.name}</span>

                {isActive(link.path) && (
                  <motion.span 
                    layoutId="activePillMarker"
                    className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="relative hidden items-center md:flex" ref={dropdownRef}>
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  whileTap={{ scale: 0.98 }}
                  className="group flex cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white backdrop-blur-md transition-all duration-300 hover:border-amber-400/40 hover:bg-white/10 hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-black shadow-md select-none">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[140px] truncate text-sm font-medium text-slate-200">
                    {user.name}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-4 w-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/40"
                    >
                      <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
                        <p className="text-xs uppercase tracking-wider text-slate-400">Logged in as</p>
                        <p className="mt-1 truncate text-sm font-semibold text-white">{user.email}</p>
                      </div>

                      <div className="p-2">
                        {[
                          { name: "Add Car", path: "/add-car", icon: <FaPlusCircle /> },
                          { name: "My Bookings", path: "/my-bookings", icon: <FaBriefcase /> },
                          { name: "My Added Cars", path: "/my-added-cars", icon: <FaCar /> }
                        ].map((item) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-amber-400"
                          >
                            <span className="text-base">{item.icon}</span>
                            <span>{item.name}</span>
                          </Link>
                        ))}

                        <div className="my-2 border-t border-white/10" />

                        <button className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300">
                          <FaSignOutAlt className="text-base" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/login"
                  className="rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-black shadow-lg shadow-amber-500/20 transition-all duration-300 hover:bg-amber-500"
                >
                  Login
                </Link>
              </motion.div>
            )}
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </motion.button>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={mobileContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-t border-white/10 bg-slate-950/95 backdrop-blur-xl md:hidden overflow-hidden"
          >
            <div className="space-y-2 px-4 py-5">
              {navLinks.map((link) => (
                <motion.div key={link.path} variants={mobileItemVariants}>
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 ${
                      isActive(link.path)
                        ? "bg-amber-400/10 text-amber-400"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {user ? (
                <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  <motion.div variants={mobileItemVariants} className="rounded-xl bg-white/5 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                    <p className="truncate text-xs text-slate-400">{user.email}</p>
                  </motion.div>

                  {[
                    { name: "Add Car", path: "/add-car", icon: <FaPlusCircle /> },
                    { name: "My Bookings", path: "/my-bookings", icon: <FaBriefcase /> },
                    { name: "My Added Cars", path: "/my-added-cars", icon: <FaCar /> }
                  ].map((item) => (
                    <motion.div key={item.path} variants={mobileItemVariants}>
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/5 hover:text-amber-400"
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div variants={mobileItemVariants}>
                    <button className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 transition-all duration-300 hover:bg-red-500/10">
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </div>
              ) : (
                <motion.div variants={mobileItemVariants} className="mt-4 border-t border-white/10 pt-4">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl bg-amber-400 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-black shadow-lg shadow-amber-500/20 transition-all duration-300 hover:bg-amber-500"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;