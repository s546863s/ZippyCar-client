"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, Car, LogOut, PlusCircle, Briefcase } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; 
import ZippyCarLogo from "./CarLogo/ZippyCarLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { user, logoutContext, loading } = useAuth();
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const isActive = (route) => pathname === route;

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/logout", { 
        method: 'POST', 
        credentials: 'include' 
      });
      
      if (res.ok) {
        logoutContext(); 
        setIsProfileOpen(false);
        setIsOpen(false);
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Cars", path: "/cars" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0f172a]/95 backdrop-blur-md border-b border-[#334155] z-50 transition-all duration-300 select-none shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className="flex items-center space-x-2 focus:outline-none">
            <ZippyCarLogo />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-[#f59e0b] font-semibold"
                    : "text-[#94a3b8] hover:text-[#ffffff]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 relative" ref={dropdownRef}>
            {loading ? (
              <div className="text-slate-500 text-sm">Loading...</div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 bg-[#1e293b] border border-[#334155] hover:border-[#f59e0b] px-4 py-2 rounded-full text-[#ffffff] transition-all duration-300 focus:outline-none cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#f59e0b] flex items-center justify-center text-black font-bold text-xs uppercase">
                    {user.name ? user.name.charAt(0) : "U"}
                  </div>
                  <span className="text-sm max-w-[120px] truncate">{user.name}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#0f172a] border border-[#334155] rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#334155]">
                      <p className="text-xs text-[#94a3b8]">Logged in as</p>
                      <p className="text-sm font-semibold text-[#ffffff] truncate">{user.email}</p>
                    </div>
                    
                    <Link
                      href="/add-car"
                      className="flex items-center space-x-2 px-4 py-2.5 text-sm text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <PlusCircle size={16} />
                      <span>Add Car</span>
                    </Link>
                    
                    <Link
                      href="/my-bookings"
                      className="flex items-center space-x-2 px-4 py-2.5 text-sm text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Briefcase size={16} />
                      <span>My Bookings</span>
                    </Link>

                    <Link
                      href="/my-added-cars"
                      className="flex items-center space-x-2 px-4 py-2.5 text-sm text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f59e0b] transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Car size={16} />
                      <span>My Added Cars</span>
                    </Link>

                    <div className="border-t border-[#334155] mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-red-400 hover:bg-[#1e293b] transition-colors text-left"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#f59e0b] text-[#000000] font-bold text-sm tracking-wide uppercase px-6 py-2.5 rounded-lg hover:bg-[#d97706] transition-all duration-300 shadow-md shadow-[#f59e0b]/20"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#94a3b8] hover:text-[#ffffff] p-2 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0f172a] border-b border-[#334155] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? "bg-[#1e293b] text-[#f59e0b]"
                  : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#ffffff]"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {!loading && (
            user ? (
              <div className="pt-4 border-t border-[#334155] space-y-1">
                <div className="px-3 py-2 text-sm text-[#ffffff] font-semibold bg-[#1e293b] rounded-md mb-2 truncate">
                  {user.name} ({user.email})
                </div>
                <Link
                  href="/add-car"
                  className="block px-3 py-2 text-base font-medium text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f59e0b]"
                  onClick={() => setIsOpen(false)}
                >
                  Add Car
                </Link>
                <Link
                  href="/my-bookings"
                  className="block px-3 py-2 text-base font-medium text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f59e0b]"
                  onClick={() => setIsOpen(false)}
                >
                  My Bookings
                </Link>
                <Link
                  href="/my-added-cars"
                  className="block px-3 py-2 text-base font-medium text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f59e0b]"
                  onClick={() => setIsOpen(false)}
                >
                  My Added Cars
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 text-base font-medium text-red-400 hover:bg-[#1e293b]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-[#334155]">
                <Link
                  href="/login"
                  className="block text-center bg-[#f59e0b] text-[#000000] font-bold px-4 py-2.5 rounded-lg text-base tracking-wide uppercase"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;