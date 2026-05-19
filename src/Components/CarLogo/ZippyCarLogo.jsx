"use client";

import React from "react";
import "./ZippyCarLogo.css";

const ZippyCarLogo = () => {
  return (
    <div className="nav-logo-container">
      {/* Small animated car scene */}
      <div className="nav-car-scene">
        <svg className="nav-road-svg" width="120" height="40" viewBox="0 0 120 40">
          <line
            className="nav-road-line"
            x1="0"
            y1="35"
            x2="120"
            y2="35"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="10 10"
            opacity="0.4"
          />
        </svg>

        <svg className="nav-car-svg" width="75" height="40" viewBox="0 0 130 70">
          {/* Speed lines */}
          <line
            className="nav-speed-line-1"
            x1="2" y1="38" x2="22" y2="38"
            stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.7"
          />
          <line
            className="nav-speed-line-2"
            x1="2" y1="46" x2="18" y2="46"
            stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"
          />

          {/* Car body */}
          <rect x="18" y="36" width="95" height="24" fill="#1e293b" rx="4" />

          {/* Roof */}
          <path d="M38 36 Q45 18 70 17 Q90 17 98 36 Z" fill="#1e293b" />

          {/* Windshield */}
          <path d="M44 36 Q49 22 68 21 Q82 21 88 36 Z" fill="#60a5fa" opacity="0.8" />

          {/* Headlight */}
          <rect x="110" y="42" width="6" height="8" fill="#fef08a" rx="2" />

          {/* Amber accent stripe */}
          <rect x="18" y="52" width="95" height="4" fill="#f59e0b" />

          {/* Wheels */}
          <g className="nav-wheel-back">
            <circle cx="31" cy="60" r="10" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            <circle cx="31" cy="60" r="5" fill="#334155" />
            <line x1="31" y1="53" x2="31" y2="67" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="24" y1="60" x2="38" y2="60" stroke="#94a3b8" strokeWidth="1.5" />
          </g>

          <g className="nav-wheel-front">
            <circle cx="81" cy="60" r="10" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            <circle cx="81" cy="60" r="5" fill="#334155" />
            <line x1="81" y1="53" x2="81" y2="67" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="74" y1="60" x2="88" y2="60" stroke="#94a3b8" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      {/* Brand text and tagline in the same section */}
      <div className="nav-text-block ">
        <div className="nav-brand-text">
          <span className="nav-zippy">Zippy</span>
          <span className="nav-car-text">Car</span>
        </div>

        <div className="nav-tagline flex gap-0.5 justify-between items-center ">
          <span>Fast</span>
          <span className="nav-dot-divider"></span>
          <span className="nav-dot-divider"></span>
          <span className="nav-dot-divider"></span>
          
          <span>Stylish</span>
        
        </div>
      </div>
    </div>
  );
};

export default ZippyCarLogo;