import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import iconHeart from '@/assets/icons/heart-blue.png';
import iconArrowRight from '@/assets/icons/arrow-right.png';
import iconGoogle from '@/assets/icons/logo-google.png';
import iconApple from '@/assets/icons/logo-apple.png';
import { Icon } from '@/components/Icons/Icon';

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
      disabled={disabled || isLoading}
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        favoriteStyle,
        className,
      )}
      {...props}
    >
      {isLoading && (
        <Icon name="spinner" className="w-4 h-4 animate-spin" />
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

          {!socialIcon && variant !== 'favorite' && leftIcon && (
            <span className="shrink-0">{leftIcon}</span>
          )}
        </>
      )}

      {variant === 'favorite' ? (
        leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : (
          <img
            src={iconHeart}
            alt="Favorite"
            className={`w-4 h-4 transition-all duration-200 object-contain ${
              isFavorite
                ? 'brightness-0 invert scale-110'
                : 'opacity-70 hover:opacity-100'
            }`}
          />
        )
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
