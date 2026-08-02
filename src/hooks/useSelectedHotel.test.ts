import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useSelectedHotel, getSavedHotel } from './useSelectedHotel';
import type { HotelData } from '@/types/hotel';

const hotel: HotelData = {
  id: 'hotel-1',
  hotelName: 'Grand Hyatt Lagos',
};

describe('useSelectedHotel', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with no selected hotel', () => {
    const { result } = renderHook(() => useSelectedHotel());

    expect(result.current.selectedHotel).toBeNull();
  });

  it('selectHotel persists to localStorage and state', () => {
    const { result } = renderHook(() => useSelectedHotel());

    act(() => {
      result.current.selectHotel(hotel);
    });

    expect(result.current.selectedHotel).toEqual(hotel);
    expect(JSON.parse(localStorage.getItem('selectedHotel')!)).toEqual(
      hotel,
    );
    expect(getSavedHotel()).toEqual(hotel);
  });

  it('initializes from an existing localStorage value', () => {
    localStorage.setItem('selectedHotel', JSON.stringify(hotel));

    const { result } = renderHook(() => useSelectedHotel());

    expect(result.current.selectedHotel).toEqual(hotel);
  });

  it('clearHotel removes the stored hotel', () => {
    const { result } = renderHook(() => useSelectedHotel());

    act(() => {
      result.current.selectHotel(hotel);
    });

    act(() => {
      result.current.clearHotel();
    });

    expect(result.current.selectedHotel).toBeNull();
    expect(localStorage.getItem('selectedHotel')).toBeNull();
  });

  it('getSavedHotel returns null for invalid JSON', () => {
    localStorage.setItem('selectedHotel', '{not valid json');

    expect(getSavedHotel()).toBeNull();
  });

  it('getSavedHotel returns null when the hotel has no hotelName', () => {
    localStorage.setItem(
      'selectedHotel',
      JSON.stringify({ id: 'hotel-2' }),
    );

    expect(getSavedHotel()).toBeNull();
  });
});
