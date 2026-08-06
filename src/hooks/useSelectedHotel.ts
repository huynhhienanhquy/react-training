import { create } from 'zustand';
import type { HotelData } from '@/types/hotel';

const selectedHotelStorageKey = 'selectedHotel';

export const getSavedHotel = (): HotelData | null => {
  try {
    const storedHotel = localStorage.getItem(selectedHotelStorageKey);
    if (!storedHotel) return null;
    const hotel = JSON.parse(storedHotel) as HotelData;
    return hotel?.hotelName ? hotel : null;
  } catch {
    return null;
  }
};

export interface UseSelectedHotelResult {
  selectedHotel: HotelData | null;
  selectHotel: (hotel: HotelData) => void;
  clearHotel: () => void;
}

export const useSelectedHotel = create<UseSelectedHotelResult>((set) => ({
  selectedHotel: getSavedHotel(),
  selectHotel: (hotel) => {
    localStorage.setItem(selectedHotelStorageKey, JSON.stringify(hotel));
    set({ selectedHotel: hotel });
  },
  clearHotel: () => {
    localStorage.removeItem(selectedHotelStorageKey);
    set({ selectedHotel: null });
  },
}));
