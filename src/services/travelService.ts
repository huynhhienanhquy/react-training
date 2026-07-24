import travelApi from './travelApi';

// 1. TYPES & INTERFACES FOR PLACE
export interface PlaceData {
  id: string;
  name: string;
  location: string;
  description?: string;
  imageUrl?: string;
  rating?: number;
  category?: string;
}

// 2. TYPES & INTERFACES FOR ITINERARY
export interface ActivityItem {
  id: string;
  title: string;
  time: string;
  location?: string;
  description?: string;
}

export interface DayItinerary {
  id?: string;
  day: number;
  dateTitle: string;
  activities: ActivityItem[];
}

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
export const getItineraryListApi = async (): Promise<DayItinerary[]> => {
  const response = await travelApi.get<DayItinerary[]>('/itinerary');
  return response.data;
};


//Get schedule details by ID
export const getItineraryDetailApi = async (id: string): Promise<DayItinerary> => {
  const response = await travelApi.get<DayItinerary>(`/itinerary/${id}`);
  return response.data;
};


