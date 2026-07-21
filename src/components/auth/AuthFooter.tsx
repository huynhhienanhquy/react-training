import React from 'react';

interface AuthFooterProps {
  questionText: string;
  actionText: string;
  onActionClick: () => void;
  className?: string;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({
  questionText,
  actionText,
  onActionClick,
  className = '',
}) => {
  return (
    <div className={`text-center text-[15px] text-gray-400 mt-12 ${className}`}>
      {questionText}{" "}
      <span
        onClick={onActionClick}
        className="text-[#1d4ed8] font-bold hover:underline cursor-pointer ml-1"
      >
        {actionText}
      </span>
    </div>
  );
};
