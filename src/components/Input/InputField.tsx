import React, { useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Icon } from '@/components/Icons/Icon';

type InputFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = ({
  label,
  type = 'text',
  className = '',
  ...props
}: InputFieldProps) => {
  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col space-y-2 relative mb-10">
      <label className="text-sm2 font-bold text-brand-dark-alt">
        {label}
      </label>
      <div className="relative">
        <input
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
            tabIndex={-1}
          >
            {showPassword ? (
              <Icon name="eye-off" className="w-5 h-5 text-gray-400" />
            ) : (
              <Icon name="eye" className="w-5 h-5 text-gray-400" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
