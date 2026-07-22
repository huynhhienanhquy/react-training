// src/components/chat/Topbar.tsx
import React from 'react';
import { StartNewChatButton } from '../ui/button/StartNewChatButton';

interface TopbarProps {
  // Mode hiển thị breadcrumb (dùng cho các trang như Select Fare)
  isBreadcrumbMode?: boolean;
  chatTitle?: string;
  onBackToChat?: () => void;

  // Props mặc định cho màn hình Chat
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
      {/* Khối bên trái: Breadcrumb HOẶC Tiêu đề trang */}
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
            <span className="font-bold text-[#14153E]">Select Fare</span>
          </>
        ) : (
          <h2 className="text-base font-semibold text-slate-800">
          </h2>
        )}
      </div>

      {/* Nút Start New Chat dùng chung */}
      <StartNewChatButton onClick={onNewChat} />
    </header>
  );
};
