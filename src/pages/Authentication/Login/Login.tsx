import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useFormState } from '@/hooks/useFormState';
import { AuthPageLayout } from '@/components/layouts/AuthPageLayout';
import { getErrorMessage } from '@/utils/errorHelpers';
import { Button } from '@/components/common/Button';
import { InputField } from '@/components/common/InputField';
import { ErrorMessage } from '@/components/common/Error';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isLoading, error, startLoading, stopLoading, setError } = useFormState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
  const handleForgotPassword = () => navigate('/forgot-password');
  const handleSocialLogin = () => undefined;
  const handleSignUp = useCallback(() => navigate('/register'), [navigate]);

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
    <AuthPageLayout
      title="Continue Planning Your Trips"
      subtitle="We're happy you're back. Let's get back to planning your adventures"
      isLoading={isLoading}
      footer={{
        questionText: "Don't have an account?",
        actionText: 'Sign Up',
        onActionClick: handleSignUp,
      }}
    >

      <form
        className="mt-10 space-y-6 font-helvetica"
        onSubmit={handleLogin}
      >
        <InputField
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <div className="space-y-1">
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <div className="text-right">
            <span
              onClick={handleForgotPassword}
              className="text-sm font-bold text-brand-dark-alt hover:text-blue-600 cursor-pointer transition"
            >
              Forgot Password?
            </span>
          </div>
        </div>

        <ErrorMessage message={error} />

        <div className="mt-8 grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="social"
            size="md"
            socialIcon="google"
            onClick={handleSocialLogin}
          >
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="social"
            size="md"
            socialIcon="apple"
            onClick={handleSocialLogin}
          >
            Continue with Apple
          </Button>
        </div>

        <div className="mt-8 flex flex-col gap-0.5">
          <Button
            type="submit"
            isLoading={isLoading}
            showArrow
          >
            Sign In
          </Button>

        </div>
      </form>
    </AuthPageLayout>
  );
};
