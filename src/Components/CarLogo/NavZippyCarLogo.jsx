import React from "react";
import "./ZippyCarLogo.css"; 
const NavZippyCarLogo = () => {
  return (
    <div className=" ">
      
      <div className="brand-text-nav justify-center flex text-xl">
        <span className="zippy-nav">Zippy</span>
        <span className="car-text">Car</span>
      </div>
      <div className="tagline-nav flex justify-center items-center ">
        <span>Fast</span>
        <span className="dot-divider"></span>
        <span>Stylish</span>
        <span className="dot-divider"></span>
        <span>Reliable</span>
      </div>
    </div>
  );
};

export default NavZippyCarLogo;