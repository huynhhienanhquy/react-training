
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const GuestRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // If already logged in, you will automatically be entered into the main system.
  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
