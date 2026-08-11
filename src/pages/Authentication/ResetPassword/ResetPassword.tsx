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
  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), []);
  const handleConfirmPasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value), []);
  const handleSignUp = useCallback(() => navigate('/register'), [navigate]);

  const handleResetPassword = useCallback((event: React.FormEvent) => {
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
  }, [confirmPassword, navigate, password, setError, startLoading, stopLoading]);

  return (
    <AuthPageLayout
      title="Reset Password"
      subtitle="You're all set. Please change your password now"
      isLoading={isLoading}
      className="flex flex-col"
      footer={{
        questionText: "Don't have an account?",
        actionText: 'Sign Up',
        onActionClick: handleSignUp,
        className: 'mt-5.5 text-base',
      }}
    >
      {/* Reduce the overall spacing between blocks to space-y-3.5 */}
      <div>
        {/* 1. Header */}

        {/* 2. Form */}
        <div className="mt-10">
          <form
            className=""
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
              className="h-14 rounded-2xl px-4 py-0 text-base"
              wrapperClassName="mb-0 space-y-4"
              required
            />

            <div className="mt-14">
              <InputField
                label="Confirm New Password"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="h-14 rounded-2xl px-4 py-0 text-base"
                wrapperClassName="mb-0 space-y-4"
                required
              />
            </div>

            <ErrorMessage message={error} />

            <Button
              className="mt-14 h-13 rounded-xl py-0 text-base font-normal"
              type="submit"
              isLoading={isLoading}
              showArrow
            >
              Save and Continue to Sign In
            </Button>

          </form>
        </div>


      </div>
    </AuthPageLayout>
  );
};
