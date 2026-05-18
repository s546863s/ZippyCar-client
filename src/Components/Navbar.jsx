"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.35)]">

      {/* Soft overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white/[0.02]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center focus:outline-none"
          >
            <div className="transition-all duration-300 group-hover:scale-[1.02]">
              <ZippyCarLogo />
            </div>
          </Link>

          {/* Desktop Menu */}
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
                {link.name}

                {isActive(link.path) && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-400" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop User Menu */}
          <div
            className="relative hidden items-center md:flex"
            ref={dropdownRef}
          >
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="group flex cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white backdrop-blur-md transition-all duration-300 hover:border-amber-400/40 hover:bg-white/10 hover:shadow-lg hover:shadow-amber-500/10"
                >
                  {/* Avatar */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-black shadow-md">
                    {user.name.charAt(0)}
                  </div>

                  <span className="max-w-[140px] truncate text-sm font-medium text-slate-200">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 animate-in fade-in zoom-in-95 duration-200">

                    {/* User Info */}
                    <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
                      <p className="text-xs uppercase tracking-wider text-slate-400">
                        Logged in as
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-white">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">

                      <Link
                        href="/add-car"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-amber-400"
                      >
                        <FaPlusCircle className="text-base" />
                        <span>Add Car</span>
                      </Link>

                      <Link
                        href="/my-bookings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-amber-400"
                      >
                        <FaBriefcase className="text-base" />
                        <span>My Bookings</span>
                      </Link>

                      <Link
                        href="/my-added-cars"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-amber-400"
                      >
                        <FaCar className="text-base" />
                        <span>My Added Cars</span>
                      </Link>

                      <div className="my-2 border-t border-white/10" />

                      <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300">
                        <FaSignOutAlt className="text-base" />
                        <span>Logout</span>
                      </button>

                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-black shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-105 hover:bg-amber-500"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 backdrop-blur-xl md:hidden animate-in slide-in-from-top-2 duration-300">

          <div className="space-y-2 px-4 py-5">

            {navLinks.map((link) => (
              <Link
                key={link.path}
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
            ))}

            {user ? (
              <div className="mt-4 space-y-2 border-t border-white/10 pt-4">

                {/* Mobile User Info */}
                <div className="rounded-xl bg-white/5 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-white">
                    {user.name}
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    {user.email}
                  </p>
                </div>

                <Link
                  href="/add-car"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/5 hover:text-amber-400"
                >
                  <FaPlusCircle />
                  <span>Add Car</span>
                </Link>

                <Link
                  href="/my-bookings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/5 hover:text-amber-400"
                >
                  <FaBriefcase />
                  <span>My Bookings</span>
                </Link>

                <Link
                  href="/my-added-cars"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-white/5 hover:text-amber-400"
                >
                  <FaCar />
                  <span>My Added Cars</span>
                </Link>

                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 transition-all duration-300 hover:bg-red-500/10">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>

              </div>
            ) : (
              <div className="mt-4 border-t border-white/10 pt-4">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl bg-amber-400 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-black shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] hover:bg-amber-500"
                >
                  Login
                </Link>
              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;