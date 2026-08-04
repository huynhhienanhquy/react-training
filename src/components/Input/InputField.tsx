import React, { useId, useState } from 'react';
import { Button } from '@/components/Button/Button';

type InputFieldProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = ({
  label,
  type = 'text',
  className = '',
  id,
  error,
  ...props
}: InputFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword
    ? showPassword
      ? 'text'
      : 'password'
    : type;

  const hasError = Boolean(error);

  const {
    'aria-describedby': ariaDescribedBy,
    ...inputProps
  } = props;

  return (
    <div className="relative mb-10 flex flex-col space-y-2">
      <label
        htmlFor={inputId}
        className="text-sm2 font-bold text-brand-dark-alt"
      >
        {label}
      </label>

      <div className="relative">
        <input
          {...inputProps}
          id={inputId}
          type={inputType}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={
            [ariaDescribedBy, hasError ? errorId : undefined]
              .filter(Boolean)
              .join(' ') || undefined
          }
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
            className="absolute inset-y-0 right-4 h-auto w-auto select-none p-0 active:scale-95 md:h-auto md:w-auto"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={
              showPassword ? 'Hide password' : 'Show password'
            }
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
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
};

