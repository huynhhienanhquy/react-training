// src/components/ui/button/SocialButton.tsx
import React from 'react';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  altText?: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  label,
  altText = 'Social icon',
  className = '',
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`w-full bg-[#edf2fe] border-none text-[#2563eb] font-bold py-3.5 rounded-xl transition hover:bg-blue-100/70 active:scale-[0.98] flex items-center justify-center gap-2.5 ${className}`}
      {...props}
    >
      <img src={icon} alt={altText} className="w-5 h-5 object-contain" />
      <span className="text-sm">{label}</span>
    </button>
  );
};
