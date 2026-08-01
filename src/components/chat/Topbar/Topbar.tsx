import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import iconAdd from '@/assets/icons/add-light.png';

export type { ChatMessage } from '../ChatMessageList/ChatMessageList';
import { type TopbarProps } from "@/types/chat";


export const Topbar = ({
  isBreadcrumbMode = false,
  chatTitle,
  messages = [],
  onBackToChat,
  onNewChat,
}: TopbarProps) => {
  const firstUserMessage = messages.find((m) => m.sender === 'user')?.text;
  const displayTitle =
    chatTitle ||
    (firstUserMessage
      ? firstUserMessage.length > 30
        ? `${firstUserMessage.slice(0, 30)}...`
        : firstUserMessage
      : '');

  return (
    <header
      className="w-full flex items-center justify-between sticky top-0 z-10 shrink-0 border-b transition-colors bg-white/80 backdrop-blur-md border-slate-200/80 px-4 md:px-6 py-6 shadow-sm">
      <div className="flex items-center gap-1 md:gap-2 text-sm min-w-0">
        {isBreadcrumbMode ? (
          <>
            {onBackToChat && (
              <button
                onClick={onBackToChat}
                className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-100 transition shrink-0"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
              </button>
            )}
            <button
              onClick={onBackToChat}
              className="hidden md:inline text-slate-500 hover:text-blue-600 font-medium transition truncate max-w-120 md:max-w-200"
              title={displayTitle}
            >
              {displayTitle}
            </button>
            <span className="text-slate-400 hidden md:inline">&gt;</span>
            <span className="font-bold text-slate-800 truncate text-xs md:text-sm">Select Fare</span>
          </>
        ) : (
          <h2 className="text-sm md:text-base font-semibold text-slate-800 truncate max-w-120 md:max-w-md">
            {displayTitle}
          </h2>
        )}
      </div>

      <div className="-translate-x-4 -translate-y-2">
        <Button
          variant="primary"
          size="md"
          leftIcon={
            <img
              src={iconAdd}
              alt="Add"
              className="w-5 h-5"
            />
          }
          onClick={onNewChat}
        >
          <span className="hidden sm:inline">Start New Chat</span>
        </Button>
      </div>
    </header>
  );
};
