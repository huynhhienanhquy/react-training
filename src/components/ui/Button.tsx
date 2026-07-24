import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'social' | 'dark' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-[#3B62FF] to-[#1A47FF] hover:from-[#2A52EF] hover:to-[#0936EF] text-white shadow-md shadow-blue-500/20',
  secondary:
    'bg-[#EEF2FF] hover:bg-blue-600 hover:text-white text-blue-600',
  social:
    'bg-social-bg hover:bg-blue-100/70 text-blue-600',
  dark:
    'bg-slate-900 hover:bg-blue-600 text-white shadow-md hover:shadow-blue-500/25',
  ghost:
    'bg-transparent hover:bg-slate-100 text-slate-700',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 md:px-4 py-2 text-xs md:text-sm rounded-xl',
  md: 'px-5 py-3 text-sm rounded-xl',
  lg: 'w-full py-4 text-base rounded-xl',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] cursor-pointer
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}`}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
