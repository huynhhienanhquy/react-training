import api from './api';

export interface ActivityItem {
  id: string;
  title: string;
  time: string;
  location?: string;
  description?: string;
}

export interface DayItinerary {
  day: number;
  dateTitle: string;
  activities: ActivityItem[];
}


//Get suggested itineraries from MockAPI (/itinerary)
export const getItineraryListApi = async (): Promise<DayItinerary[]> => {
  const response = await api.get<DayItinerary[] | { days: DayItinerary[] }>('/itinerary');

  // Handle flexibly if MockAPI returns an Array or Object wrapped in { days: [...] }
  if (Array.isArray(response.data)) {
    return response.data;
  }
  if (response.data && 'days' in response.data) {
    return response.data.days;
  }

  return [];
};
