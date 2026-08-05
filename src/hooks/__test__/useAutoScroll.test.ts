import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAutoScroll } from '../useAutoScroll';

describe('useAutoScroll', () => {
  it('returns a ref and scrollToBottom function', () => {
    const { result } = renderHook(() => useAutoScroll(1));

    expect(result.current.ref).toBeDefined();
    expect(result.current.scrollToBottom).toBeInstanceOf(Function);
  });

  it('calls scrollIntoView when scrollToBottom is called', () => {
    const scrollIntoViewMock = vi.fn();
    const div = document.createElement('div');
    div.scrollIntoView = scrollIntoViewMock;

    const { result } = renderHook(() => useAutoScroll(1));

    // Assign the mock element to the ref
    Object.defineProperty(result.current.ref, 'current', { value: div, writable: true });

    act(() => {
      result.current.scrollToBottom();
    });

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('scrolls only when the trigger changes', () => {
    const scrollIntoViewMock = vi.fn();
    const div = document.createElement('div');
    div.scrollIntoView = scrollIntoViewMock;
    const { result, rerender } = renderHook(
      ({ trigger }) => useAutoScroll(trigger),
      { initialProps: { trigger: 1 } },
    );
    Object.defineProperty(result.current.ref, 'current', { value: div, writable: true });

    rerender({ trigger: 1 });
    expect(scrollIntoViewMock).not.toHaveBeenCalled();

    rerender({ trigger: 2 });
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
  });

  it('scrolls when the secondary trigger changes', () => {
    const scrollIntoViewMock = vi.fn();
    const div = document.createElement('div');
    div.scrollIntoView = scrollIntoViewMock;
    const { result, rerender } = renderHook(
      ({ typing }) => useAutoScroll('same-messages', typing),
      { initialProps: { typing: false } },
    );
    Object.defineProperty(result.current.ref, 'current', { value: div, writable: true });

    rerender({ typing: true });

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
  });
});
