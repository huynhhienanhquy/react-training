import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAutoScroll } from './useAutoScroll';

describe('useAutoScroll', () => {
  it('returns a ref and scrollToBottom function', () => {
    const { result } = renderHook(() => useAutoScroll([1]));

    expect(result.current.ref).toBeDefined();
    expect(result.current.scrollToBottom).toBeInstanceOf(Function);
  });

  it('calls scrollIntoView when scrollToBottom is called', () => {
    const scrollIntoViewMock = vi.fn();
    const div = document.createElement('div');
    div.scrollIntoView = scrollIntoViewMock;

    const { result } = renderHook(() => useAutoScroll([1]));

    // Assign the mock element to the ref
    Object.defineProperty(result.current.ref, 'current', { value: div, writable: true });

    act(() => {
      result.current.scrollToBottom();
    });

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
