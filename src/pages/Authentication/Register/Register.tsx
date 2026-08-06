import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '@/hooks/useFormState';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/Button';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { InputField } from '@/components/Input';
import { AuthFooter } from '@/components/auth/AuthFooter';

export const Register = () => {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useFormState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();

    setTimeout(() => {
      stopLoading();
      navigate('/onboarding');
    }, 300);
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* 1. Header  */}
      <AuthHeader
        title="Unlock Your Next Adventure"
        subtitle="Create a free account to start planning trips with Tripal"
      />

      {/* 2. Form*/}
      <form className="space-y-3 translate-y-10" onSubmit={handleSubmit}>
        {/* Email input field */}
        <InputField
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password input field */}
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Terms of Service (Checkbox) */}
        <div className="flex items-start gap-2.5 py-0.5 translate-y-12">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 mt-11 translate-y-100">
          <Button
            type="button"
            variant="social"
            size="md"
            socialIcon="google"
            onClick={() => { /* TODO: Implement Google login */ }}
          >
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="social"
            size="md"
            socialIcon="apple"
            onClick={() => { /* TODO: Implement Apple login */ }}
          >
            Continue with Apple
          </Button>
        </div>

        {/* 3. Button + Footer  */}
        <div className="flex flex-col gap-0.5 translate-y-40">
          <Button
            type="submit"
            isLoading={isLoading}
            showArrow
          >
            Create a Free Account
          </Button>

          <AuthFooter
            questionText="Already have an account?"
            actionText="Sign In"
            onActionClick={() => navigate('/login')}
          />
        </div>
      </form>
    </AuthLayout>
  );
};
