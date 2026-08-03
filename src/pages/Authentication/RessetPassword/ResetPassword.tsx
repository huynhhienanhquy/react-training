import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '@/hooks/useFormState';
import { AuthLayout } from '@/components/auth/AuthLayout/AuthLayout';
import { Button } from '@/components/Button/Button';
import { AuthHeader } from '@/components/auth/AuthHeader/AuthHeader';
import { InputField } from '@/components/InputField/InputField';
import { ErrorMessage } from '@/components/Error/ErrorMessage';
import { AuthFooter } from '@/components/auth/AuthFooter/AuthFooter';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { isLoading, error, startLoading, stopLoading, setError } = useFormState();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please check again.");
      return;
    }

    startLoading();

    setTimeout(() => {
      stopLoading();
      alert("Password reset successfully! Redirecting to Sign In...");
      navigate('/login');
    }, 300);
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* Reduce the overall spacing between blocks to space-y-3.5 */}
      <div className="flex flex-col space-y-3.5">
        {/* 1. Header */}
        <AuthHeader
          title="Reset Password"
          subtitle="You’re all set. Please change your password now"
        />

        {/* 2. Form */}
        <div className="mt-5  translate-y-8">
          <form
            className="space-y-3"
            onSubmit={handleResetPassword}
            autoComplete="off"
          >
            <InputField
              label="New Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <InputField
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <ErrorMessage message={error} />

            <Button
              className="translate-y-20"
              type="submit"
              isLoading={isLoading}
              showArrow
            >
              Reset Password
            </Button>

            {/* 3. Footer  */}
            <AuthFooter
              className="translate-y-24"
              questionText="Don't have an account?"
              actionText="Sign Up"
              onActionClick={() => navigate('/register')}
            />
          </form>
        </div>


      </div>
    </AuthLayout>
  );
};
