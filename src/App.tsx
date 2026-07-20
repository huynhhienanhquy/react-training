import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

// Import Guards
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { GuestRoute } from './components/auth/GuestRoute';

// Import Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Onboarding } from './pages/Onboarding';
import { ForgotPassword } from './pages/ForgotPassword';
import { VerifyOTP } from './pages/VerifyOTP';
import { ResetPassword } from './pages/ResetPassword';

import { useAuth } from './hooks/useAuth';


// The simulated main page after successful login.
const DashboardMock = () => {
  const { logout, user } = useAuth();
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold">Welcome to Tripal Main App! ✈️</h1>
      <p className="text-slate-600 mt-2">Hello, {user?.email}</p>
      <button onClick={logout} className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg">
        Log Out
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public pages (Not logged in) */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Protected pages (Login required) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<DashboardMock />} />
          </Route>

          {/* Default navigation if URL is entered incorrectly */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
