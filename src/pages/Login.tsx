import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthLayout } from '../components/auth/AuthLayout';
import { getAuthErrorMessage } from '../utils/authHelpers';
import iconGoogle from '../assets/icons/logo-google.png';
import iconApple from '../assets/icons/logo-apple.png';
import iconEye from '../assets/icons/eye.png';
import { SocialButton } from '../components/ui/button/SocialButton';
import { Button } from '../components/ui/button/Button';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="space-y-2 mb-10">
        <h2 className="text-[32px] font-bold text-[#0d1b3e] tracking-tight">
          Continue Planning Your Trips
        </h2>
        <p className="text-[15px] text-gray-400 font-normal">
          We're happy you're back. Let's get back to planning your adventures
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        {/* 2. Email Field */}
        <div className="flex flex-col space-y-2">
          <label className="text-[15px] font-bold text-[#0d1b3e]">
            Email address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-gray-50/30 text-base focus:outline-none focus:border-blue-500 transition placeholder:text-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* 3. Password Field */}
        <div className="flex flex-col space-y-2 relative">
          <label className="text-[15px] font-bold text-[#0d1b3e]">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="new-password"
              className="w-full px-5 py-3.5 rounded-xl border border-gray-100 bg-blue-50/40 text-base focus:outline-none focus:border-blue-400 focus:bg-blue-50/50 transition placeholder:text-gray-300 tracking-widest font-mono pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center justify-center transition active:scale-95 select-none"
            >
              <img
                src={iconEye}
                alt="Toggle Password"
                className={`w-5 h-5 object-contain transition-opacity ${showPassword ? 'opacity-40' : 'opacity-80 hover:opacity-100'}`}
              />
            </button>
          </div>

          {/* Button Forgot Password */}
          <div className="text-right pt-1">
            <span
              onClick={() => navigate('/forgot-password')}
              className="text-[14px] font-bold text-[#0d1b3e] hover:text-blue-600 cursor-pointer transition"
            >
              Forgot Password
            </span>
          </div>
        </div>

        {apiError && (
          <p className="text-sm text-red-500 font-medium">{apiError}</p>
        )}

        {/* 4. Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <SocialButton
            icon={iconGoogle}
            label="Continue with Google"
            altText="Google"
            className="!bg-[#edf2fe] !border-none !text-[#2563eb] font-bold py-3.5 rounded-xl"
            onClick={() => console.log('Google')}
          />
          <SocialButton
            icon={iconApple}
            label="Continue with Apple"
            altText="Apple"
            className="!bg-[#edf2fe] !border-none !text-[#2563eb] font-bold py-3.5 rounded-xl"
            onClick={() => console.log('Apple')}
          />
        </div>

        {/* 5. Submit Button */}
        <Button isLoading={isLoading}>
          Create a Free Account &rarr;
        </Button>
      </form>

      {/* 6. Footer */}
      <div className="text-center text-[15px] text-gray-400 mt-12">
        Already have an account?{" "}
        <span
          onClick={() => navigate('/register')}
          className="text-[#1d4ed8] font-bold hover:underline cursor-pointer ml-1"
        >
          Sign In
        </span>
      </div>
    </AuthLayout>
  );
};
