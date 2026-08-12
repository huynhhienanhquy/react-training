import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '@/hooks/useFormState';
import { AuthPageLayout } from '@/components/layouts/AuthPageLayout';
import { Button } from '@/components/common/Button';
import { InputField } from '@/components/common/InputField';

export const Register = () => {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useFormState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), []);
  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), []);
  const handleSocialLogin = useCallback(() => undefined, []);
  const handleSignIn = useCallback(() => navigate('/login'), [navigate]);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    startLoading();

    setTimeout(() => {
      stopLoading();
      navigate('/onboarding');
    }, 300);
  }, [navigate, startLoading, stopLoading]);

  return (
    <AuthPageLayout
      title="Unlock Your Next Adventure"
      subtitle="Create a free account to start planning trips with Tripal"
      isLoading={isLoading}
      footer={{
        questionText: 'Already have an account?',
        actionText: 'Sign In',
        onActionClick: handleSignIn,
        className: 'mt-5.5 text-base',
      }}
    >

      {/* 2. Form*/}
      <form className="mt-10" onSubmit={handleSubmit}>
        {/* Email input field */}
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

        {/* Password input field */}
        <div className="mt-8">
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            value={password}
            onChange={handlePasswordChange}
            className="h-14 rounded-2xl px-4 py-0 text-base"
            wrapperClassName="mb-0 space-y-4"
            required
          />
        </div>

        {/* Terms of Service (Checkbox) */}
        <div className="mt-14 flex items-center gap-2.5">
          <input
            type="checkbox"
            id="terms"
            className="h-6 w-6 shrink-0 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
          <label htmlFor="terms" className="cursor-pointer select-none text-sm leading-6 text-gray-500 sm:text-base">
            I agree to the <span className="font-normal text-blue-700 hover:underline">Terms of Service</span> and <span className="font-normal text-blue-700 hover:underline">Privacy Policy</span>
          </label>
        </div>

        {/* Button Social Login */}
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

        {/* 3. Button + Footer  */}
        <div className="mt-14 flex flex-col gap-0.5">
          <Button
            type="submit"
            isLoading={isLoading}
            showArrow
            className="h-13 rounded-xl py-0 text-base font-normal"
          >
            Create a Free Account
          </Button>

        </div>
      </form>
    </AuthPageLayout>
  );
};
