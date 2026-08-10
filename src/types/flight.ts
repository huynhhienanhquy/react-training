import { type ChatMessage } from '../components/common/Chat/Topbar';

export interface FareOption {
  id: 'economy' | 'business';
  name: string;
  airline: string;
  price: number;
  features: string[];
}

export interface FlightLeg {
  id: string;
  times: string;
  route: string;
  duration: string;
  stops: string;
}

export interface FareData {
  id?: string | number;
  destination: string;
  tripType: string;
  cabinClass: string;
  priceUnit: string;
  airlineName: string;
  legs: FlightLeg[];
  fareOptions: FareOption[];
  priceBreakdown: {
    flightDues: number;
    taxesAndFees: number;
  };
  cancellationPolicy: string;
  importantInformation: string[];
}

export interface FlightLegInfo {
  time: string;
  route: string;
  duration: string;
  stops: string;
}

export interface FlightOption {
  id: string;
  airline: string;
  outbound: FlightLegInfo;
  returnLeg: FlightLegInfo;
  price: string;
  tag?: string;
  logoUrl?: string;
  isFavorite?: boolean;
}

// Component props interface
export interface FlightRecommendationsProps {
  title?: string;
  flights?: FlightOption[];
  onBookNow?: (flightId: string) => void;
  onSeeAll?: () => void;
}

export interface SelectFarePageProps {
  chatTitle?: string;
  messages?: ChatMessage[];
  onBackToChat?: () => void;
  onStartNewChat?: () => void;
}
