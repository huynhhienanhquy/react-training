import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useFormState } from '@/hooks/useFormState';
import { AuthLayout } from '@/components/common/Auth/AuthLayout';
import { getErrorMessage } from '@/utils/errorHelpers';
import { Button } from '@/components/common/Button';
import { InputField } from '@/components/common/InputField';
import { ErrorMessage } from '@/components/common/Error';
import { AuthHeader } from '@/components/common/Auth/AuthHeader';
import { AuthFooter } from '@/components/common/Auth/AuthFooter';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isLoading, error, startLoading, stopLoading, setError } = useFormState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLoading();
    setError('');

    try {
      await login(email, password);
      navigate('/chats');
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  };

  return (
    <AuthLayout isLoading={isLoading}>
      <AuthHeader
        title="Continue Planning Your Trips"
        subtitle="We're happy you're back. Let's get back to planning your adventures"
      />

      <form
        className="space-y-6 font-helvetica translate-y-10"
        onSubmit={handleLogin}
      >
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

          <div className="text-right">
            <span
              onClick={() => navigate('/forgot-password')}
              className="text-sm font-bold text-brand-dark-alt hover:text-blue-600 cursor-pointer transition"
            >
              Forgot Password?
            </span>
          </div>
        </div>

        <ErrorMessage message={error} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 translate-y-8 ">
          <Button
            type="button"
            variant="social"
            size="md"
            socialIcon="google"
            onClick={() => {}}
          >
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="social"
            size="md"
            socialIcon="apple"
            onClick={() => {}}
          >
            Continue with Apple
          </Button>
        </div>

        <div className="flex flex-col gap-0.5 translate-y-12">
          <Button
            type="submit"
            isLoading={isLoading}
            showArrow
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
