import { flightApi } from './api';
import type { HotelData } from '../types/hotel';

//Get a list of all hotels
export const getHotels = async (): Promise<HotelData[]> => {
  const response = await flightApi.get<HotelData[]>('/hotels');
  return response.data;
};


//Get details of a hotel by ID.
export const getHotelById = async (id: string): Promise<HotelData> => {
  const response = await flightApi.get<HotelData>(`/hotels/${id}`);
  return response.data;
};
