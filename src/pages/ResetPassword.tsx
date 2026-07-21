import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Button } from '../components/ui/button/Button';
import { AuthHeader } from '../components/auth/AuthHeader';
import { InputField } from '../components/ui/input/InputField';
import { AuthFooter } from '../components/auth/AuthFooter';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please check again.");
      return;
    }

    setIsLoading(true);

    // Simulate an API call to update the new password.
    setTimeout(() => {
      setIsLoading(false);
      alert("Password reset successfully! Redirecting to Sign In...");
      navigate('/login');
    }, 300);
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* 1. Header */}
      <AuthHeader
        title="Reset Password"
        subtitle="You’re all set. Please change your password now"
      />

      <form className="space-y-6" onSubmit={handleResetPassword} autoComplete="off">
        {/* 2. Enter a new password. */}
        <InputField
          label="New Password"
          isPassword={true}
          placeholder="Enter your password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* 3. Confirm your new password. */}
        <InputField
          label="Confirm New Password"
          isPassword={true}
          placeholder="Confirm your password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* 4. Error message if password does not match */}
        {error && (
          <p className="text-sm text-red-500 font-medium px-1 bg-red-50/50 rounded-lg py-1 border border-red-100/40 text-center">
            {error}
          </p>
        )}

        {/* 5. Button submit*/}
        <div className="pt-2">
          <Button type="submit" isLoading={isLoading} showArrow={true}>
            Save and Continue to Sign In
          </Button>
        </div>
      </form>

      {/* 6. Footer */}
      <AuthFooter
        questionText="Don't have an account?"
        actionText="Sign Up"
        onActionClick={() => navigate('/register')}
      />
    </AuthLayout>
  );
};
