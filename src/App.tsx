
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

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

export const App = () => {
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

          {/* Protected pages (Logged in) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<ChatPage />} />
            <Route path="/chats" element={<ChatPage />} />
            <Route path="/chats/fares" element={<SelectFarePage />} />
            <Route path="/chats/hotels" element={<SelectHotelPage />} />
          </Route>

          {/* Default navigation when URL is invalid */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

