import { LoadingOverlay } from '@/components/common/Loading';
import authBackground from '@/assets/images/auth-background.png';
import { type AuthLayoutProps } from '@/types/auth';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export const AuthLayout = ({
  children,
  isLoading = false,
  inset = false,
  heroInset = false,
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
      className={twMerge(
        'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center px-4 py-8 sm:px-6 lg:py-0 lg:pl-12 lg:pr-8 desktop:pl-0',
        inset ? 'desktop:pr-6' : 'desktop:pr-0',
      )}
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
        <div
          className={twMerge(
            'absolute hidden w-auth-copy max-w-auth-copy-safe space-y-3 text-white lg:block',
            heroInset ? 'bottom-18 left-8' : 'bottom-21 left-13.5',
          )}
        >
          <h1 className="text-5xl font-bold leading-16 tracking-tight">
            Discover Amazing Deals & Thrilling Adventures
          </h1>

          <p className="text-2xl font-normal leading-9 text-gray-100">
            Tripal is designed to ease trip and vacation planning. Explore amazing deals and offers
          </p>
        </div>

        {/* Outer Glassmorphic Border Card */}
        <div className={twMerge(
          'flex w-full max-w-400 shrink-0 flex-col rounded-auth-sm bg-white/15 p-1.5 shadow-auth backdrop-blur-md sm:max-w-460 sm:rounded-auth sm:p-2 md:max-w-540 lg:ml-auto lg:h-976 lg:w-580 lg:max-w-none xl:w-684',
          !inset && 'lg:-translate-y-3',
        )}>

          {/* Inner White Form Card */}
          <div className="relative flex min-h-full w-full flex-col rounded-auth-inner-sm bg-white p-6 shadow-sm sm:rounded-auth-inner sm:p-8 md:p-10 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:p-10">
            {children ?? <Outlet />}
          </div>

        </div>
      </div>
    </div>
  );
};
