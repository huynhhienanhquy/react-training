import axios from 'axios';
import type { User } from '../types/auth';

// 1. Create an Axios instance that connects to your MockAPI.
const api = axios.create({
  baseURL: 'https://6a6321581bffb2ffab8bc359.mockapi.io/user',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginPayload {
  email: string;
  password?: string;
}


//The function calls the login verification API from MockAPI (endpoint /login).
export const loginApi = async (payload: LoginPayload): Promise<User> => {
  // GET https://6a6321581bffb2ffab8bc359.mockapi.io/user/login
  const response = await api.get<User[]>('/login');
  const users = response.data || [];

  // Find the username that matches the email and password.
  const foundUser = users.find(
    (u) =>
      u.email?.toLowerCase() === payload.email.toLowerCase() &&
      u.password === payload.password
  );

  if (!foundUser) {
    throw new Error('Email hoặc mật khẩu không chính xác!');
  }

  //Remove the password before returning it to ensure security and avoid the ESLint unused-vars error.
  const safeUser = { ...foundUser };
  delete safeUser.password;

  return safeUser as User;
};

export default api;
