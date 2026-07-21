import React from 'react';
import { LoadingOverlay } from '../ui/LoadingOverlay';
import authBg from '../../assets/images/background.png';

interface AuthLayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, isLoading = false }) => {
  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center p-6 md:p-12 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      {/* LoadingOverlay covers the FULL SCREEN  */}
      <LoadingOverlay isVisible={isLoading} />

      {/* Dark gradient overlay at the bottom corner */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1280px] h-full flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left column: Text on background */}
        <div className="w-full md:w-[45%] text-white space-y-4 p-4 self-end mb-6 hidden md:block">
          <h1 className="text-4xl lg:text-[44px] font-bold leading-[1.2] tracking-tight">
            Discover Amazing Deals & Thrilling Adventures
          </h1>
          <p className="text-base text-gray-200 font-light max-w-[480px]">
            Tripal is designed to ease trip and vacation planning. Explore amazing deals and offers
          </p>
        </div>

        {/* Right column: White card containing the form */}
        <div className="relative w-full md:w-[500px] lg:w-[540px] bg-white rounded-[32px] p-8 md:p-12 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[600px]">
          {children}
        </div>

      </div>
    </div>
  );
};
