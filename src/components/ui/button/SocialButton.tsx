import React from 'react';

interface SocialButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
  altText?: string;
  className?: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  label,
  onClick,
  altText = 'icon',
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`auth-btn-social flex items-center justify-center gap-2.5 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition active:scale-[0.98] ${className}`}
    >
      <img src={icon} className="w-5 h-5 object-contain" alt={altText} />
      <span className="text-xs">{label}</span>
    </button>
  );
};
