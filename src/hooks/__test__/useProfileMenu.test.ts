import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useProfileMenu } from '@/hooks/useProfileMenu';

describe('useProfileMenu', () => {
  it('starts closed', () => {
    const { result } = renderHook(() => useProfileMenu());

    expect(result.current.isOpen).toBe(false);
  });

  it('toggle opens and closes the menu', () => {
    const { result } = renderHook(() => useProfileMenu());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('open and close control the menu directly', () => {
    const { result } = renderHook(() => useProfileMenu());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('closes when clicking outside', () => {
    const { result } = renderHook(() => useProfileMenu());

    const div = document.createElement('div');
    Object.defineProperty(result.current.ref, 'current', {
      value: div,
      writable: true,
    });

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);

    const event = new MouseEvent('mousedown', { bubbles: true });

    act(() => {
      document.dispatchEvent(event);
    });

    expect(result.current.isOpen).toBe(false);
  });
});
