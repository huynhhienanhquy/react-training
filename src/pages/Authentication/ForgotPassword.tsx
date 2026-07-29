import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '../../hooks/useFormState';
import { AuthLayout } from '../../components/SectionAuthentication/AuthLayout';
import { Button } from '../../components/Button/Button';
import { InputField } from '../../components/TextField/InputField';
import { AuthHeader } from '../../components/SectionAuthentication/AuthHeader';
import { AuthFooter } from '../../components/SectionAuthentication/AuthFooter';

export const ForgotPassword: React.FC = () => {
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
        <form className="space-y-3" onSubmit={handleSendOTP} autoComplete="off">
          <InputField
            label="Email address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            isLoading={isLoading}
            rightIcon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            }
          >
            Send OTP Code
          </Button>
        </form>

        {/* 3. Footer link is right below the button*/}
        <AuthFooter
          questionText="Don't have an account?"
          actionText="Sign Up"
          onActionClick={() => navigate('/register')}
        />
      </div>
    </AuthLayout>
  );
};
