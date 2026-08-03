import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useClickOutside } from '../useClickOutside';

describe('useClickOutside', () => {
  it('calls handler on outside click', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler));

    const div = document.createElement('div');
    Object.defineProperty(result.current, 'current', { value: div, writable: true });

    // Simulating click outside
    const event = new MouseEvent('mousedown', { bubbles: true });
    document.dispatchEvent(event);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not call handler on inside click', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler));

    const div = document.createElement('div');
    const child = document.createElement('span');
    div.appendChild(child);

    Object.defineProperty(result.current, 'current', { value: div, writable: true });

    // Simulating click inside
    const event = new MouseEvent('mousedown', { bubbles: true });
    Object.defineProperty(event, 'target', { value: child });
    document.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
  });
});
