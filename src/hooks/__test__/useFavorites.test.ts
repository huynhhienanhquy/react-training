import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useFavorites } from '../useFavorites';

describe('useFavorites', () => {
  it('toggleFavorite adds/removes', () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual({});

    act(() => {
      result.current.toggleFavorite('item-1');
    });

    expect(result.current.favorites).toEqual({ 'item-1': true });

    act(() => {
      result.current.toggleFavorite('item-1');
    });

    expect(result.current.favorites).toEqual({});
  });

  it('isFavorite returns correct boolean', () => {
    const { result } = renderHook(() => useFavorites({ 'item-1': true }));

    expect(result.current.isFavorite('item-1')).toBe(true);
    expect(result.current.isFavorite('item-2')).toBe(false);
  });
});
