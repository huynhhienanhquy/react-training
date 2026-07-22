import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { User } from '../types/auth';
import { AuthContext } from './AuthContext';

// The provider manages and shares login status across the entire app.
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Save current user information.
  const [user, setUser] = useState<User | null>(null);
  // Waiting state while re-checking login session
  const [loading, setLoading] = useState<boolean>(true);

  // Automatically check and restore the old login session when the page reloads.
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          } else {
            setUser({ id: '1', email: 'adventure@tripal.com', isOnboarded: true });
          }
        } catch (error) {
          // Delete error data if the session is invalid.
          console.error("Session expired or invalid token:", error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
        }
      }

      setLoading(false);
    };
    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      const { token, user: dataUser } = response.data || {};

      const accessToken = token || 'mock_beeceptor_token';
      const currentUser = dataUser || { id: '1', email, isOnboarded: true };

      // Save login information to the user's machine and update the state.
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(currentUser));
      setUser(currentUser);
    } catch (error) {
      console.error("API Login Error:", error);
      throw error;
    }
  };

  // New account registration function
  const register = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      const accessToken = response.data?.token || 'mock_beeceptor_token';
      const newUser = { id: '1', email, isOnboarded: false };

      // Save new user information
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error("API Register Error:", error);
      throw error;
    }
  };

  // Onboarding function
  const completeOnboarding = async (fullName: string, country: string) => {
    try {
      await api.post('/login', { fullName, country });
      if (user) {
        // Update the information with the name, country, and mark that onboarding is complete.
        const updatedUser = { ...user, fullName, country, isOnboarded: true };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("API Onboarding Error:", error);
      throw error;
    }
  };

  // Logout function: Deletes all stored data and resets the state to null.
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    setUser(null);
  };

  // Pass all data and manipulation functions down to child components.
  return (
    <AuthContext.Provider value={{ user, loading, login, register, completeOnboarding, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
