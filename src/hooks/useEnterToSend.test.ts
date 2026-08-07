import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { KeyboardEvent } from 'react';
import { useEnterToSend } from './useEnterToSend';

const makeKeyDown = (key: string, shiftKey = false) =>
  ({
    key,
    shiftKey,
    preventDefault: vi.fn(),
  }) as unknown as KeyboardEvent<HTMLTextAreaElement>;

describe('useEnterToSend', () => {
  it('sends on plain Enter', () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useEnterToSend(onSend));

    const event = makeKeyDown('Enter');

    act(() => {
      result.current(event);
    });

    expect(onSend).toHaveBeenCalledTimes(1);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('does not send on Enter with Shift', () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useEnterToSend(onSend));

    const event = makeKeyDown('Enter', true);

    act(() => {
      result.current(event);
    });

    expect(onSend).not.toHaveBeenCalled();
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('does not send on other keys', () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useEnterToSend(onSend));

    act(() => {
      result.current(makeKeyDown('a'));
    });

    expect(onSend).not.toHaveBeenCalled();
  });
});
