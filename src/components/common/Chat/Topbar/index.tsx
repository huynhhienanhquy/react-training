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
      className="sticky top-0 z-10 flex min-h-16 w-full shrink-0 items-center justify-between gap-2 border-b border-slate-200/80 bg-white/80 py-2 pl-16 pr-3 shadow-sm backdrop-blur-md transition-colors duration-200 dark:border-slate-700/80 dark:bg-slate-900/90 dark:shadow-black/30 md:min-h-0 md:px-6 md:py-5 min-[1440px]:h-[88px] min-[1440px]:min-h-[88px] min-[1440px]:pb-0 min-[1440px]:pl-[26px] min-[1440px]:pr-11 min-[1440px]:pt-0">
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
              className="hidden max-w-120 truncate font-normal text-slate-500 transition hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 md:inline md:max-w-200 min-[1440px]:text-lg"
              onClick={onBackToChat}
              title={displayTitle}
            >
              {displayTitle}
            </Button>
            <span className="hidden text-slate-400 dark:text-slate-400 md:inline min-[1440px]:px-1 min-[1440px]:text-lg">&gt;</span>
            <span className="truncate text-xs font-medium text-slate-800 dark:text-slate-50 md:text-sm min-[1440px]:text-lg">{breadcrumbLabel}</span>
          </>
        ) : (
          <h2 className="max-w-120 truncate text-sm font-semibold text-slate-800 dark:text-slate-50 md:max-w-md md:text-base min-[1440px]:text-lg">
            {displayTitle}
          </h2>
        )}
      </div>

      {onNewChat && (
        <div className="shrink-0">
          <Button
            variant="primary"
            size="md"
            className="h-10 w-10 !p-0 sm:h-auto sm:w-auto sm:!px-5 sm:!py-3 min-[1440px]:h-14 min-[1440px]:!px-5 min-[1440px]:!py-0 min-[1440px]:text-base min-[1440px]:font-medium"
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
