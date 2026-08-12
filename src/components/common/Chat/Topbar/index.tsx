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
      className="sticky top-0 z-10 flex min-h-16 w-full shrink-0 items-center justify-between gap-2 border-b border-slate-200/80 bg-white/80 py-2 pl-16 pr-3 shadow-sm backdrop-blur-md transition-colors duration-200 dark:border-slate-700/80 dark:bg-slate-900/90 dark:shadow-black/30 md:min-h-0 md:px-6 md:py-5 desktop:h-22 desktop:min-h-22 desktop:pb-0 desktop:pl-6.5 desktop:pr-11 desktop:pt-0">
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
              className="hidden max-w-120 truncate font-normal text-slate-500 transition hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 md:inline md:max-w-200 desktop:text-lg"
              onClick={onBackToChat}
              title={displayTitle}
            >
              {displayTitle}
            </Button>
            <span className="hidden text-slate-400 dark:text-slate-400 md:inline desktop:px-1 desktop:text-lg">&gt;</span>
            <span className="truncate text-xs font-medium text-slate-800 dark:text-slate-50 md:text-sm desktop:text-lg">{breadcrumbLabel}</span>
          </>
        ) : (
          <h2 className="max-w-120 truncate text-sm font-semibold text-slate-800 dark:text-slate-50 md:max-w-md md:text-base desktop:text-lg">
            {displayTitle}
          </h2>
        )}
      </div>

      {onNewChat && (
        <div className="shrink-0">
          <Button
            variant="primary"
            size="none"
            className="rounded-xl flex h-13 w-new-chat min-w-new-chat shrink-0 items-center justify-center gap-2 p-0 text-base font-medium"
            leftIcon={
              <AddIcon
                aria-label="Add"
                className="size-5 shrink-0"
              />
            }
            onClick={onNewChat}
          >
            <span className="whitespace-nowrap">
              Start New Chat
            </span>
          </Button>
        </div>
      )}
    </header>
  );
});
