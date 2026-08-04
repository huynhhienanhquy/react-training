import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useSelectedHotel } from './useSelectedHotel';

describe('useSelectedHotel', () => {
  beforeEach(() => {
    useSelectedHotel.getState().clearHotel();
    localStorage.clear();
  });

  it('keeps the selection in application state and localStorage', () => {
    const hotel = { id: 'hotel-1', hotelName: 'Grand Hyatt Lagos' };
    const { result } = renderHook(() => useSelectedHotel());

    act(() => result.current.selectHotel(hotel));

    expect(result.current.selectedHotel).toEqual(hotel);
    expect(localStorage.getItem('selectedHotel')).toBe(JSON.stringify(hotel));
  });

  it('clears the selection', () => {
    const { result } = renderHook(() => useSelectedHotel());

    act(() => result.current.clearHotel());

    expect(result.current.selectedHotel).toBeNull();
    expect(localStorage.getItem('selectedHotel')).toBeNull();
  });
});
