import { useState } from 'react';

export const useFormState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError,
  };
};
