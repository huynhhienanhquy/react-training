// src/pages/ResetPassword.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Button } from '../components/ui/button/Button';
import { AuthHeader } from '../components/auth/AuthHeader';
import { InputField } from '../components/ui/input/InputField';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please check again.");
      return;
    }

    setIsLoading(true);

    // Giả lập gọi API cập nhật mật khẩu mới
    setTimeout(() => {
      setIsLoading(false);
      alert("Password reset successfully! Redirecting to Sign In...");
      navigate('/login');
    }, 300);
  };

  return (
    <AuthLayout isLoading={isLoading}>
      {/* 1. Header */}
      <AuthHeader
        title="Reset Password"
        subtitle="You’re all set. Please change your password now"
      />

      <form className="space-y-6" onSubmit={handleResetPassword} autoComplete="off">
        {/* 2. Trường nhập mật khẩu mới */}
        <InputField
          label="New Password"
          isPassword={true}
          placeholder="Enter your password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* 3. Trường xác nhận mật khẩu mới */}
        <InputField
          label="Confirm New Password"
          isPassword={true}
          placeholder="Confirm your password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* 4. Thông báo lỗi nếu mật khẩu không khớp */}
        {error && (
          <p className="text-sm text-red-500 font-medium px-1 bg-red-50/50 rounded-lg py-1 border border-red-100/40 text-center">
            {error}
          </p>
        )}

        {/* 5. Nút submit dùng chung */}
        <div className="pt-2">
          <Button type="submit" isLoading={isLoading} showArrow={true}>
            Save and Continue to Sign In
          </Button>
        </div>
      </form>

      {/* 6. Footer */}
      <div className="text-center text-[15px] text-gray-400 mt-12">
        Don't have an account?{" "}
        <span
          onClick={() => navigate('/register')}
          className="text-[#1d4ed8] font-bold hover:underline cursor-pointer ml-1"
        >
          Sign Up
        </span>
      </div>
    </AuthLayout>
  );
};
