import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useFormState } from '../useFormState';

describe('useFormState', () => {
  it('initial state (not loading, no error)', () => {
    const { result } = renderHook(() => useFormState());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('');
  });

  it('setLoading updates isLoading', () => {
    const { result } = renderHook(() => useFormState());

    act(() => {
      result.current.startLoading();
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.stopLoading();
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('setError updates error message', () => {
    const { result } = renderHook(() => useFormState());

    act(() => {
      result.current.setError('New Error');
    });

    expect(result.current.error).toBe('New Error');
  });
});
