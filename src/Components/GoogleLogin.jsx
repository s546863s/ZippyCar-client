"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "react-toastify";
import dynamic from 'next/dynamic';

const GoogleLoginComponent = ({ buttonText = "Continue with Google" }) => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGoogleResponse = async (response) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/api/auth/google-login", {
        credential: response.credential
      });
     
      if (res.data.success) {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        setUser(res.data.user);
        toast.success("Google login successful!");
        router.push("/");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.response?.data?.message || "Google login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeGoogleSignIn = () => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    const buttonElement = document.getElementById("google-signin-button");
    if (buttonElement) {
      window.google.accounts.id.renderButton(buttonElement, {
        type: "standard",
        theme: "filled_black",
        size: "large",
        width: "100%",
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "center",
      });
    }
  };

  useEffect(() => {
    if (!isClient) return;
    
    if (!scriptLoadedRef.current && !window.google) {
      scriptLoadedRef.current = true;
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initializeGoogleSignIn();
      };
      document.body.appendChild(script);
    } else if (window.google) {
      initializeGoogleSignIn();
    }
  }, [isClient]);

  if (!isClient) {
    return (
      <button
        type="button"
        disabled
        className="w-full bg-slate-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-3 opacity-50 cursor-not-allowed"
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Loading...
      </button>
    );
  }

  return (
    <div className="w-full">
      <div id="google-signin-button" className="w-full [&>div]:w-full [&>div>iframe]:w-full [&>div]:rounded-xl [&>div]:overflow-hidden" />
     
      {!window.google && (
        <button
          type="button"
          disabled={isLoading}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 border border-slate-700 disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          {isLoading ? "Processing..." : buttonText}
        </button>
      )}
    </div>
  );
};

const GoogleLogin = dynamic(() => Promise.resolve(GoogleLoginComponent), { ssr: false });

export default GoogleLogin;