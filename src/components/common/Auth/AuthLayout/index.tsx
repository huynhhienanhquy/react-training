import { LoadingOverlay } from '@/components/common/Loading';
import authBackground from '@/assets/images/auth-background.png';
import { type AuthLayoutProps } from '@/types/auth';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export const AuthLayout = ({
  children,
  isLoading = false,
}: AuthLayoutProps) => {
  useEffect(() => {
    const root = document.documentElement;
    const shouldRestoreDarkMode = root.classList.contains('dark');
    const previousColorScheme = root.style.colorScheme;

    root.classList.remove('dark');
    root.style.colorScheme = 'light';

    return () => {
      root.classList.toggle('dark', shouldRestoreDarkMode);
      root.style.colorScheme = previousColorScheme;
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center px-4 sm:px-6 lg:pl-12 lg:pr-8 py-8 lg:py-0 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${authBackground})` }}
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
        <div className="absolute bottom-120 left-0 w-full lg:w-45 xl:w-1/2 text-white space-y-2 p-4 hidden lg:block">
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
          <div className="relative flex min-h-full w-full flex-col rounded-auth-inner-sm bg-white p-6 shadow-sm sm:rounded-auth-inner sm:p-8 md:p-10 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:p-12">
            {children ?? <Outlet />}
          </div>

        </div>
      </div>
    </div>
  );
};
