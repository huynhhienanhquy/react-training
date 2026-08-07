import { flightApi } from './api';
import type { FareData } from '../types/flight';


 //Call the API to retrieve flight data from https://travel-login.free.beeceptor.com/flights

export const getFareDetails = async (): Promise<FareData> => {
  const response = await flightApi.get<FareData>('/flights');
  return response.data;
};

export const getFlights = async (): Promise<FareData[]> => {
  const response = await flightApi.get<FareData[]>('/flights');
  return response.data;
};
