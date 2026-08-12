import { memo } from 'react';
import { type AuthFooterProps } from '@/types/auth';

export const AuthFooter = memo(function AuthFooter({
  questionText,
  actionText,
  onActionClick,
  className = '',
}: AuthFooterProps) {
  return (
    <div className={`text-center text-base text-gray-400 mt-8 md:mt-4 ${className}`}>
      {questionText}{" "}
      <span
        onClick={onActionClick}
        className="text-blue-700 font-bold hover:underline cursor-pointer ml-1 px-2 py-1 inline-block"
      >
        {actionText}
      </span>
    </div>
  );
});
