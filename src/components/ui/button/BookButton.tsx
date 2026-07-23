import React from 'react';

interface BookButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'wide';
}

export const BookButton: React.FC<BookButtonProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses = variant === 'wide'
    ? 'px-5 md:px-6 py-2.5'
    : 'px-3 md:px-4 py-2';

  return (
    <button
      className={`${baseClasses} bg-[#EEF2FF] hover:bg-blue-600 hover:text-white text-blue-600 text-xs md:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
