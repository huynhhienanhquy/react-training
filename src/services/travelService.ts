import { travelApi } from './api';
import type { PlaceData, DayItinerary } from '../types/travel';

// 3. API CALLS FOR PLACES (/places)
//Get a list of suggested locations.
export const getPlaces = async (): Promise<PlaceData[]> => {
  const response = await travelApi.get<PlaceData[]>('/place');
  return response.data;
};

//Get details of a location by ID.
export const getPlaceById = async (id: string): Promise<PlaceData> => {
  const response = await travelApi.get<PlaceData>(`/place/${id}`);
  return response.data;
};


// 4. API CALLS FOR ITINERARIES (/itineraries)
//Get a list of suggested itineraries
type ItineraryListResponse = DayItinerary[] | { days: DayItinerary[] };

export const getItineraries = async (): Promise<DayItinerary[]> => {
  const response = await travelApi.get<ItineraryListResponse>('/itinerary');

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.data.days)) {
    return response.data.days;
  }

  throw new Error('Invalid itinerary response');
};


//Get schedule details by ID
export const getItineraryById = async (id: string): Promise<DayItinerary> => {
  const response = await travelApi.get<DayItinerary>(`/itinerary/${id}`);
  return response.data;
};
