import { authApi } from './api';
import type { User, LoginPayload } from '../types/auth';

export const loginApi = async (payload: LoginPayload): Promise<User> => {
  const response = await authApi.get<User[]>('/login');
  const users = response.data || [];

  const foundUser = users.find(
    (u) =>
      u.email?.toLowerCase() === payload.email.toLowerCase() &&
      u.password === payload.password
  );

  if (!foundUser) {
    throw new Error('Incorrect email or password!');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safeUser } = foundUser;

  localStorage.setItem('accessToken', `mock_token_${safeUser.id}_${Date.now()}`);
  localStorage.setItem('user', JSON.stringify(safeUser));

  return safeUser as User;
};

export const logoutApi = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
};
