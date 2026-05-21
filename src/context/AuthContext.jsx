"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUserStatus = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/auth/me');
      
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  useEffect(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout, checkUserStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};