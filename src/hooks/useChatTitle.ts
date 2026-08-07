import { useMemo } from 'react';
import type { ChatMessage } from '@/types/chat';

export const useChatTitle = (
  chatTitle?: string,
  messages: ChatMessage[] = [],
  fallback = '',
): string => {
  return useMemo(() => {
    const firstUserMessage = messages.find(
      (m) => m.sender === 'user',
    )?.text;

    return chatTitle || firstUserMessage || fallback;
  }, [chatTitle, messages, fallback]);
};
