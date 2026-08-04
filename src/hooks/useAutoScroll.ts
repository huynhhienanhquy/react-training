import { useEffect, useRef } from 'react';

export const useAutoScroll = (deps: unknown[]) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    // The caller intentionally controls which values trigger scrolling.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ref, scrollToBottom };
};
