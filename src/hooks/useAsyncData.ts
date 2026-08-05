import { useCallback, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';

/* eslint-disable react-hooks/set-state-in-effect */

interface AsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAsyncDataOptions {
  skip?: boolean;
}

interface UseAsyncDataReturn<T> extends AsyncDataState<T> {
  refetch: () => void;
}

export const useAsyncData = <T>(
  fetchFn: () => Promise<T>,
  options?: UseAsyncDataOptions,
): UseAsyncDataReturn<T> => {
  const { skip = false } = options ?? {};
  const fetchFnRef = useRef(fetchFn);

  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  const [state, setState] = useState<AsyncDataState<T>>({
    data: null,
    loading: !skip,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (skip) {
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await fetchFnRef.current();

      setState({
        data,
        loading: false,
        error: null,
      });
    } catch (err: unknown) {
      let message = 'Unable to retrieve data.';

      if (err instanceof AxiosError) {
        message =
          err.response?.data?.message ??
          err.message ??
          'Server connection error';
      } else if (err instanceof Error) {
        message = err.message;
      }

      setState({
        data: null,
        loading: false,
        error: message,
      });
    }
  }, [skip]);

  useEffect(() => {
    if (!skip) {
      void fetchData();
    }
  }, [fetchData, skip]);

  return {
    ...state,
    refetch: fetchData,
  };
};
