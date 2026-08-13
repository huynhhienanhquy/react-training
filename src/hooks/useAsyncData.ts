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
  fetchFn: (signal: AbortSignal) => Promise<T>,
  options?: UseAsyncDataOptions,
): UseAsyncDataReturn<T> => {
  const { skip = false, dependencies = [] } = options ?? {};
  const fetchFnRef = useRef(fetchFn);
  const isMountedRef = useRef(true);
  const requestIdRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      requestIdRef.current += 1;
      abortControllerRef.current?.abort();
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
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await fetchFnRef.current(controller.signal);

      if (!isMountedRef.current || requestId !== requestIdRef.current) return;

      setState({
        data,
        loading: false,
        error: null,
      });
    } catch (err: unknown) {
      if (controller.signal.aborted) return;
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

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData, skip]);

  return {
    ...state,
    refetch: fetchData,
  };
};
