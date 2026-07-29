import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <p className={`text-sm text-red-500 font-medium px-1 bg-red-50/50 rounded-lg py-1 border border-red-100/40 text-center ${className}`}>
      {message}
    </p>
  );
};
