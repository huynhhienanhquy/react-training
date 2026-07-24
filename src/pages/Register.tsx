import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '../hooks/useFormState';
import { AuthLayout } from '../components/auth/AuthLayout';
import iconGoogle from '../assets/icons/logo-google.png';
import iconApple from '../assets/icons/logo-apple.png';
import { Button } from '../components/ui/Button';
import { AuthHeader } from '../components/auth/AuthHeader';
import { InputField } from '../components/ui/InputField';
import { AuthFooter } from '../components/auth/AuthFooter';

export const Register: React.FC = () => {
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
      {/* 1. Header */}
      <AuthHeader
        title="Unlock Your Next Adventure"
        subtitle="Create a free account to start planning trips with Tripal"
      />

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* 2. Email input field */}
        <InputField
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* 3. The password input field has a toggle switch that can be hidden or shown. */}
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        {/* 4. Terms of Service (Checkbox) */}
        <div className="flex items-start gap-3 py-1">
          <input
            type="checkbox"
            id="terms"
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-400 select-none cursor-pointer leading-tight">
            I agree to the <span className="text-blue-700 font-bold hover:underline">Terms of Service</span> and <span className="text-blue-700 font-bold hover:underline">Privacy Policy</span>
          </label>
        </div>

        {/* 5. Button Social Login */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Button variant="social" size="md" leftIcon={<img src={iconGoogle} alt="Google" className="w-5 h-5 object-contain" />} onClick={() => console.log('Register with Google')}>
            Continue with Google
          </Button>
          <Button variant="social" size="md" leftIcon={<img src={iconApple} alt="Apple" className="w-5 h-5 object-contain" />} onClick={() => console.log('Register with Apple')}>
            Continue with Apple
          </Button>
        </div>

        {/* 6. Button submit  */}
        <Button isLoading={isLoading} rightIcon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}>
          Create a Free Account
        </Button>
      </form>

      {/* 7. The footer redirects to Sign In. */}
      <AuthFooter
        questionText="Already have an account?"
        actionText="Sign In"
        onActionClick={() => navigate('/login')}
      />
    </AuthLayout>
  );
};
