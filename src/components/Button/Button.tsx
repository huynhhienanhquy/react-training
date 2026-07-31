import type { ButtonHTMLAttributes, ReactNode } from 'react';
import iconHeart from '../../assets/icons/heart-blue.png';
import iconArrowRight from '../../assets/icons/arrow-right.png';
import iconGoogle from '../../assets/icons/logo-google.png';
import iconApple from '../../assets/icons/logo-apple.png';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'social'
  | 'dark'
  | 'ghost'
  | 'danger'
  | 'favorite';

type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

type SocialIcon = 'google' | 'apple';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showArrow?: boolean;
  socialIcon?: SocialIcon;
  isLoading?: boolean;
  isFavorite?: boolean;
  children?: ReactNode;
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

  danger:
    'bg-red-600 hover:bg-red-700 text-white',

  favorite: '',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 md:px-4 py-2 text-xs md:text-sm rounded-xl',
  md: 'px-5 py-3 text-sm rounded-xl',
  lg: 'w-full py-4 text-base rounded-xl',
  icon: 'w-10 h-10 md:w-9 md:h-9 rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'lg',
  leftIcon,
  rightIcon,
  showArrow = false,
  socialIcon,
  isLoading = false,
  isFavorite = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const favoriteStyle =
    variant === 'favorite'
      ? isFavorite
        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
        : 'bg-[#EEF2FF] hover:bg-blue-100'
      : '';

  return (
    <button
      disabled={disabled || isLoading}
      className={`font-bold transition-all duration-200 flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] cursor-pointer
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${favoriteStyle}
        ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}

      {!isLoading && (
        <>
          {socialIcon === 'google' && (
            <img
              src={iconGoogle}
              alt="Google"
              className="w-5 h-5 object-contain"
            />
          )}

          {socialIcon === 'apple' && (
            <img
              src={iconApple}
              alt="Apple"
              className="w-5 h-5 object-contain"
            />
          )}

          {!socialIcon && leftIcon && (
            <span className="shrink-0">{leftIcon}</span>
          )}
        </>
      )}

      {variant === 'favorite' ? (
        <img
          src={iconHeart}
          alt="Favorite"
          className={`w-4 h-4 transition-all duration-200 object-contain ${
            isFavorite
              ? 'brightness-0 invert scale-110'
              : 'opacity-70 hover:opacity-100'
          }`}
        />
      ) : (
        <>
          <span>{children}</span>

          {showArrow && (
            <img
              src={iconArrowRight}
              alt=""
              className="w-4 h-4 object-contain"
            />
          )}

          {!showArrow && rightIcon && (
            <span className="shrink-0">{rightIcon}</span>
          )}
        </>
      )}
    </button>
  );
}

