import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ViewAllButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ViewAllButton: React.FC<ViewAllButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl text-xs md:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-blue-500/25 active:scale-[0.99] cursor-pointer ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  );
};
