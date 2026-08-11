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
        'relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center px-4 py-8 sm:px-6 lg:py-0 lg:pl-12 lg:pr-8 min-[1440px]:pl-0',
        inset ? 'min-[1440px]:pr-6' : 'min-[1440px]:pr-0',
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
        <div className={twMerge(
          'absolute hidden w-full space-y-5 p-4 text-white lg:block lg:w-45 xl:w-1/2',
          inset ? 'bottom-16 left-4' : 'bottom-[68px] left-[38px]',
        )}>
          <h1 className="max-w-[650px] text-3xl font-bold leading-1.2 tracking-tight xl:text-5xl xl:leading-[64px]">
            Discover Amazing Deals & Thrilling Adventures
          </h1>

          <p className="max-w-[650px] text-sm font-normal leading-9 text-gray-100 lg:text-2xl">
            Tripal is designed to ease trip and vacation planning. Explore amazing deals and offers
          </p>
        </div>

        {/* Outer Glassmorphic Border Card */}
        <div className={twMerge(
          'flex w-full max-w-400 shrink-0 flex-col rounded-auth-sm bg-white/15 p-1.5 shadow-auth backdrop-blur-md sm:max-w-460 sm:rounded-auth sm:p-2 md:max-w-540 lg:ml-auto lg:h-[976px] lg:w-580 lg:max-w-none xl:w-[684px]',
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
