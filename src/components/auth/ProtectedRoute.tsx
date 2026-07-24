import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Hiển thị màn hình Loading trong lúc lấy thông tin phiên làm việc
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading Tripal Session...
      </div>
    );
  }

  // 2. Nếu CHƯA đăng nhập -> Chuyển hướng về trang /login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Nếu ĐÃ đăng nhập -> Cho phép truy cập vào các Router con (Chats, Dashboard...)
  return <Outlet />;
};
