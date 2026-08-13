import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAsyncData } from '@/hooks/useAsyncData';
import { AxiosError } from 'axios';
import {
  createElement,
  StrictMode,
  type ReactNode,
} from 'react';

describe('useAsyncData', () => {
  it('has correct initial loading state', () => {
    const fetchFn = vi.fn().mockResolvedValue('data');

    const { result } = renderHook(() => useAsyncData(fetchFn));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('handles successful data fetch', async () => {
    const fetchFn = vi.fn().mockResolvedValue('success');

    const { result } = renderHook(() => useAsyncData(fetchFn));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe('success');
    expect(result.current.error).toBeNull();
  });

  it('handles error with AxiosError', async () => {
    const error = new AxiosError('Network Error');
    const fetchFn = vi.fn().mockRejectedValue(error);

    const { result } = renderHook(() => useAsyncData(fetchFn));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Network Error');
  });

  it('refetches data manually', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce('first')
      .mockResolvedValueOnce('second');

    const { result } = renderHook(() => useAsyncData(fetchFn));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.data).toBe('first');

    act(() => {
      result.current.refetch();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe('second');
    expect(result.current.error).toBeNull();
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('does not fetch when skip is true', async () => {
    const fetchFn = vi.fn().mockResolvedValue('data');

    const { result } = renderHook(() =>
      useAsyncData(fetchFn, { skip: true }),
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(fetchFn).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('does not refetch manually when skip is true', () => {
    const fetchFn = vi.fn().mockResolvedValue('data');

    const { result } = renderHook(() =>
      useAsyncData(fetchFn, { skip: true }),
    );

    act(() => {
      result.current.refetch();
    });

    expect(fetchFn).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });

  it('starts fetching when skip changes from true to false', async () => {
    const fetchFn = vi.fn().mockResolvedValue('data');

    const { result, rerender } = renderHook(
      ({ skip }) => useAsyncData(fetchFn, { skip }),
      {
        initialProps: {
          skip: true,
        },
      },
    );

    expect(fetchFn).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);

    rerender({ skip: false });

    await act(async () => {
      await Promise.resolve();
    });

    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe('data');
    expect(result.current.error).toBeNull();
  });

  it('aborts the previous request when refetching', () => {
    const signals: AbortSignal[] = [];

    const fetchFn = vi.fn((signal: AbortSignal) => {
      signals.push(signal);

      return new Promise<string>(() => undefined);
    });

    const { result } = renderHook(() => useAsyncData(fetchFn));

    expect(signals).toHaveLength(1);
    expect(signals[0].aborted).toBe(false);

    act(() => {
      result.current.refetch();
    });

    expect(signals).toHaveLength(2);
    expect(signals[0].aborted).toBe(true);
    expect(signals[1].aborted).toBe(false);
  });

  it('aborts the active request on unmount', () => {
    let signal: AbortSignal | undefined;

    const fetchFn = vi.fn((requestSignal: AbortSignal) => {
      signal = requestSignal;

      return new Promise<string>(() => undefined);
    });

    const { unmount } = renderHook(() => useAsyncData(fetchFn));

    expect(signal?.aborted).toBe(false);

    unmount();

    expect(signal?.aborted).toBe(true);
  });

  it('ignores the result of an aborted previous request', async () => {
    let resolveFirstRequest!: (value: string) => void;

    const firstRequest = new Promise<string>((resolve) => {
      resolveFirstRequest = resolve;
    });

    const fetchFn = vi
      .fn()
      .mockReturnValueOnce(firstRequest)
      .mockResolvedValueOnce('second');

    const { result } = renderHook(() => useAsyncData(fetchFn));

    act(() => {
      result.current.refetch();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.data).toBe('second');

    await act(async () => {
      resolveFirstRequest('first');
      await Promise.resolve();
    });

    // The aborted first request must not overwrite
    // the result from the second request.
    expect(result.current.data).toBe('second');
  });

  it('finishes loading when effects are replayed by StrictMode', async () => {
    const fetchFn = vi.fn().mockResolvedValue('strict-mode-data');

    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(StrictMode, null, children);

    const { result } = renderHook(() => useAsyncData(fetchFn), {
      wrapper,
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe('strict-mode-data');
    expect(result.current.error).toBeNull();
  });
});