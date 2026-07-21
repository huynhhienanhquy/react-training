import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/auth/AuthLayout';
import { getAuthErrorMessage } from '../utils/authHelpers';
import iconGoogle from '../assets/icons/logo-google.png';
import iconApple from '../assets/icons/logo-apple.png';
import { SocialButton } from '../components/ui/button/SocialButton';
import { Button } from '../components/ui/button/Button';
import { InputField } from '../components/ui/input/InputField';
import { AuthHeader } from '../components/auth/AuthHeader';
import { AuthFooter } from '../components/auth/AuthFooter';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError("");
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setApiError(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* 1. Header */}
      <AuthHeader
        title="Continue Planning Your Trips"
        subtitle="We're happy you're back. Let's get back to planning your adventures"
      />

      <form className="space-y-6" onSubmit={handleLogin}>
        {/* 2. Email Field */}
        <InputField
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* 3. Password Field & Forgot Password */}
        <div className="space-y-1">
          <InputField
            label="Password"
            isPassword={true}
            placeholder="Enter your password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Button Forgot Password */}
          <div className="text-right pt-1">
            <span
              onClick={() => navigate('/forgot-password')}
              className="text-[14px] font-bold text-[#0d1b3e] hover:text-blue-600 cursor-pointer transition"
            >
              Forgot Password?
            </span>
          </div>
        </div>

        {apiError && (
          <p className="text-sm text-red-500 font-medium px-1 bg-red-50/50 rounded-lg py-1 border border-red-100/40 text-center">
            {apiError}
          </p>
        )}

        {/* 4. Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <SocialButton
            icon={iconGoogle}
            label="Continue with Google"
            altText="Google"
            onClick={() => console.log('Google')}
          />
          <SocialButton
            icon={iconApple}
            label="Continue with Apple"
            altText="Apple"
            onClick={() => console.log('Apple')}
          />
        </div>

        {/* 5. Submit Button */}
        <Button isLoading={isLoading} showArrow={true}>
          Sign In
        </Button>
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
