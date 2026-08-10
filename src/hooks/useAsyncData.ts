import { useCallback, useEffect, useRef, useState, type DependencyList } from 'react';
import { getErrorMessage } from '@/utils/errorHelpers';

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
  const isMountedRef = useRef(true);
  const requestIdRef = useRef(0);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      requestIdRef.current += 1;
    };
  }, []);

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

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await fetchFnRef.current();

      if (!isMountedRef.current || requestId !== requestIdRef.current) return;

      setState({
        data,
        loading: false,
        error: null,
      });
    } catch (err: unknown) {
      if (!isMountedRef.current || requestId !== requestIdRef.current) return;

      setState({
        data: null,
        loading: false,
        error: getErrorMessage(err),
      });
    }
  // Callers can explicitly declare the values that change the request while
  // inline fetch functions remain safe from identity-only refetch loops.
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo
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
