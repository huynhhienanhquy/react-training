import api from './loginAPI';
import type { User } from '../types/auth';

export interface LoginPayload {
  email: string;
  password?: string;
}

//Call GET /login to MockAPI to verify your email and password.
export const loginApi = async (payload: LoginPayload): Promise<User> => {
  const response = await api.get<User[]>('/login');
  const users = response.data || [];

  // Find users with matching email and password.
  const foundUser = users.find(
    (u) =>
      u.email?.toLowerCase() === payload.email.toLowerCase() &&
      u.password === payload.password
  );

  if (!foundUser) {
    throw new Error('Email hoặc mật khẩu không chính xác!');
  }

  // Create a copy and delete the password field (completely avoid the unused-vars error in ESLint).
  const safeUser = { ...foundUser };
  delete safeUser.password;

  const mockToken = `mock_token_${safeUser.id}_${Date.now()}`;

  // Save the information to LocalStorage.
  localStorage.setItem('accessToken', mockToken);
  localStorage.setItem('user', JSON.stringify(safeUser));

  return safeUser as User;
};

//Logout
export const logoutApi = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
};


//Get the current user from LocalStorage
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
};
