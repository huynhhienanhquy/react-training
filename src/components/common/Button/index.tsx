import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import HeartIcon from '@/components/common/Icons/HeartIcon';
import ArrowRightIcon from '@/components/common/Icons/ArrowRightIcon';
import googleIcon from '@/assets/images/google-logo.png';
import appleIcon from '@/assets/images/apple-logo.png';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'social'
  | 'dark'
  | 'ghost'
  | 'danger'
  | 'favorite'
  | 'light'
  | 'outline';

type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'none';

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
  favoriteIconSize?: number;
  children?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-hover hover:to-primary-dark-hover text-white shadow-md shadow-blue-500/20',

  secondary:
    'bg-primary-light hover:bg-blue-600 hover:text-white text-blue-600',

  social:
    'bg-social-bg hover:bg-blue-100/70 text-blue-600',

  dark:
    'bg-slate-900 hover:bg-blue-600 text-white shadow-md hover:shadow-blue-500/25',

  ghost:
    'bg-transparent hover:bg-slate-100 text-slate-700',

  danger:
    'bg-red-600 hover:bg-red-700 text-white',

  favorite: '',

  light:
    'bg-surface-section hover:bg-blue-100 text-blue-600',

  outline:
    'bg-white hover:bg-slate-50 text-slate-600 border border-slate-100 shadow-sm',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 md:px-4 py-2 text-xs md:text-sm rounded-xl',
  md: 'px-5 py-3 text-sm rounded-xl',
  lg: 'w-full py-4 text-base rounded-xl',
  icon: 'w-10 h-10 md:w-9 md:h-9 rounded-xl',
  none: '',
};

const baseStyles =
  'font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-99 cursor-pointer';

export function Button({
  variant = 'primary',
  size = 'lg',
  leftIcon,
  rightIcon,
  showArrow = false,
  socialIcon,
  isLoading = false,
  isFavorite = false,
  favoriteIconSize = 16,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const favoriteStyle =
    variant === 'favorite'
      ? isFavorite
        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
        : 'bg-primary-light hover:bg-blue-100'
      : '';

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      aria-pressed={variant === 'favorite' ? isFavorite : props['aria-pressed']}
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        favoriteStyle,
        className,
      )}
    >
      {isLoading && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
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
              src={googleIcon}
              alt=""
              aria-hidden="true"
              className="h-5 w-4.75"
            />
          )}

          {socialIcon === 'apple' && (
            <img
              src={appleIcon}
              alt=""
              aria-hidden="true"
              className="h-6 w-4.75"
            />
          )}

          {!socialIcon && variant !== 'favorite' && leftIcon && (
            <span className="flex shrink-0 items-center justify-center leading-none">{leftIcon}</span>
          )}
        </>
      )}

      {variant === 'favorite' ? (
        leftIcon ? (
          <span className="flex shrink-0 items-center justify-center leading-none">{leftIcon}</span>
        ) : (
          <HeartIcon
            width={favoriteIconSize}
            height={favoriteIconSize}
            className={`text-primary transition-all duration-200 ${
              isFavorite
                ? 'scale-110 text-white'
                : 'opacity-70 group-hover:opacity-100'
            }`}
            aria-hidden="true"
          />
        )
      ) : (
        <>
          <span>{children}</span>

          {showArrow && (
            <span className="flex shrink-0 items-center justify-center leading-none">
              <ArrowRightIcon
                width={16}
                height={16}
                color="currentColor"
                aria-hidden="true"
              />
            </span>
          )}

          {!showArrow && rightIcon && (
            <span className="flex shrink-0 items-center justify-center leading-none">{rightIcon}</span>
          )}
        </>
      )}
    </button>
  );
}
