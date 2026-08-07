import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
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
});
