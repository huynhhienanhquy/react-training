import { describe, expect, it, vi, beforeEach } from 'vitest';
import { login } from '@/services/authService';
import { authApi } from '@/services/api';

vi.mock('@/services/api', () => ({
  authApi: { get: vi.fn() },
}));

describe('login', () => {
  beforeEach(() => vi.clearAllMocks());

  it('matches credentials case-insensitively and excludes the password', async () => {
    vi.mocked(authApi.get).mockResolvedValue({
      data: [
        { id: 'user-1', email: 'test@example.com', password: 'secret', fullName: 'Test User' },
      ],
    });

    await expect(login({ email: 'TEST@example.com', password: 'secret' })).resolves.toEqual({
      id: 'user-1',
      email: 'test@example.com',
      fullName: 'Test User',
    });
    expect(authApi.get).toHaveBeenCalledWith('/login');
  });

  it('does not own persisted authentication state', async () => {
    vi.mocked(authApi.get).mockResolvedValue({
      data: [{ id: 'user-1', email: 'test@example.com', password: 'secret' }],
    });
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    await login({ email: 'test@example.com', password: 'secret' });

    expect(setItem).not.toHaveBeenCalled();
    setItem.mockRestore();
  });

  it('rejects invalid credentials', async () => {
    vi.mocked(authApi.get).mockResolvedValue({ data: [] });

    await expect(login({ email: 'test@example.com', password: 'wrong' })).rejects.toThrow(
      'Incorrect email or password!',
    );
  });
});
