"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ZippyCarLogo from "./CarLogo/ZippyCarLogo";

const Footer = () => {
  const footerItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="bg-[#090d16] border-t border-slate-800 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <motion.div variants={footerItemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <ZippyCarLogo />
          </Link>
          <p className="text-sm leading-relaxed">Experience premium mobility with Bangladesh's ultimate car rental solution.</p>
          <div className="flex space-x-3 pt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <a key={idx} href="#" className="p-2.5 bg-slate-800 text-white hover:text-amber-500 rounded-xl transition-colors duration-200 border border-slate-700/50 block">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div variants={footerItemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6 border-l-2 border-amber-500 pl-3">Useful Links</h4>
          <ul className="space-y-3 text-sm">
            {[{ label: "Home Dashboard", path: "/" }, { label: "Explore Fleet", path: "/cars" }, { label: "Register Account", path: "/login" }, { label: "About Us", path: "/about" }].map((link, idx) => (
              <li key={idx}><Link href={link.path} className="hover:text-amber-500 transition-colors inline-block">{link.label}</Link></li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={footerItemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6 border-l-2 border-amber-500 pl-3">Our Fleet</h4>
          <ul className="space-y-3 text-sm">
            {["Luxury Sports Sedan", "Offroad Luxury SUV", "Efficient City Hatchback", "Family MPV"].map((item, idx) => (
              <li key={idx} className="hover:text-amber-500 transition-colors cursor-pointer">{item}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={footerItemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6 border-l-2 border-amber-500 pl-3">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3"><FaMapMarkerAlt className="text-amber-500 shrink-0 mt-0.5" size={16} /><span>Sona Dighi Square, Rajshahi, Bangladesh</span></li>
            <li className="flex items-center space-x-3"><FaPhoneAlt className="text-amber-500 shrink-0" size={14} /><a href="tel:+8801712345678" className="hover:text-amber-500 transition-colors">+880 1712-345678</a></li>
            <li className="flex items-center space-x-3"><MdEmail className="text-amber-500 shrink-0" size={16} /><a href="mailto:support@zippycar.com" className="hover:text-amber-500 transition-colors">support@zippycar.com</a></li>
          </ul>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} ZippyCar Platform. Built with Passion. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;