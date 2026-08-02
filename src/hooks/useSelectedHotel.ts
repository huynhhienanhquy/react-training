import { useState } from 'react';
import type { HotelData } from '@/types/hotel';

const STORAGE_KEY = 'selectedHotel';

export const getSavedHotel = (): HotelData | null => {
  const savedHotelJson = localStorage.getItem(STORAGE_KEY);

  if (!savedHotelJson) return null;

  try {
    const savedHotel: HotelData = JSON.parse(savedHotelJson);
    return savedHotel?.hotelName ? savedHotel : null;
  } catch (err) {
    console.error('Error parsing saved hotel:', err);
    return null;
  }
};

export interface UseSelectedHotelResult {
  selectedHotel: HotelData | null;
  selectHotel: (hotel: HotelData) => void;
  clearHotel: () => void;
}

export const useSelectedHotel = (): UseSelectedHotelResult => {
  const [selectedHotel, setSelectedHotel] =
    useState<HotelData | null>(getSavedHotel);

  const selectHotel = (hotel: HotelData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hotel));
    setSelectedHotel(hotel);
  };

  const clearHotel = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSelectedHotel(null);
  };

  return { selectedHotel, selectHotel, clearHotel };
};
