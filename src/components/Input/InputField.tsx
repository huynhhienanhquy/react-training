import React, { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
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

  const handleTogglePasswordVisibility = () => {
    setShowPassword((previousShowPassword) => !previousShowPassword);
  };

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
            onClick={handleTogglePasswordVisibility}
            aria-label={
              showPassword ? 'Hide password' : 'Show password'
            }
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <EyeOff
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            ) : (
              <Eye
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
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

