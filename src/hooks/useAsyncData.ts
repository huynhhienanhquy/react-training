import { useCallback, useEffect, useRef, useState } from 'react';
import { getErrorMessage } from '@/utils/errorHelpers';

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
  fetchFn: (signal: AbortSignal) => Promise<T>,
  options?: UseAsyncDataOptions,
): UseAsyncDataReturn<T> => {
  const { skip = false } = options ?? {};

  const [state, setState] = useState<AsyncDataState<T>>({
    data: null,
    loading: !skip,
    error: null,
  });

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

  const fetchData = useCallback(async () => {
    if (skip) {
      return;
    }

    // Cancel previous request
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const data = await fetchFn(controller.signal);

      if (
        controller.signal.aborted ||
        !isMountedRef.current ||
        requestId !== requestIdRef.current
      ) {
        return;
      }

      setState({
        data,
        loading: false,
        error: null,
      });
    } catch (err: unknown) {
      if (
        controller.signal.aborted ||
        !isMountedRef.current ||
        requestId !== requestIdRef.current
      ) {
        return;
      }

      setState({
        data: null,
        loading: false,
        error: getErrorMessage(err),
      });
    }
  }, [fetchFn, skip]);

  useEffect(() => {
    if (skip) {
      return;
    }

    let cancelled = false;

    queueMicrotask(() => {
      if (!cancelled) {
        void fetchData();
      }
    });

    return () => {
      cancelled = true;
      abortControllerRef.current?.abort();
    };
  }, [fetchData, skip]);

  return {
    ...state,
    refetch: fetchData,
  };
};