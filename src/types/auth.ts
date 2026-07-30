export interface User {
  id: string;
  email: string;
  password?: string;
  fullName?: string;
  avatar?: string;
  [key: string]: unknown;
}

export interface LoginPayload {
  email: string;
  password: string;
}
