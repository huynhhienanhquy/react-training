import { useCallback, useEffect, useRef } from 'react';

export const useAutoScroll = (trigger: unknown) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, trigger]);

  return { ref, scrollToBottom };
};
