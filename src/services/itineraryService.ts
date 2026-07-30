import { flightApi } from './api';
import type { DayItinerary } from '../types/travel';


//Get suggested itineraries from MockAPI (/itinerary)
export const getItineraryListApi = async (): Promise<DayItinerary[]> => {
  const response = await flightApi.get<DayItinerary[] | { days: DayItinerary[] }>('/itinerary');

  // Handle flexibly if MockAPI returns an Array or Object wrapped in { days: [...] }
  if (Array.isArray(response.data)) {
    return response.data;
  }
  if (response.data && 'days' in response.data) {
    return response.data.days;
  }

  return [];
};
