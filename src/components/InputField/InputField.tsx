import React, { useId, useState } from 'react';
import { Button } from '@/components/Button';

type InputFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = ({
  label,
  type = 'text',
  className = '',
  id,
  ...props
}: InputFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col space-y-2 relative mb-10">
      <label htmlFor={inputId} className="text-sm2 font-bold text-brand-dark-alt">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          className={`w-full px-5 py-3.5 rounded-xl border border-gray-100 transition placeholder:text-gray-300 focus:outline-none ${
            isPassword
              ? 'bg-blue-50/40 focus:border-blue-400 focus:bg-blue-50/50 pr-12'
              : 'bg-gray-50/30 focus:border-blue-500'
          } ${className}`}
          {...props}
        />

        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute inset-y-0 right-4 w-auto h-auto md:w-auto md:h-auto p-0 active:scale-95 select-none"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <svg aria-hidden="true" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg aria-hidden="true" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
