import { create } from 'zustand';
import type { HotelData } from '@/types/hotel';

export interface UseSelectedHotelResult {
  selectedHotel: HotelData | null;
  selectHotel: (hotel: HotelData) => void;
  clearHotel: () => void;
}

export const useSelectedHotel = create<UseSelectedHotelResult>((set) => ({
  selectedHotel: null,
  selectHotel: (hotel) => set({ selectedHotel: hotel }),
  clearHotel: () => set({ selectedHotel: null }),
}));
