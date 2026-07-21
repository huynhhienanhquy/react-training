import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Button } from '../components/ui/button/Button';
import { InputField } from '../components/ui/input/InputField';
import { AuthHeader } from '../components/auth/AuthHeader';
import { AuthFooter } from '../components/auth/AuthFooter';


export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate successful OTP delivery, then redirect to another page.
    setTimeout(() => {
      setIsLoading(false);
      alert("OTP code has been sent to your email!");
      navigate('/verify-otp');
    }, 300);
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* 1. Title Section: Synchronize font style and spacing */}
      <AuthHeader
        title="Verify Email"
        subtitle="Enter your email address to receive verification OTP"
      />

      <form className="space-y-6" onSubmit={handleSendOTP} autoComplete="off">
        {/* 2. Email input field */}
        <InputField
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* 3. Submit button: Use the Button component*/}
        <div className="pt-4">
          <Button type="submit" isLoading={isLoading}>
            Send OTP &rarr;
          </Button>
        </div>
      </form>

      {/* 4. Footer navigation */}
      <AuthFooter
        questionText="Don't have an account?"
        actionText="Sign Up"
        onActionClick={() => navigate('/register')}
      />
    </AuthLayout>
  );
};
