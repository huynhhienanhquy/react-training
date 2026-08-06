import { useCallback, useEffect, useRef, useState, type DependencyList } from 'react';
import { getErrorMessage } from '@/utils/errorHelpers';

/* eslint-disable react-hooks/set-state-in-effect */

interface AsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAsyncDataOptions {
  skip?: boolean;
  dependencies?: DependencyList;
}

interface UseAsyncDataReturn<T> extends AsyncDataState<T> {
  refetch: () => void;
}

export const useAsyncData = <T>(
  fetchFn: () => Promise<T>,
  options?: UseAsyncDataOptions,
): UseAsyncDataReturn<T> => {
  const { skip = false, dependencies = [] } = options ?? {};
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
      setState({
        data: null,
        loading: false,
        error: getErrorMessage(err),
      });
    }
  // Callers can explicitly declare the values that change the request while
  // inline fetch functions remain safe from identity-only refetch loops.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, ...dependencies]);

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
