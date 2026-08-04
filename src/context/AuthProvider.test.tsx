import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthProvider } from './AuthProvider';
import { useAuth } from '@/hooks/useAuth';
import { loginApi } from '@/services/authService';

vi.mock('@/services/authService', () => ({ loginApi: vi.fn() }));

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('hydrates an existing session from storage', () => {
    const user = { id: 'user-1', email: 'test@example.com' };
    localStorage.setItem('user', JSON.stringify(user));

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toEqual(user);
  });

  it('logs in, stores the session, and clears loading', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(123);
    vi.mocked(loginApi).mockResolvedValue({ id: 'user-1', email: 'test@example.com' });
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(() => result.current.login('test@example.com', 'secret'));

    expect(loginApi).toHaveBeenCalledWith({ email: 'test@example.com', password: 'secret' });
    expect(result.current.user).toEqual({ id: 'user-1', email: 'test@example.com' });
    expect(result.current.loading).toBe(false);
    expect(localStorage.getItem('accessToken')).toBe('mock_token_user-1_123');
  });

  it('cleans local state and storage on logout', async () => {
    localStorage.setItem('user', JSON.stringify({ id: 'user-1', email: 'test@example.com' }));
    localStorage.setItem('accessToken', 'token');
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => result.current.logout());

    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('accessToken')).toBeNull();
  });
});
