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
      <h2 className="text-display-sm font-bold text-brand-dark-alt tracking-tight">
        {title}
      </h2>
      <p className="text-sm2 text-gray-400 font-normal">
        {subtitle}
      </p>
    </div>
  );
};
