import { useState, useEffect, useCallback } from 'react';

export const useCountdown = (initialSeconds: number) => {
  const [counter, setCounter] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const reset = useCallback(() => {
    setCounter(initialSeconds);
  }, [initialSeconds]);

  return { counter, reset };
};
