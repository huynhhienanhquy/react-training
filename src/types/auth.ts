export interface User {
  id: string;
  email: string;
  fullName?: string;
  country?: string;
  isOnboarded?: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  completeOnboarding: (fullName: string, country: string) => Promise<void>;
  logout: () => void;
}
