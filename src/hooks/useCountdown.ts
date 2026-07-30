import { useState, useEffect, useCallback } from 'react';

export const useCountdown = (initialSeconds: number) => {
  const [counter, setCounter] = useState(initialSeconds);

  useEffect(() => {
    if (counter <= 0) return;
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);

  const reset = useCallback(() => {
    setCounter(initialSeconds);
  }, [initialSeconds]);

  return { counter, reset };
};
