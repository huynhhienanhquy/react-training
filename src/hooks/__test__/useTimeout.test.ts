import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useTimeout } from '@/hooks/useTimeout';

describe('useTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should call callback after the specified delay', () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useTimeout());

    act(() => {
      result.current.setTimeoutCallback(callback, 1000);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should clear previous timeout when setting a new timeout', () => {
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    const { result } = renderHook(() => useTimeout());

    act(() => {
      result.current.setTimeoutCallback(firstCallback, 1000);
    });

    act(() => {
      result.current.setTimeoutCallback(secondCallback, 2000);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('should clear timeout manually', () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useTimeout());

    act(() => {
      result.current.setTimeoutCallback(callback, 1000);
    });

    act(() => {
      result.current.clearTimeoutCallback();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should clear timeout when component unmounts', () => {
    const callback = vi.fn();

    const { result, unmount } = renderHook(() => useTimeout());

    act(() => {
      result.current.setTimeoutCallback(callback, 1000);
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should allow clearing timeout when no timeout exists', () => {
    const { result } = renderHook(() => useTimeout());

    expect(() => {
      act(() => {
        result.current.clearTimeoutCallback();
      });
    }).not.toThrow();
  });
});