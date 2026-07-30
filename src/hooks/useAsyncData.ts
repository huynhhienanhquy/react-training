import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';

interface AsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAsyncDataReturn<T> extends AsyncDataState<T> {
  refetch: () => void;
}

export const useAsyncData = <T>(
  fetchFn: () => Promise<T>,
  options?: { transform?: (raw: T) => T; skip?: boolean }
): UseAsyncDataReturn<T> => {
  const [state, setState] = useState<AsyncDataState<T>>({
    data: null,
    loading: !options?.skip,
    error: null,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const rawData = await fetchFn();
      const data = options?.transform ? options.transform(rawData) : rawData;
      setState({ data, loading: false, error: null });
    } catch (err: unknown) {
      let message = 'Unable to retrieve data.';
      if (err instanceof AxiosError) {
        message = err.response?.data?.message || err.message || 'Server connection error';
      } else if (err instanceof Error) {
        message = err.message;
      }
      setState({ data: null, loading: false, error: message });
    }
  }, []);

  useEffect(() => {
    if (!options?.skip) {
      fetch();
    }
  }, [fetch, options?.skip]);

  return { ...state, refetch: fetch };
};
