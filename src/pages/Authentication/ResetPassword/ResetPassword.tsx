import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '@/hooks/useFormState';
import { AuthPageLayout } from '@/components/layouts/AuthPageLayout';
import { Button } from '@/components/common/Button';
import { InputField } from '@/components/common/InputField';
import { ErrorMessage } from '@/components/common/Error';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { isLoading, error, startLoading, stopLoading, setError } = useFormState();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value);
  const handleSignUp = useCallback(() => navigate('/register'), [navigate]);

  const handleResetPassword = (event: React.FormEvent) => {
    event.preventDefault();
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
    <AuthPageLayout
      title="Reset Password"
      subtitle="You're all set. Please change your password now"
      isLoading={isLoading}
      className="flex flex-col space-y-3.5"
      footer={{
        questionText: "Don't have an account?",
        actionText: 'Sign Up',
        onActionClick: handleSignUp,
        className: 'translate-y-24',
      }}
    >
      {/* Reduce the overall spacing between blocks to space-y-3.5 */}
      <div>
        {/* 1. Header */}

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
              onChange={handlePasswordChange}
              required
            />

            <InputField
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
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

          </form>
        </div>


      </div>
    </AuthPageLayout>
  );
};
