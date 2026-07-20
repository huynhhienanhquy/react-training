import React from 'react';
import travelBg from '../../assets/images/background.png';

interface AuthLayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, isLoading }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-end overflow-hidden bg-slate-900 font-sans">

      {/* 1. BACKGROUND IMAGE */}
      <div className="fixed inset-0 w-full h-full z-0">
        <img
          src={travelBg}
          alt="Tripal Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* 2. TEXT LEFT */}
      <div className="absolute bottom-24 left-16 z-10 max-w-2xl text-white hidden lg:block select-none">
        <h1 className="text-[56px] font-bold tracking-tight leading-[1.1] mb-6">
          Discover Amazing Deals &<br />Thrilling Adventures
        </h1>
        <p className="text-lg text-white/90 max-w-xl font-normal leading-relaxed">
          Tripal is designed to ease trip and vacation planning. Explore amazing deals and offers.
        </p>
      </div>

      {/* 3.CARD FORM ON THE RIGHT  */}
      <div className="relative z-10 w-full max-w-[640px] h-[96vh] bg-white rounded-[40px] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.25)] p-12 md:p-14 mr-4 md:mr-6 my-auto flex flex-col justify-center transition-all duration-300">

        {isLoading && (
          <div className="absolute inset-0 bg-white/80 rounded-[40px] z-50 flex items-center justify-center backdrop-blur-[2px]">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="w-full text-slate-900">
          {children}
        </div>

      </div>

    </div>
  );
};
