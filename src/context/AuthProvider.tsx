import React, { useState } from 'react';
import type { User } from '../types/auth';
import { AuthContext } from './AuthContext';
import { loginApi } from '../services/authService';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize the user state directly from localStorage (Lazy Initialization)
  // Help prevent unnecessary re-rendering or useEffect errors in your application.
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as User;
      } catch (error) {
        console.error('Cross user error:', error);
        localStorage.removeItem('user');
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userData = await loginApi({ email, password });
      setUser(userData);
    } catch {
      throw new Error('Incorrect email or password!');
    } finally {
      setLoading(false);
    }
  };

  //Logout Function
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
