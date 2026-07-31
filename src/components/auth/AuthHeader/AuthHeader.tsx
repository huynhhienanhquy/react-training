import {type AuthHeaderProps}  from '../../../types/auth'


export const AuthHeader = ({
  title,
  subtitle,
  className = '',
}: AuthHeaderProps) => {
  return (
    <div className={`space-y-2 mb-6 md:mb-10 ${className}`}>
      <h2 className="text-2xl md:text-display-sm font-bold text-brand-dark-alt tracking-tight">
        {title}
      </h2>
      <p className="text-sm md:text-sm2 text-gray-400 font-normal">
        {subtitle}
      </p>
    </div>
  );
};
