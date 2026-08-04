import { useEffect, useRef } from 'react';

export const useAutoScroll = (messages: unknown[], isTyping: boolean) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return { ref, scrollToBottom };
};
