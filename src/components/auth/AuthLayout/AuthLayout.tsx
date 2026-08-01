import React from 'react';
import { LoadingOverlay } from '@/components/Loading/LoadingOverlay';
import authBg from '@/assets/images/background.png';
import { type AuthLayoutProps } from '@/types/auth';

export const AuthLayout = ({
  children,
  isLoading = false,
}: AuthLayoutProps) => {
  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center px-4 sm:px-6 lg:pl-12 lg:pr-8 py-8 lg:py-0 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      {/* LoadingOverlay */}
      <LoadingOverlay isVisible={isLoading} />

      {/* Background Dim */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-1440 min-h-screen flex items-center justify-center lg:justify-end">

        {/* TEXT ON THE LEFT */}
        <div className="absolute bottom-120 left-0 w-full lg:w-[45%] xl:w-[50%] text-white space-y-2 p-4 hidden lg:block">
          <h1 className="text-3xl xl:text-display-md font-bold leading-1.2 tracking-tight">
            Discover Amazing Deals & Thrilling Adventures
          </h1>

          <p className="text-sm lg:text-base text-gray-200 font-light max-w-480">
            Tripal is designed to ease trip and vacation planning. Explore amazing deals and offers
          </p>
        </div>

        {/* Outer Glassmorphic Border Card */}
        <div className="w-full max-w-400 sm:max-w-460 md:max-w-540 lg:w-580 xl:w-680 lg:max-w-none lg:h-980 lg:ml-auto p-1.5 sm:p-2 rounded-auth-sm sm:rounded-auth bg-white/15 backdrop-blur-md shadow-auth shrink-0 flex flex-col">

          {/* Inner White Form Card */}
          <div className="relative w-full h-full bg-white rounded-auth-inner-sm sm:rounded-auth-inner p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm flex flex-col min-h-0 overflow-y-auto">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};
