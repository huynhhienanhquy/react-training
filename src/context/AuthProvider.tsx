import React, { useState } from 'react';
import type { User } from '../types/auth';
import { AuthContext } from './AuthContext';
import { loginApi } from '../services/loginAPI';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize the user state directly from localStorage (Lazy Initialization)
  // Help prevent unnecessary re-rendering or useEffect errors in your application.
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as User;
      } catch (error) {
        console.error('Lỗi parse user:', error);
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
      const mockToken = `mock_token_${userData.id}_${Date.now()}`;

      localStorage.setItem('accessToken', mockToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
    } catch {
      // Not declaring a variable -> Completely ignore the unused variable error!
      throw new Error('Email hoặc mật khẩu không chính xác!');
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
