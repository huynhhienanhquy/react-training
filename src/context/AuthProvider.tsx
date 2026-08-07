import React, { useState } from 'react';
import type { User } from '../types/auth';
import { AuthContext } from './AuthContext';
import { login as authenticateUser } from '@/services/authService';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const userData = await authenticateUser({ email, password });

      const accessToken = `mock_token_${userData.id}_${Date.now()}`;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
    } catch {
      throw new Error('Incorrect email or password!');
    } finally {
      setLoading(false);
    }
  };

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
