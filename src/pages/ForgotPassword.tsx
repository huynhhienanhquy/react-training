import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Button } from '../components/ui/button/Button';

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
    }, 1500);
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* 1. Title Section: Synchronize font style and spacing */}
      <div className="space-y-2 mb-10">
        <h2 className="text-[32px] font-bold text-[#0d1b3e] tracking-tight">
          Verify Email
        </h2>
        <p className="text-[15px] text-gray-400 font-normal">
          Enter your email address to receive verification OTP
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSendOTP} autoComplete="off">
        {/* 2. Email input field */}
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

        {/* 3. Submit button: Use the Button component*/}
        <div className="pt-4">
          <Button type="submit" isLoading={isLoading}>
            Send OTP &rarr;
          </Button>
        </div>
      </form>

      {/* 4. Footer navigation */}
      <div className="text-center text-[15px] text-gray-400 mt-12">
        Don't have an account?{" "}
        <span
          onClick={() => navigate('/register')} // Navigate through the Register
          className="text-[#1d4ed8] font-bold hover:underline cursor-pointer ml-1"
        >
          Sign Up
        </span>
      </div>
    </AuthLayout>
  );
};
