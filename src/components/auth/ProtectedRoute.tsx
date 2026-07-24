import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Display the Loading screen while retrieving session information.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading Tripal Session...
      </div>
    );
  }

  // 2. If you are NOT logged in -> Redirect to the /login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3.If already logged in -> Allow access to child routers (Chats, Dashboard...)
  return <Outlet />;
};
