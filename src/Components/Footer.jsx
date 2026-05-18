"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import ZippyCarLogo from "./CarLogo/ZippyCarLogo";

const Footer = () => {
  return (
    <footer className="bg-[#090d16] border-t border-[#1e293b] text-[#94a3b8] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
           <Link href={'/'} >
           <ZippyCarLogo />
           </Link>
          </div>
          <p className="text-sm leading-relaxed">
            Experience premium mobility with Bangladesh's ultimate car rental solution. Fast setup, stylish choices, and robust reliability tailored just for you.
          </p>
          
          <div className="flex space-x-4 pt-2">
            <a href="#" className="p-2.5 bg-[#1e293b] text-white hover:text-[#f59e0b] rounded-lg transition-colors duration-300">
              <FaFacebook size={16} />
            </a>
            <a href="#" className="p-2.5 bg-[#1e293b] text-white hover:text-[#f59e0b] rounded-lg transition-colors duration-300">
              <FaTwitter size={16} />
            </a>
            <a href="#" className="p-2.5 bg-[#1e293b] text-white hover:text-[#f59e0b] rounded-lg transition-colors duration-300">
              <FaInstagram size={16} />
            </a>
            <a href="#" className="p-2.5 bg-[#1e293b] text-white hover:text-[#f59e0b] rounded-lg transition-colors duration-300">
              <FaLinkedin size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-base tracking-wider uppercase mb-6 border-l-2 border-[#f59e0b] pl-3">
            Useful Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-white hover:underline transition-all">Home Dashboard</Link></li>
            <li><Link href="/cars" className="hover:text-white hover:underline transition-all">Explore Available Fleet</Link></li>
            <li><Link href="/login" className="hover:text-white hover:underline transition-all">Join / Register Account</Link></li>
            <li><Link href="/about" className="hover:text-white hover:underline transition-all">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-base tracking-wider uppercase mb-6 border-l-2 border-[#f59e0b] pl-3">
            Our Fleet Class
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Luxury Sports Sedan</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Offroad Luxury SUV</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Efficient City Hatchback</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Family Multi-purpose MPV</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-base tracking-wider uppercase mb-6 border-l-2 border-[#f59e0b] pl-3">
            Contact Info
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-[#f59e0b] shrink-0 mt-1" size={16} />
              <span>Sona Dighi Square, Rajshahi Division, Bangladesh</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhone className="text-[#f59e0b] shrink-0" size={16} />
              <span>+880 1712-345678</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-[#f59e0b] shrink-0" size={16} />
              <span>support@zippycar.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-[#1e293b] text-center text-xs">
        <p>&copy; {new Date().getFullYear()} ZippyCar Platform. Built with Passion. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;