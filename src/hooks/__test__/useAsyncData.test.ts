import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAsyncData } from '../useAsyncData';
import { AxiosError } from 'axios';

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
});
