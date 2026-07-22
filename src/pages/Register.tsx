import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { SocialButton } from '../components/ui/button/SocialButton';
import iconGoogle from '../assets/icons/logo-google.png';
import iconApple from '../assets/icons/logo-apple.png';
import { Button } from '../components/ui/button/Button';
import { AuthHeader } from '../components/auth/AuthHeader';
import { InputField } from '../components/ui/input/InputField';
import { AuthFooter } from '../components/auth/AuthFooter';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

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
            isPassword={true}
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
        <div className="grid grid-cols-2 gap-4 pt-2">
          <SocialButton
            icon={iconGoogle}
            label="Continue with Google"
            altText="Google"
            onClick={() => console.log('Register with Google')}
          />
          <SocialButton
            icon={iconApple}
            label="Continue with Apple"
            altText="Apple"
            onClick={() => console.log('Register with Apple')}
          />
        </div>

        {/* 6. Button submit  */}
        <Button isLoading={isLoading}>
          Create a Free Account &rarr;
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
