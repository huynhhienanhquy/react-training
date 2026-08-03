import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setTimeoutCallback = useCallback(
    (callback: () => void, delay: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(callback, delay);
    },
    [],
  );

  const clearTimeoutCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    setTimeoutCallback,
    clearTimeoutCallback,
  };
};
