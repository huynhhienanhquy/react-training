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

export interface AuthFooterProps {
  questionText: string;
  actionText: string;
  onActionClick: () => void;
  className?: string;
}

export interface AuthHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export interface AuthLayoutProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  inset?: boolean;
  heroInset?: boolean;
}


