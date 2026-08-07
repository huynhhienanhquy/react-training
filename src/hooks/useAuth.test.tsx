import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAuth } from './useAuth';
import { AuthContext, type AuthContextType } from '../context/AuthContext';
import React from 'react';

describe('useAuth', () => {
  it('throws error when used outside provider', () => {
    // Suppress console.error for expected thrown error
    const consoleError = console.error;
    console.error = () => {};

    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');

    console.error = consoleError;
  });

  it('returns context value when inside provider', () => {
    const mockContextValue: AuthContextType = {
      user: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={mockContextValue}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toBe(mockContextValue);
  });
});
