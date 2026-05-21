"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { Megaphone } from "lucide-react";

const NewsTicker = () => {
  const newsItems = [
    "🚀 New: Now you can rent out high-end SUVs on the ZippyCar platform!",
    "📢 Update: Scheduled maintenance on May 25, 2026, from 02:00 AM to 04:00 AM.",
    "🔥 Special: Get a 20% discount on your first rental of the month!",
    "✅ System: All vehicle verification processes are now 2x faster."
  ];

  return (
    <div className="w-full bg-[#111827] border-b border-amber-500/20 py-2.5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-4 px-4">
        <div className="flex items-center gap-2 text-amber-500 shrink-0 border-r border-slate-800 pr-4">
          <Megaphone size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Latest</span>
        </div>
        <Marquee speed={40} pauseOnHover gradient={false} className="text-xs text-slate-300 font-medium">
          {newsItems.map((news, index) => (
            <span key={index} className="mx-8 hover:text-amber-500 transition-colors cursor-pointer">{news}</span>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default NewsTicker;