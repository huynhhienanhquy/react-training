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
      }}
    >

      {/* 2. Form*/}
      <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
        {/* Email input field */}
        <InputField
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        {/* Password input field */}
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="new-password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        {/* Terms of Service (Checkbox) */}
        <div className="mt-8 flex items-start gap-2.5 py-0.5">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer shrink-0"
            required
          />
          <label htmlFor="terms" className="text-xs sm:text-sm text-gray-500 select-none cursor-pointer leading-tight">
            I agree to the <span className="text-blue-700 font-bold hover:underline">Terms of Service</span> and <span className="text-blue-700 font-bold hover:underline">Privacy Policy</span>
          </label>
        </div>

        {/* Button Social Login */}
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

        {/* 3. Button + Footer  */}
        <div className="mt-8 flex flex-col gap-0.5">
          <Button
            type="submit"
            isLoading={isLoading}
            showArrow
          >
            Create a Free Account
          </Button>

        </div>
      </form>
    </AuthPageLayout>
  );
};
