import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  className = '',
  disabled,
  type = 'submit',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`w-full py-4 bg-[#1d4ed8] hover:bg-blue-700 text-white rounded-xl text-base font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] ${className}`}
      {...props}
    >
      {isLoading ? (
        // The spinning effect occurs when you click submit and wait for the API.
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};
