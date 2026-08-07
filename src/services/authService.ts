import { authApi } from './api';
import type { User, LoginPayload } from '../types/auth';

export const login = async (payload: LoginPayload): Promise<User> => {
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

  const safeUser = Object.fromEntries(
    Object.entries(foundUser).filter(([key]) => key !== 'password')
  ) as User;

  return safeUser;
};
