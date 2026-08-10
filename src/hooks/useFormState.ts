import { useCallback, useState } from 'react';

export const useFormState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError,
  };
};
