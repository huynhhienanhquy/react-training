import { memo } from 'react';
import ArrowLeftIcon from '@/components/common/Icons/ArrowLeftIcon';
import { Button } from '@/components/common/Button';
import AddIcon from '@/components/common/Icons/AddIcon';

export type { ChatMessage } from '@/types/chat';
import { type TopbarProps } from "@/types/chat";


export const Topbar = memo(function Topbar({
  isBreadcrumbMode = false,
  breadcrumbLabel = 'Select Fare',
  chatTitle,
  messages = [],
  onBackToChat,
  onNewChat,
}: TopbarProps) {
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
      className="w-full flex items-center justify-between sticky top-0 z-10 shrink-0 border-b transition-colors duration-200 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-slate-200/80 dark:border-slate-700/80 px-4 md:px-6 py-6 shadow-sm dark:shadow-black/30">
      <div className="flex items-center gap-1 md:gap-2 text-sm min-w-0">
        {isBreadcrumbMode ? (
          <>
            {onBackToChat && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden w-8 h-8 rounded-xl shrink-0"
                onClick={onBackToChat}
                leftIcon={<ArrowLeftIcon className="w-4 h-4 text-slate-600 dark:text-slate-100" />}
              />
            )}
            <Button
              type="button"
              variant="ghost"
              size="none"
              className="hidden md:inline text-slate-500 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition truncate max-w-120 md:max-w-200"
              onClick={onBackToChat}
              title={displayTitle}
            >
              {displayTitle}
            </Button>
            <span className="text-slate-400 dark:text-slate-400 hidden md:inline">&gt;</span>
            <span className="font-bold text-slate-800 dark:text-slate-50 truncate text-xs md:text-sm">{breadcrumbLabel}</span>
          </>
        ) : (
          <h2 className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-50 truncate max-w-120 md:max-w-md">
            {displayTitle}
          </h2>
        )}
      </div>

      {onNewChat && (
        <div className="-translate-x-4 -translate-y-2">
          <Button
            variant="primary"
            size="md"
            leftIcon={
              <AddIcon
                aria-label="Add"
                className="w-5 h-5"
              />
            }
            onClick={onNewChat}
          >
            <span className="hidden sm:inline">Start New Chat</span>
          </Button>
        </div>
      )}
    </header>
  );
});
