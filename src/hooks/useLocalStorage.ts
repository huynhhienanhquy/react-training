import { useState, useCallback } from 'react';

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [error, setError] = useState<string | null>(null);
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : (initialValue ?? null);
    } catch {
      return initialValue ?? null;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setError(null);
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        setError(`Unable to save "${key}" to local storage.`);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      setError(null);
      setStoredValue(null);
      localStorage.removeItem(key);
    } catch {
      setError(`Unable to remove "${key}" from local storage.`);
    }
  }, [key]);

  return { value: storedValue, setValue, removeValue, error };
};
