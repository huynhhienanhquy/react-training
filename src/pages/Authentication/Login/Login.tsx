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

  const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), []);
  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), []);
  const handleForgotPassword = useCallback(() => navigate('/forgot-password'), [navigate]);
  const handleSocialLogin = useCallback(() => undefined, []);
  const handleSignUp = useCallback(() => navigate('/register'), [navigate]);

  const handleLogin = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
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
  }, [email, login, navigate, password, setError, startLoading, stopLoading]);

  return (
    <AuthPageLayout
      title="Continue Planning Your Trips"
      subtitle="We're happy you're back. Let's get back to planning your adventures"
      isLoading={isLoading}
      footer={{
        questionText: "Don't have an account?",
        actionText: 'Sign Up',
        onActionClick: handleSignUp,
        className: 'mt-5.5 text-base',
      }}
    >

      <form
        className="mt-10 font-helvetica"
        onSubmit={handleLogin}
      >
        <InputField
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="h-14 rounded-2xl px-4 py-0 text-base"
          wrapperClassName="mb-0 space-y-4"
          required
        />

        <div className="mt-8">
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            className="h-14 rounded-2xl px-4 py-0 text-base"
            wrapperClassName="mb-0 space-y-4"
            required
          />

          <div className="mt-8 text-right">
            <span
              onClick={handleForgotPassword}
              className="cursor-pointer text-base font-medium text-brand-dark-alt transition hover:text-blue-600"
            >
              Forgot Password?
            </span>
          </div>
        </div>

        <ErrorMessage message={error} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Button
            type="button"
            variant="social"
            size="md"
            socialIcon="google"
            className="h-14.5 rounded-2xl px-4 text-lg font-bold"
            onClick={handleSocialLogin}
          >
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="social"
            size="md"
            socialIcon="apple"
            className="h-14.5 rounded-2xl px-4 text-lg font-bold"
            onClick={handleSocialLogin}
          >
            Continue with Apple
          </Button>
        </div>

        <div className="mt-14 flex flex-col gap-0.5">
          <Button
            type="submit"
            isLoading={isLoading}
            showArrow
            className="h-13 rounded-xl py-0 text-base font-normal"
          >
            Sign In
          </Button>

        </div>
      </form>
    </AuthPageLayout>
  );
};
