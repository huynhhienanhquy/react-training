import React, { memo, useCallback, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icons/Icon';

type InputFieldProps = {
  label: string;
  error?: string;
  wrapperClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = memo(function InputField({
  label,
  type = 'text',
  className = '',
  id,
  error,
  wrapperClassName,
  ...props
}: InputFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);

  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword
    ? showPassword
      ? 'text'
      : 'password'
    : type;

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className={twMerge('relative mb-10 flex flex-col space-y-2', wrapperClassName)}>
      <label htmlFor={inputId} className="text-sm2 font-medium text-brand-dark-alt lg:text-base">
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          id={inputId}
          type={inputType}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : props['aria-describedby']}
          className={`w-full rounded-xl border border-gray-100 px-5 py-3.5 transition placeholder:text-gray-300 focus:outline-none ${
            isPassword
              ? 'bg-blue-50/40 pr-12 focus:border-blue-400 focus:bg-blue-50/50'
              : 'bg-gray-50/30 focus:border-blue-500'
          } ${className}`}
        />

        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute inset-y-0 right-4 h-auto w-auto p-0 select-none active:scale-95 md:h-auto md:w-auto"
            onClick={handleTogglePassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              width={20}
              height={20}
              className="text-gray-400"
              aria-hidden="true"
            />
          </Button>
        )}
      </div>

      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="text-sm text-red-500 font-medium px-1"
        >
          {error}
        </p>
      )}
    </div>
  );
});

