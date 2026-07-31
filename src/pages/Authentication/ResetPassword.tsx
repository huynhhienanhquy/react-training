import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '../../hooks/useFormState';
import { AuthLayout } from '../../components/SectionAuthentication/AuthLayout';
import { Button } from '../../components/Button/Button';
import { AuthHeader } from '../../components/SectionAuthentication/AuthHeader';
import { InputField } from '../../components/Input/InputField';
import { ErrorMessage } from '../../components/Error/ErrorMessage';
import { AuthFooter } from '../../components/SectionAuthentication/AuthFooter';

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
        <form className="space-y-3" onSubmit={handleResetPassword} autoComplete="off">
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
            isLoading={isLoading}
            rightIcon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            }
          >
            Reset Password
          </Button>
        </form>

        {/* 3. Footer  */}
        <AuthFooter
          questionText="Don't have an account?"
          actionText="Sign Up"
          onActionClick={() => navigate('/register')}
        />
      </div>
    </AuthLayout>
  );
};
