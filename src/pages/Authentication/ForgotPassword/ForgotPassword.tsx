import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '@/hooks/useFormState';
import { AuthPageLayout } from '@/components/layouts/AuthPageLayout';
import { Button } from '@/components/common/Button';
import { InputField } from '@/components/common/InputField';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useFormState();
  const [email, setEmail] = useState<string>("");
  const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), []);
  const handleSignUp = useCallback(() => navigate('/register'), [navigate]);

  const handleSendOTP = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    startLoading();

    setTimeout(() => {
      stopLoading();
      alert("OTP code has been sent to your email!");
      navigate('/verify-otp');
    }, 300);
  }, [navigate, startLoading, stopLoading]);

  return (
    <AuthPageLayout
      title="Verify Email"
      subtitle="Enter your email address to receive verification OTP"
      isLoading={isLoading}
      className="flex flex-col"
      footer={{
        questionText: "Don't have an account?",
        actionText: 'Sign Up',
        onActionClick: handleSignUp,
        className: 'space-y-3',
      }}
    >

        {/* 2. Form */}
        <form className="mt-8 space-y-4" onSubmit={handleSendOTP} autoComplete="off">
          <InputField
            label="Email address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <Button
            className="mt-2"
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
