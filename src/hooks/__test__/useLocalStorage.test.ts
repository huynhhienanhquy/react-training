import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { useLocalStorage } from '@/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initial value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current.value).toBe('stored-value');
  });

  it('uses initialValue when not in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current.value).toBe('initial');
  });

  it('setValue updates localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current.setValue('new-value');
    });

    expect(result.current.value).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('removeValue clears localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current.setValue('new-value');
    });

    act(() => {
      result.current.removeValue();
    });

    expect(result.current.value).toBeNull();
    expect(localStorage.getItem('test-key')).toBeNull();
  });

  it('handles JSON parse errors', () => {
    localStorage.setItem('test-key', 'invalid-json');
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current.value).toBe('initial');
  });

  it('uses null when storage and an initial value are both absent', () => {
    const { result } = renderHook(() => useLocalStorage<string>('missing'));
    expect(result.current.value).toBeNull();
  });

  it('handles storage write and removal errors', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('write failed');
    });
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => result.current.setValue('next'));
    expect(consoleError).toHaveBeenCalledWith(
      'Error setting localStorage key "test-key":',
      expect.any(Error),
    );

    setItem.mockRestore();
    const removeItem = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('remove failed');
    });
    act(() => result.current.removeValue());
    expect(consoleError).toHaveBeenCalledWith(
      'Error removing localStorage key "test-key":',
      expect.any(Error),
    );

    removeItem.mockRestore();
    consoleError.mockRestore();
  });
});
