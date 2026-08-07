import React, { useId, useState } from 'react';
import { Button } from '@/components/Button';
import { Icon } from '@/components/icons/Icon';

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

  const inputType = isPassword
    ? showPassword
      ? 'text'
      : 'password'
    : type;

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative mb-10 flex flex-col space-y-2">
      <label htmlFor={inputId} className="text-sm2 font-bold text-brand-dark-alt">
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          className={`w-full rounded-xl border border-gray-100 px-5 py-3.5 transition placeholder:text-gray-300 focus:outline-none ${
            isPassword
              ? 'bg-blue-50/40 pr-12 focus:border-blue-400 focus:bg-blue-50/50'
              : 'bg-gray-50/30 focus:border-blue-500'
          } ${className}`}
          {...props}
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
              color="#9CA3AF"
              aria-hidden="true"
            />
          </Button>
        )}
      </div>
    </div>
  );
};
