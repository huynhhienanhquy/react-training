import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useCountdown } from './useCountdown';

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('countdown decrements', () => {
    const { result } = renderHook(() => useCountdown(10));

    expect(result.current.counter).toBe(10);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.counter).toBe(9);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.counter).toBe(7);
  });

  it('countdown stops at 0', () => {
    const { result } = renderHook(() => useCountdown(2));

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.counter).toBe(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.counter).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    // Should stay at 0, not go negative
    expect(result.current.counter).toBe(0);
  });

  it('tests reset functionality', () => {
    const { result } = renderHook(() => useCountdown(5));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.counter).toBe(3);

    act(() => {
      result.current.reset();
    });

    expect(result.current.counter).toBe(5);
  });

  it('starts counting again when reset after reaching zero', () => {
    const { result } = renderHook(() => useCountdown(1));

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.counter).toBe(0);

    act(() => result.current.reset());
    act(() => vi.advanceTimersByTime(1000));

    expect(result.current.counter).toBe(0);
  });
});
