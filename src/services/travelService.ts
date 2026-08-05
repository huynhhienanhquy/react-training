import { travelApi } from './api';
import type { PlaceData, DayItinerary } from '../types/travel';

// 3. API CALLS FOR PLACE (/place)
//Get a list of suggested locations.
export const getPlaceListApi = async (): Promise<PlaceData[]> => {
  const response = await travelApi.get<PlaceData[]>('/place');
  return response.data;
};

//Get details of a location by ID.
export const getPlaceDetailApi = async (id: string): Promise<PlaceData> => {
  const response = await travelApi.get<PlaceData>(`/place/${id}`);
  return response.data;
};


// 4. API CALLS FOR ITINERARY (/itinerary)
//Get a list of suggested itineraries
type ItineraryListResponse = DayItinerary[] | { days: DayItinerary[] };

export const getItineraryListApi = async (): Promise<DayItinerary[]> => {
  const response = await travelApi.get<ItineraryListResponse>('/itinerary');
  return Array.isArray(response.data) ? response.data : response.data.days;
};


//Get schedule details by ID
export const getItineraryDetailApi = async (id: string): Promise<DayItinerary> => {
  const response = await travelApi.get<DayItinerary>(`/itinerary/${id}`);
  return response.data;
};


