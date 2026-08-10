import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '@/hooks/useFormState';
import { AuthPageLayout } from '@/components/layouts/AuthPageLayout';
import { Button } from '@/components/common/Button';
import { InputField } from '@/components/common/InputField';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useFormState();
  const [email, setEmail] = useState<string>("");

  const handleSendOTP = (event: React.FormEvent) => {
    event.preventDefault();
    startLoading();

    setTimeout(() => {
      stopLoading();
      alert("OTP code has been sent to your email!");
      navigate('/verify-otp');
    }, 300);
  };

  return (
    <AuthPageLayout
      title="Verify Email"
      subtitle="Enter your email address to receive verification OTP"
      isLoading={isLoading}
      className="flex flex-col space-y-3.5"
      footer={{
        questionText: "Don't have an account?",
        actionText: 'Sign Up',
        onActionClick: () => navigate('/register'),
        className: 'space-y-3 translate-y-14',
      }}
    >

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

    </AuthPageLayout>
  );
};
