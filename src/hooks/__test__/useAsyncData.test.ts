import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAsyncData } from '@/hooks/useAsyncData';

describe('useAsyncData', () => {
  it('has correct initial state', () => {
    const fetchFn = vi.fn().mockResolvedValue('data');

    const { result } = renderHook(() => useAsyncData(fetchFn));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('fetches data successfully', async () => {
    const fetchFn = vi.fn().mockResolvedValue('success');

    const { result } = renderHook(() => useAsyncData(fetchFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe('success');
    expect(result.current.error).toBeNull();
    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(fetchFn).toHaveBeenCalledWith(expect.any(AbortSignal));
  });

  it('handles fetch error', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('Fetch failed'));

    const { result } = renderHook(() => useAsyncData(fetchFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Fetch failed');
  });

  it('does not fetch when skip is true', async () => {
    const fetchFn = vi.fn().mockResolvedValue('data');

    const { result } = renderHook(() =>
      useAsyncData(fetchFn, {
        skip: true,
      }),
    );

    // Allow queued microtasks to complete
    await act(async () => {
      await Promise.resolve();
    });

    expect(fetchFn).not.toHaveBeenCalled();

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('refetches data manually', async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce('first')
      .mockResolvedValueOnce('second');

    const { result } = renderHook(() => useAsyncData(fetchFn));

    await waitFor(() => {
      expect(result.current.data).toBe('first');
    });

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toBe('second');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('sets loading to true while refetching', async () => {
    let resolveSecondRequest!: (value: string) => void;

    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce('first')
      .mockImplementationOnce(
        () =>
          new Promise<string>((resolve) => {
            resolveSecondRequest = resolve;
          }),
      );

    const { result } = renderHook(() => useAsyncData(fetchFn));

    await waitFor(() => {
      expect(result.current.data).toBe('first');
    });

    act(() => {
      void result.current.refetch();
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await act(async () => {
      resolveSecondRequest('second');
    });

    expect(result.current.data).toBe('second');
    expect(result.current.loading).toBe(false);
  });

  it('clears previous error when refetching', async () => {
    let resolveSecondRequest!: (value: string) => void;

    const fetchFn = vi
      .fn()
      .mockRejectedValueOnce(new Error('First request failed'))
      .mockImplementationOnce(
        () =>
          new Promise<string>((resolve) => {
            resolveSecondRequest = resolve;
          }),
      );

    const { result } = renderHook(() => useAsyncData(fetchFn));

    await waitFor(() => {
      expect(result.current.error).toBe('First request failed');
    });

    act(() => {
      void result.current.refetch();
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await act(async () => {
      resolveSecondRequest('success');
    });

    expect(result.current.data).toBe('success');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('aborts previous request when refetch is called', async () => {
    const signals: AbortSignal[] = [];

    const fetchFn = vi.fn((signal: AbortSignal) => {
      signals.push(signal);

      return new Promise<string>(() => {
        // Keep request pending
      });
    });

    const { result } = renderHook(() => useAsyncData(fetchFn));

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalledTimes(1);
    });

    expect(signals[0].aborted).toBe(false);

    act(() => {
      void result.current.refetch();
    });

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalledTimes(2);
    });

    expect(signals[0].aborted).toBe(true);
    expect(signals[1].aborted).toBe(false);
  });

  it('aborts active request when component unmounts', async () => {
    let signal!: AbortSignal;

    const fetchFn = vi.fn((requestSignal: AbortSignal) => {
      signal = requestSignal;

      return new Promise<string>(() => {
        // Keep pending until unmount
      });
    });

    const { unmount } = renderHook(() => useAsyncData(fetchFn));

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalledTimes(1);
    });

    expect(signal.aborted).toBe(false);

    unmount();

    expect(signal.aborted).toBe(true);
  });

  it('ignores result from an older request', async () => {
    let resolveFirst!: (value: string) => void;
    let resolveSecond!: (value: string) => void;

    const fetchFn = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<string>((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise<string>((resolve) => {
            resolveSecond = resolve;
          }),
      );

    const { result } = renderHook(() => useAsyncData(fetchFn));

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalledTimes(1);
    });

    act(() => {
      void result.current.refetch();
    });

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalledTimes(2);
    });

    // New request finishes first
    await act(async () => {
      resolveSecond('new data');
    });

    expect(result.current.data).toBe('new data');

    // Old request finishes later
    await act(async () => {
      resolveFirst('old data');
    });

    // Old request must not overwrite new data
    expect(result.current.data).toBe('new data');
  });

  it('ignores error from an aborted request', async () => {
    let rejectFirst!: (error: Error) => void;

    const fetchFn = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<string>((_, reject) => {
            rejectFirst = reject;
          }),
      )
      .mockResolvedValueOnce('success');

    const { result } = renderHook(() => useAsyncData(fetchFn));

    await waitFor(() => {
      expect(fetchFn).toHaveBeenCalledTimes(1);
    });

    act(() => {
      void result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.data).toBe('success');
    });

    await act(async () => {
      rejectFirst(new Error('Old request failed'));
    });

    expect(result.current.data).toBe('success');
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});