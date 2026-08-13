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

  const isMountedRef = useRef(true);
  const requestIdRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [state, setState] = useState<AsyncDataState<T>>({
    data: null,
    loading: !skip,
    error: null,
  });

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      requestIdRef.current += 1;
      abortControllerRef.current?.abort();
    };
  }, []);

  const executeFetch = useCallback(
    async (controller: AbortController, requestId: number) => {
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
    },
    [fetchFn],
  );

  const refetch = useCallback(() => {
    if (skip) return;

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

    void executeFetch(controller, requestId);
  }, [executeFetch, skip]);

  useEffect(() => {
    if (skip) return;

    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    void executeFetch(controller, requestId);

    return () => {
      controller.abort();
    };
  }, [executeFetch, skip]);

  return {
    ...state,
    refetch,
  };
};