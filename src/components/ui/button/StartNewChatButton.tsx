import React from 'react';
import iconAdd from '../../../assets/icons/add-light.png'

interface StartNewChatButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

export const StartNewChatButton: React.FC<StartNewChatButtonProps> = ({
  onClick,
  label = 'Start New Chat',
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-semibold rounded-xl shadow-sm transition active:scale-95 ${className}`}
    >
      <img src={iconAdd} alt="Add" className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};
