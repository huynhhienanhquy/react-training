import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '../../hooks/useFormState';
import { AuthLayout } from '../../components/SectionAuthentication/AuthLayout';
import iconGoogle from '../../assets/icons/logo-google.png';
import iconApple from '../../assets/icons/logo-apple.png';
import { Button } from '../../components/Button/Button';
import { AuthHeader } from '../../components/SectionAuthentication/AuthHeader';
import { InputField } from '../../components/Input/InputField';
import { AuthFooter } from '../../components/SectionAuthentication/AuthFooter';

export const Register = () => {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useFormState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();

    setTimeout(() => {
      stopLoading();
      navigate('/onboarding');
    }, 300);
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* 1. Header  */}
      <AuthHeader
        title="Unlock Your Next Adventure"
        subtitle="Create a free account to start planning trips with Tripal"
      />

      {/* 2. Form*/}
      <form className="space-y-3.5 my-auto" onSubmit={handleSubmit}>
        {/* Email input field */}
        <InputField
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password input field */}
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Terms of Service (Checkbox) */}
        <div className="flex items-start gap-2.5 py-0.5">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer shrink-0"
            required
          />
          <label htmlFor="terms" className="text-xs sm:text-sm text-gray-500 select-none cursor-pointer leading-tight">
            I agree to the <span className="text-blue-700 font-bold hover:underline">Terms of Service</span> and <span className="text-blue-700 font-bold hover:underline">Privacy Policy</span>
          </label>
        </div>

        {/* Button Social Login */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Button
            type="button"
            variant="social"
            size="md"
            leftIcon={<img src={iconGoogle} alt="Google" className="w-5 h-5 object-contain" />}
            onClick={() => { /* TODO: Implement Google login */ }}
          >
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="social"
            size="md"
            leftIcon={<img src={iconApple} alt="Apple" className="w-5 h-5 object-contain" />}
            onClick={() => { /* TODO: Implement Apple login */ }}
          >
            Continue with Apple
          </Button>
        </div>

        {/* 3. Button + Footer  */}
        <div className="flex flex-col gap-0.5">
          <Button
            type="submit"
            isLoading={isLoading}
            rightIcon={
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            }
          >
            Create a Free Account
          </Button>

          <AuthFooter
            questionText="Already have an account?"
            actionText="Sign In"
            onActionClick={() => navigate('/login')}
          />
        </div>
      </form>
    </AuthLayout>
  );
};
