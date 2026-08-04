import { describe, expect, it, vi, beforeEach } from 'vitest';
import { loginApi } from './authService';
import { authApi } from './api';

vi.mock('./api', () => ({
  authApi: { get: vi.fn() },
}));

describe('loginApi', () => {
  beforeEach(() => vi.clearAllMocks());

  it('matches credentials case-insensitively and excludes the password', async () => {
    vi.mocked(authApi.get).mockResolvedValue({
      data: [
        { id: 'user-1', email: 'test@example.com', password: 'secret', fullName: 'Test User' },
      ],
    });

    await expect(loginApi({ email: 'TEST@example.com', password: 'secret' })).resolves.toEqual({
      id: 'user-1',
      email: 'test@example.com',
      fullName: 'Test User',
    });
    expect(authApi.get).toHaveBeenCalledWith('/login');
  });

  it('rejects invalid credentials', async () => {
    vi.mocked(authApi.get).mockResolvedValue({ data: [] });

    await expect(loginApi({ email: 'test@example.com', password: 'wrong' })).rejects.toThrow(
      'Incorrect email or password!',
    );
  });
});
