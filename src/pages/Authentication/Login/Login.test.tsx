// @vitest-environment jsdom

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Login } from './Login';

const mockNavigate = vi.fn();
const mockLogin = vi.fn();
const mockStartLoading = vi.fn();
const mockStopLoading = vi.fn();
const mockSetError = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ login: mockLogin }),
}));

vi.mock('@/hooks/useFormState', () => ({
  useFormState: () => ({
    isLoading: false,
    error: '',
    startLoading: mockStartLoading,
    stopLoading: mockStopLoading,
    setError: mockSetError,
  }),
}));

vi.mock('@/components/auth/AuthLayout/AuthLayout', () => ({
  AuthLayout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/components/auth/AuthHeader/AuthHeader', () => ({
  AuthHeader: ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => (
    <>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </>
  ),
}));

vi.mock('@/components/common/Button', () => ({
  Button: ({
    children,
    onClick,
    type,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
  }) => (
    <button type={type || 'button'} onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

vi.mock('@/components/auth/AuthFooter/AuthFooter', () => ({
  AuthFooter: ({
    actionText,
    onActionClick,
  }: {
    actionText: string;
    onActionClick: () => void;
  }) => (
    <button onClick={onActionClick}>
      {actionText}
    </button>
  ),
}));

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page correctly', () => {
    render(<Login />);

    expect(
      screen.getByText('Continue Planning Your Trips'),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('Email address'),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('Password'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Forgot Password?'),
    ).toBeInTheDocument();

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(
      screen.getByText('Continue with Google'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Continue with Apple'),
    ).toBeInTheDocument();

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('associates labels with the actual inputs', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');

    expect(emailInput).toHaveAttribute('id');
    expect(passwordInput).toHaveAttribute('id');
  });

  it('updates email and password inputs', async () => {
    const user = userEvent.setup();

    render(<Login />);

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'mypassword');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('mypassword');
  });

  it('calls login and navigates on successful submit', async () => {
    mockLogin.mockResolvedValueOnce(undefined);

    const user = userEvent.setup();

    render(<Login />);

    await user.type(
      screen.getByLabelText('Email address'),
      'test@example.com',
    );

    await user.type(
      screen.getByLabelText('Password'),
      'password123',
    );

    await user.click(screen.getByText('Sign In'));

    expect(mockStartLoading).toHaveBeenCalled();
    expect(mockLogin).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
    );
    expect(mockSetError).toHaveBeenCalledWith('');

    await vi.waitFor(() => {
      expect(mockStopLoading).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/chats');
    });
  });

  it('shows error on failed login', async () => {
    mockLogin.mockRejectedValueOnce(
      new Error('Invalid credentials'),
    );

    const user = userEvent.setup();

    render(<Login />);

    await user.type(
      screen.getByLabelText('Email address'),
      'wrong@email.com',
    );

    await user.type(
      screen.getByLabelText('Password'),
      'wrong',
    );

    await user.click(screen.getByText('Sign In'));

    await vi.waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith(
        'Invalid credentials',
      );

      expect(mockStopLoading).toHaveBeenCalled();
    });
  });

  it('navigates to forgot password', async () => {
    const user = userEvent.setup();

    render(<Login />);

    await user.click(screen.getByText('Forgot Password?'));

    expect(mockNavigate).toHaveBeenCalledWith(
      '/forgot-password',
    );
  });

  it('navigates to register via footer', async () => {
    const user = userEvent.setup();

    render(<Login />);

    await user.click(screen.getByText('Sign Up'));

    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});
