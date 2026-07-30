import type { FareOption, FlightLeg } from './flight';

export interface FareCardsProps {
  fareOptions: FareOption[];
  selectedFareId: 'economy' | 'business';
  defaultFlightLogo: string;
  onSelectFare: (id: 'economy' | 'business') => void;
}

export interface FareHeaderProps {
  destination: string;
  tripType: string;
  cabinClass: string;
  price: number;
  priceUnit: string;
}

export interface PriceDetailsSidebarProps {
  pricePerTraveller: number;
  flightDues: number;
  taxesAndFees: number;
  totalAmount: number;
}

export interface SelectedFlightBoxProps {
  airlineName: string;
  defaultFlightLogo: string;
  iconHeart: string;
  legs: FlightLeg[];
  cancellationPolicy: string;
}
