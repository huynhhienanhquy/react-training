import React from 'react';
import { StartNewChatButton } from '../ui/button/StartNewChatButton';

interface TopbarProps {
  // Mode display breadcrumb
  isBreadcrumbMode?: boolean;
  chatTitle?: string;
  onBackToChat?: () => void;

  // Default props for the Chat screen
  hasMessages?: boolean;
  onNewChat?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  isBreadcrumbMode = false,
  chatTitle = 'Cheap flights to Lagos',
  onBackToChat,
  onNewChat,
}) => {
  return (
    <header
      className="w-full flex items-center justify-between sticky top-0 z-10 shrink-0 border-b transition-colors bg-white/80 backdrop-blur-md border-slate-200/80 px-6 py-3.5 shadow-sm">
      {/* Left-hand block: Breadcrumb OR Page Title */}
      <div className="flex items-center gap-2 text-sm">
        {isBreadcrumbMode ? (
          <>
            <button
              onClick={onBackToChat}
              className="text-slate-500 hover:text-blue-600 font-medium transition"
            >
              {chatTitle}
            </button>
            <span className="text-slate-400">&gt;</span>
            <span className="font-bold text-brand-dark">Select Fare</span>
          </>
        ) : (
          <h2 className="text-base font-semibold text-slate-800">
          </h2>
        )}
      </div>

      {/* Button Start New */}
      <StartNewChatButton onClick={onNewChat} />
    </header>
  );
};
