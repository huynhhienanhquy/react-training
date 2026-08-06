import { useCallback, useEffect, useRef } from 'react';

export const useAutoScroll = (
  trigger: unknown,
  secondaryTrigger?: unknown,
) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, trigger, secondaryTrigger]);

  return { ref, scrollToBottom };
};
