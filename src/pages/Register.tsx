// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { SocialButton } from '../components/ui/button/SocialButton';
import iconGoogle from '../assets/icons/logo-google.png';
import iconApple from '../assets/icons/logo-apple.png';
import iconEye from '../assets/icons/eye.png';
import { Button } from '../components/ui/button/Button';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Giả lập gọi API đăng ký hệ thống
    setTimeout(() => {
      setIsLoading(false);

      // ✅ Đã sửa: Chuyển hướng người dùng sang trang onboarding sau khi đăng ký thành công
      navigate('/onboarding');

    }, 2000);
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* 1. Header */}
      <div className="space-y-2 mb-10">
        <h2 className="text-[32px] font-bold text-[#0d1b3e] tracking-tight">
          Unlock Your Next Adventure
        </h2>
        <p className="text-[15px] text-gray-400 font-normal">
          Create a free account to start planning trips with Tripal
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
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

        {/* 3. The password input field has a toggle switch that can be hidden or shown. */}
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
              className="absolute inset-y-0 right-4 flex items-center justify-center transition active:scale-95"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={iconEye}
                alt="Toggle Password"
                className={`w-5 h-5 object-contain transition-opacity ${showPassword ? 'opacity-40' : 'opacity-80 hover:opacity-100'}`}
              />
            </button>
          </div>
        </div>

        {/* 4. Terms of Service (Checkbox) */}
        <div className="flex items-start gap-3 py-1">
          <input
            type="checkbox"
            id="terms"
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-400 select-none cursor-pointer leading-tight">
            I agree to the <span className="text-[#1d4ed8] font-bold hover:underline">Terms of Service</span> and <span className="text-[#1d4ed8] font-bold hover:underline">Privacy Policy</span>
          </label>
        </div>

        {/* 5. Button Social Login */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <SocialButton
            icon={iconGoogle}
            label="Continue with Google"
            altText="Google"
            className="!bg-[#edf2fe] !border-none !text-[#2563eb] font-bold py-3.5 rounded-xl"
            onClick={() => console.log('Register with Google')}
          />
          <SocialButton
            icon={iconApple}
            label="Continue with Apple"
            altText="Apple"
            className="!bg-[#edf2fe] !border-none !text-[#2563eb] font-bold py-3.5 rounded-xl"
            onClick={() => console.log('Register with Apple')}
          />
        </div>

        {/* 6. Button submit  */}
        <Button isLoading={isLoading}>
          Create a Free Account &rarr;
        </Button>
      </form>

      {/* 7. The footer redirects to Sign In. */}
      <div className="text-center text-[15px] text-gray-400 mt-12">
        Already have an account?{" "}
        <span
          onClick={() => navigate('/onboarding')} // Redirect to the Login page
          className="text-[#1d4ed8] font-bold hover:underline cursor-pointer ml-1"
        >
          Sign In
        </span>
      </div>
    </AuthLayout>
  );
};
