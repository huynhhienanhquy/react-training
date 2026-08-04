import { create } from 'zustand';
import type { HotelData } from '@/types/hotel';

const selectedHotelStorageKey = 'selectedHotel';

const getStoredHotel = (): HotelData | null => {
  try {
    const storedHotel = localStorage.getItem(selectedHotelStorageKey);
    return storedHotel ? (JSON.parse(storedHotel) as HotelData) : null;
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
  selectedHotel: getStoredHotel(),
  selectHotel: (hotel) => {
    localStorage.setItem(selectedHotelStorageKey, JSON.stringify(hotel));
    set({ selectedHotel: hotel });
  },
  clearHotel: () => {
    localStorage.removeItem(selectedHotelStorageKey);
    set({ selectedHotel: null });
  },
}));
