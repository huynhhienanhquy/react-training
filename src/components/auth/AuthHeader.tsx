import React from 'react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`space-y-2 mb-10 ${className}`}>
      <h2 className="text-[38px] font-bold text-[#0d1b3e] tracking-tight">
        {title}
      </h2>
      <p className="text-[15px] text-gray-400 font-normal">
        {subtitle}
      </p>
    </div>
  );
};
