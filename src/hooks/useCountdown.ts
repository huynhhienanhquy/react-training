import { useState, useEffect, useCallback } from 'react';

export const useCountdown = (initialSeconds: number) => {
  const [counter, setCounter] = useState(initialSeconds);
  const isRunning = counter > 0;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCounter((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const reset = useCallback(() => {
    setCounter(initialSeconds);
  }, [initialSeconds]);

  return { counter, reset };
};
