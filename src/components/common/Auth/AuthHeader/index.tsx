import { memo } from 'react';
import { type AuthHeaderProps } from '@/types/auth';

export const AuthHeader = memo(function AuthHeader({
  title,
  subtitle,
  className = '',
}: AuthHeaderProps) {
  return (
    <div className={`mb-2 mt-6 space-y-2 md:mb-4 ${className}`}>
      <h2 className="text-2xl font-bold tracking-tight text-brand-dark-alt md:text-display-sm lg:text-[40px] lg:leading-[48px]">
        {title}
      </h2>

      <p className="text-sm font-normal text-gray-500 md:text-sm2 lg:text-lg lg:leading-6">
        {subtitle}
      </p>
    </div>
  );
});
