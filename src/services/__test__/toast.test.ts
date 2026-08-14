import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  dismissToast,
  getToasts,
  subscribeToToasts,
  toast,
} from '@/services/toast';

describe('toast service', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    dismissToast();
  });

  afterEach(() => {
    dismissToast();
    vi.useRealTimers();
  });

  it('creates a success toast', () => {
    const id = toast.success('Saved successfully');

    expect(id).toBe(1);
    expect(getToasts()).toEqual([
      {
        id,
        message: 'Saved successfully',
        type: 'success',
      },
    ]);
  });

  it('creates toast with correct type', () => {
    toast.error('Error message');
    toast.info('Info message');
    toast.warning('Warning message');

    expect(getToasts()).toEqual([
      {
        id: expect.any(Number),
        message: 'Error message',
        type: 'error',
      },
      {
        id: expect.any(Number),
        message: 'Info message',
        type: 'info',
      },
      {
        id: expect.any(Number),
        message: 'Warning message',
        type: 'warning',
      },
    ]);
  });

  it('dismisses a toast by id', () => {
    const firstId = toast.success('First');
    toast.error('Second');

    dismissToast(firstId);

    expect(getToasts()).toEqual([
      {
        id: expect.any(Number),
        message: 'Second',
        type: 'error',
      },
    ]);
  });

  it('dismisses all toasts when id is not provided', () => {
    toast.success('First');
    toast.error('Second');

    dismissToast();

    expect(getToasts()).toEqual([]);
  });

  it('automatically dismisses toast after default duration', () => {
    toast.success('Auto dismiss');

    expect(getToasts()).toHaveLength(1);

    vi.advanceTimersByTime(3999);
    expect(getToasts()).toHaveLength(1);

    vi.advanceTimersByTime(1);
    expect(getToasts()).toHaveLength(0);
  });

  it('uses custom duration', () => {
    toast.info('Custom duration', { duration: 1000 });

    vi.advanceTimersByTime(999);
    expect(getToasts()).toHaveLength(1);

    vi.advanceTimersByTime(1);
    expect(getToasts()).toHaveLength(0);
  });

  it('does not automatically dismiss when duration is zero', () => {
    toast.warning('Persistent toast', { duration: 0 });

    vi.advanceTimersByTime(10000);

    expect(getToasts()).toHaveLength(1);
  });

  it('notifies subscribed listeners when toast changes', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToToasts(listener);

    const id = toast.success('Notification');

    expect(listener).toHaveBeenCalledTimes(1);

    dismissToast(id);

    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    toast.error('After unsubscribe');

    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('clears the timer when toast is dismissed manually', () => {
    const id = toast.success('Dismiss early', { duration: 4000 });

    dismissToast(id);
    vi.advanceTimersByTime(4000);

    expect(getToasts()).toEqual([]);
  });

  it('returns an unsubscribe function', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToToasts(listener);

    expect(unsubscribe).toBeTypeOf('function');

    unsubscribe();
    toast.success('Test');

    expect(listener).not.toHaveBeenCalled();
  });
});