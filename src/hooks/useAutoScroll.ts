import { useEffect, useRef } from 'react';

export const useAutoScroll = (deps: unknown[]) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, deps);

  return { ref, scrollToBottom };
};
