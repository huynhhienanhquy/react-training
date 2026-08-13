
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from './context/ThemeProvider';

// Import Guards
import { ProtectedRoute } from './routes/guards/ProtectedRoute';
import { GuestRoute } from './routes/guards/GuestRoute';

// Import Pages
import { Login } from './pages/Authentication/Login/Login';
import { Register } from './pages/Authentication/Register/Register';
import { Onboarding } from './pages/Authentication/Onboarding/Onboarding';
import { ForgotPassword } from './pages/Authentication/ForgotPassword/ForgotPassword';
import { VerifyOTP } from './pages/Authentication/VerifyOTP/VerifyOTP';
import { ResetPassword } from './pages/Authentication/ResetPassword/ResetPassword';
import { ChatPage } from './pages/Dashboard/Chat/ChatPage';
import { SelectFarePage } from './pages/Dashboard/Flight/SelectFarePage';
import { SelectHotelPage } from './pages/Dashboard/Hotel/SelectHotelPage';
import { DashboardLayout } from './components/layouts/DashboardLayout';
import { ComingSoonPage } from './pages/Dashboard/ComingSoonPage';
import { AuthLayout } from './components/common/Auth/AuthLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public pages (Not logged in) */}
          <Route element={<GuestRoute />}>
            <Route element={<AuthLayout inset heroInset />}>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            <Route element={<AuthLayout inset heroInset />}>
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>

          {/* Protected pages (Logged in) */}
          <Route
            element={(
              <ThemeProvider>
                <ProtectedRoute />
              </ThemeProvider>
            )}
          >
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<ChatPage />} />
              <Route path="/chats" element={<ChatPage />} />
              <Route path="/chats/fares" element={<SelectFarePage />} />
              <Route path="/chats/hotels" element={<SelectHotelPage />} />
              <Route path="/favorites" element={<ComingSoonPage />} />
              <Route path="/rewards" element={<ComingSoonPage />} />
              <Route path="/routes-map" element={<ComingSoonPage />} />
              <Route path="/community" element={<ComingSoonPage />} />
              <Route path="/settings" element={<ComingSoonPage />} />
            </Route>
          </Route>

          {/* Default navigation when URL is invalid */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={4000} />
      </AuthProvider>
    </BrowserRouter>
  );
};

