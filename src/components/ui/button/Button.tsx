// src/components/ui/button/Button.tsx
import React from 'react';
import iconArrowRight from '../../../assets/icons/arrow-right.png'; // 💡 Đường dẫn icon mũi tên của bạn

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  showArrow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  showArrow = false,
  className = '',
  disabled,
  type = 'submit',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`w-full py-4 bg-[#1d4ed8] hover:bg-blue-700 text-white rounded-xl text-base font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] ${className}`}
      {...props}
    >
      <span>{children}</span>
      {showArrow && (
        <img
          src={iconArrowRight}
          alt="Arrow Right"
          className="w-4 h-4 object-contain"
        />
      )}
    </button>
  );
};
