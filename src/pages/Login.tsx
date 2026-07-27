import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFormState } from '../hooks/useFormState';
import { AuthLayout } from '../components/auth/AuthLayout';
import { getAuthErrorMessage } from '../utils/authHelpers';
import iconGoogle from '../assets/icons/logo-google.png';
import iconApple from '../assets/icons/logo-apple.png';
import { Button } from '../components/ui/Button';
import { InputField } from '../components/ui/InputField';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { AuthHeader } from '../components/auth/AuthHeader';
import { AuthFooter } from '../components/auth/AuthFooter';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isLoading, error, startLoading, stopLoading, setError } = useFormState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoading();
    setError('');

    try {
      await login(email, password);
      navigate('/chats');
    } catch (err: unknown) {
      if (err instanceof Error && err.message) {
        setError(err.message);
      } else {
        setError(getAuthErrorMessage(err));
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* 1. Header */}
      <AuthHeader
        title="Continue Planning Your Trips"
        subtitle="We're happy you're back. Let's get back to planning your adventures"
      />

      {/* 2. Form */}
      <form className="space-y-6 font-helvetica" onSubmit={handleLogin}>
        <InputField
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="space-y-1">
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="text-right pt-1">
            <span
              onClick={() => navigate('/forgot-password')}
              className="text-sm font-bold text-brand-dark-alt hover:text-blue-600 cursor-pointer transition"
            >
              Forgot Password?
            </span>
          </div>
        </div>

        <ErrorMessage message={error} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Button
            type="button"
            variant="social"
            size="md"
            leftIcon={<img src={iconGoogle} alt="Google" className="w-5 h-5 object-contain" />}
            onClick={() => console.log('Google login')}
          >
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="social"
            size="md"
            leftIcon={<img src={iconApple} alt="Apple" className="w-5 h-5 object-contain" />}
            onClick={() => console.log('Apple login')}
          >
            Continue with Apple
          </Button>
        </div>

        {/* 3.The button and footer are wrapped very close together (gap-1.5). */}
        <div className="flex flex-col gap-0.5">
          <Button
            type="submit"
            isLoading={isLoading}
            rightIcon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            }
          >
            Sign In
          </Button>

          <AuthFooter
            questionText="Don't have an account?"
            actionText="Sign Up"
            onActionClick={() => navigate('/register')}
          />
        </div>
      </form>
    </AuthLayout>
  );
};
