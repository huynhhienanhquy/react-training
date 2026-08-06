import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '@/hooks/useFormState';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/Button';
import { InputField } from '@/components/Input';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useFormState();
  const [email, setEmail] = useState<string>("");

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();

    setTimeout(() => {
      stopLoading();
      alert("OTP code has been sent to your email!");
      navigate('/verify-otp');
    }, 300);
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* Reduce the overall spacing between blocks to space-y-3.5 */}
      <div className="flex flex-col space-y-3.5">
        {/* 1. Header */}
        <AuthHeader
          title="Verify Email"
          subtitle="Enter your email address to receive verification OTP"
        />

        {/* 2. Form */}
        <form className="space-y-3 translate-y-8" onSubmit={handleSendOTP} autoComplete="off">
          <InputField
            label="Email address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            className="translate-y-4"
            type="submit"
            isLoading={isLoading}
            showArrow
          >
            Send OTP Code
          </Button>

        </form>

        {/* 3. Footer link is right below the button*/}
        <AuthFooter
          className="space-y-3 translate-y-14"
          questionText="Don't have an account?"
          actionText="Sign Up"
          onActionClick={() => navigate('/register')}
        />
      </div>
    </AuthLayout>
  );
};
