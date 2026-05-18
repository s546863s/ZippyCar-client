"use client";

import React from "react";
import Link from "next/link";
// Framer Motion for smooth scroll entry animations
import { motion } from "framer-motion";
// Restored robust React Icons for bulletproof build compatibility
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ZippyCarLogo from "./CarLogo/ZippyCarLogo";

const Footer = () => {
  // Container staggered animation variants
  const footerContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      }
    }
  };

  const footerItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <footer className="bg-[#090d16] border-t border-slate-800 text-slate-400 pt-16 pb-8 overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        variants={footerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        
        {/* Column 1: Brand Profile & Socials */}
        <motion.div variants={footerItemVariants} className="space-y-4">
          <div className="flex items-center">
            <Link href="/" className="inline-block transform-gpu hover:opacity-90 transition-opacity">
              <ZippyCarLogo />
            </Link>
          </div>
          <p className="text-sm leading-relaxed text-pretty">
            Experience premium mobility with Bangladesh's ultimate car rental solution. Fast setup, stylish choices, and robust reliability tailored just for you.
          </p>
          
          {/* Social Icons Link Grid (React Icons Fixed) */}
          <div className="flex space-x-3 pt-2">
            {[
              { icon: <FaFacebookF size={16} />, url: "#" },
              { icon: <FaTwitter size={16} />, url: "#" },
              { icon: <FaInstagram size={16} />, url: "#" },
              { icon: <FaLinkedinIn size={16} />, url: "#" }
            ].map((social, idx) => (
              <motion.a 
                key={idx}
                href={social.url} 
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 bg-slate-800 text-white hover:text-amber-500 rounded-xl transition-colors duration-200 border border-slate-700/50 block transform-gpu"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Column 2: Useful Navigation Links */}
        <motion.div variants={footerItemVariants}>
          <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6 border-l-2 border-amber-500 pl-3 select-none">
            Useful Links
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Home Dashboard", path: "/" },
              { label: "Explore Available Fleet", path: "/cars" },
              { label: "Join / Register Account", path: "/login" },
              { label: "Terms & Conditions", path: "/about" }
            ].map((link, idx) => (
              <li key={idx}>
                <Link 
                  href={link.path} 
                  className="hover:text-amber-500 transition-colors inline-block relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Fleet Categories */}
        <motion.div variants={footerItemVariants}>
          <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6 border-l-2 border-amber-500 pl-3 select-none">
            Our Fleet Class
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              "Luxury Sports Sedan",
              "Offroad Luxury SUV",
              "Efficient City Hatchback",
              "Family Multi-purpose MPV"
            ].map((item, idx) => (
              <motion.li 
                key={idx}
                whileHover={{ x: 4, color: "#f59e0b" }}
                className="transition-colors cursor-pointer inline-block transform-gpu"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Column 4: Contact Info (React Icons Fixed) */}
        <motion.div variants={footerItemVariants}>
          <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6 border-l-2 border-amber-500 pl-3 select-none">
            Contact Info
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-amber-500 shrink-0 mt-0.5" size={16} />
              <span className="text-pretty">Sona Dighi Square, Rajshahi Division, Bangladesh</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhoneAlt className="text-amber-500 shrink-0" size={14} />
              <a href="tel:+8801712345678" className="hover:text-amber-500 transition-colors">+880 1712-345678</a>
            </li>
            <li className="flex items-center space-x-3">
              <MdEmail className="text-amber-500 shrink-0" size={16} />
              <a href="mailto:support@zippycar.com" className="hover:text-amber-500 transition-colors">support@zippycar.com</a>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Footer Bottom copyright area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-center text-xs select-none">
        <p>&copy; {new Date().getFullYear()} ZippyCar Platform. Built with Passion. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;