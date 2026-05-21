"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  const checkUserStatus = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/me", {
        method: "GET",
        credentials: "include", 
      });

      console.log("Response status:", res.status); 
      const data = await res.json();
      console.log("User data:", data); 

      if (res.ok && data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth state sync error:", error);
      setUser(null);
    } finally {
      loading && setLoading(false);
    }
  };

  const logoutContext = () => {
    setUser(null);
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);