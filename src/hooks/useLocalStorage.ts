import { useState, useCallback } from 'react';

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
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
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error(`Error setting localStorage key "${key}":`, e);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(null);
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing localStorage key "${key}":`, e);
    }
  }, [key]);

  return { value: storedValue, setValue, removeValue };
};
