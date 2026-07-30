export interface PlaceData {
  id: string;
  name: string;
  category?: string;
  rating?: number;
  imageUrl?: string;
  location?: string;
}

export interface DayItinerary {
  id?: string;
  day: number;
  dateTitle: string;
  activities: Array<{
    id: string;
    title: string;
    time: string;
    location: string;
  }>;
}

export interface ItineraryCardWidgetProps {
  itinerary?: DayItinerary[];
  onViewAll?: () => void;
}

export interface PlacesCardWidgetProps {
  places?: PlaceData[];
  onViewAll?: () => void;
}
