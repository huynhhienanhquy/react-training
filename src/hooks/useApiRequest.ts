import { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
/* eslint-disable react-hooks/set-state-in-effect */

interface UseApiRequestResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useApiRequest = <T>(
  requestFn: () => Promise<T>,
): UseApiRequestResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await requestFn();

      setData(result);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.message ??
            err.message ??
            'Server connection error',
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to retrieve data.');
      }
    } finally {
      setLoading(false);
    }
  }, [requestFn]);

  useEffect(() => {
    void execute();
  }, [execute]);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
};
