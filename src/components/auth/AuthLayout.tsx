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
      className="font-helvetica min-h-screen w-full relative flex items-center justify-center pl-6 pr-4 md:pl-12 md:pr-8 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      {/* LoadingOverlay covers the FULL SCREEN  */}
      <LoadingOverlay isVisible={isLoading} />

      {/* Dark gradient overlay at the bottom corner */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1440px] h-full flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left column: Text on background */}
        <div className="w-full md:w-[45%] text-white space-y-4 p-4 self-end mb-6 hidden md:block">
          <h1 className="text-4xl lg:text-display-md font-bold leading-[1.2] tracking-tight">
            Discover Amazing Deals & Thrilling Adventures
          </h1>
          <p className="text-base text-gray-200 font-light max-w-[480px]">
            Tripal is designed to ease trip and vacation planning. Explore amazing deals and offers
          </p>
        </div>

        {/* Right column: White card containing the form */}
        <div className="ml-auto p-1.5 rounded-5xl bg-white/20 border border-white/70 shadow-auth backdrop-blur-md w-full md:w-[540px] lg:w-[640px]">

          {/* Card  */}
          <div className="relative w-full bg-white rounded-4xl p-8 md:p-12 shadow-sm flex flex-col justify-between min-h-[620px]">
            {children}
          </div>

        </div>

      </div>
    </div>
  );
};
