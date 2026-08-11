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
      className="sticky top-0 z-10 flex min-h-16 w-full shrink-0 items-center justify-between gap-2 border-b border-slate-200/80 bg-white/80 py-2 pl-16 pr-3 shadow-sm backdrop-blur-md transition-colors duration-200 dark:border-slate-700/80 dark:bg-slate-900/90 dark:shadow-black/30 md:min-h-0 md:px-6 md:py-5 min-[1440px]:h-[84px] min-[1440px]:min-h-[84px] min-[1440px]:px-10 min-[1440px]:py-0">
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
        <div className="shrink-0">
          <Button
            variant="primary"
            size="md"
            className="h-10 w-10 !p-0 sm:h-auto sm:w-auto sm:!px-5 sm:!py-3 min-[1440px]:h-[52px] min-[1440px]:!px-4 min-[1440px]:!py-0 min-[1440px]:text-base"
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
