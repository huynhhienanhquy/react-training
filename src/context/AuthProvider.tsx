import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { User } from '../types/auth';
import { AuthContext } from './AuthContext'; // 💡 Import Context từ file vừa tách

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          setUser({ id: '1', email: 'adventure@tripal.com', isOnboarded: true });
        } catch (error) {
          console.error("Session expired or invalid token:", error);
          localStorage.removeItem('accessToken');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      const { token, user: dataUser } = response.data || {};

      if (token) {
        localStorage.setItem('accessToken', token);
      } else {
        localStorage.setItem('accessToken', 'mock_beeceptor_token');
      }

      setUser(dataUser || { id: '1', email, isOnboarded: true });
    } catch (error) {
      console.error("API Login Error:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('accessToken', response.data?.token || 'mock_beeceptor_token');
      setUser({ id: '1', email, isOnboarded: false });
    } catch (error) {
      console.error("API Register Error:", error);
      throw error;
    }
  };

  const completeOnboarding = async (fullName: string, country: string) => {
    try {
      await api.post('/login', { fullName, country });
      if (user) {
        setUser({ ...user, fullName, country, isOnboarded: true });
      }
    } catch (error) {
      console.error("API Onboarding Error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, completeOnboarding, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
