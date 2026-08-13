import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAsyncData } from '@/hooks/useAsyncData';
import { AxiosError } from 'axios';
import { createElement, StrictMode, type ReactNode } from 'react';

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
      await Promise.resolve(); // wait for fetch to complete
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe('success');
    expect(result.current.error).toBeNull();
  });

  it('handles error handling with AxiosError', async () => {
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

  it('tests refetch functionality', async () => {
    const fetchFn = vi.fn()
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

    expect(result.current.data).toBe('second');
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('does not refetch when an inline fetch function changes identity', async () => {
    const fetchFn = vi.fn().mockResolvedValue('data');
    const { rerender } = renderHook(() => useAsyncData(() => fetchFn()));

    await act(async () => {
      await Promise.resolve();
    });

    rerender();
    rerender();

    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('refetches when an explicit request dependency changes', async () => {
    const fetchFn = vi.fn().mockImplementation((id: number) =>
      Promise.resolve(`data-${id}`),
    );
    const { result, rerender } = renderHook(
      ({ id }) => useAsyncData(() => fetchFn(id), { dependencies: [id] }),
      { initialProps: { id: 1 } },
    );

    await act(async () => Promise.resolve());
    expect(result.current.data).toBe('data-1');

    rerender({ id: 2 });
    await act(async () => Promise.resolve());

    expect(result.current.data).toBe('data-2');
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('aborts the previous request when refetching', async () => {
    const signals: AbortSignal[] = [];
    const fetchFn = vi.fn((signal: AbortSignal) => {
      signals.push(signal);
      return new Promise<string>(() => undefined);
    });
    const { result } = renderHook(() => useAsyncData(fetchFn));

    expect(signals[0].aborted).toBe(false);

    act(() => {
      result.current.refetch();
    });

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

    unmount();

    expect(signal?.aborted).toBe(true);
  });

  it('finishes loading when effects are replayed by StrictMode', async () => {
    const fetchFn = vi.fn().mockResolvedValue('strict-mode-data');
    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(StrictMode, null, children);

    const { result } = renderHook(() => useAsyncData(fetchFn), { wrapper });

    await act(async () => Promise.resolve());

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe('strict-mode-data');
    expect(result.current.error).toBeNull();
  });
});
