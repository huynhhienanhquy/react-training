import { flightApi } from './api';
import type { FareData } from '../types/flight';

// Get a list of all flights.
export const getFlights = async (): Promise<FareData[]> => {
  const response = await flightApi.get<FareData[]>('/flights');
  return response.data;
};

// Get details of a flight by ID.
export const getFlightById = async (id: string): Promise<FareData> => {
  const response = await flightApi.get<FareData>(`/flights/${id}`);
  return response.data;
};
