import api from './api';

// Define clear interfaces for API data.
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
  id: string;
  destination: string;
  tripType: string;
  cabinClass: string;
  priceUnit: string;
  airlineName: string;
  legs: FlightLeg[];
  cancellationPolicy: string;
  fareOptions: FareOption[];
  importantInformation: string[];
  priceBreakdown: {
    flightDues: number;
    taxesAndFees: number;
  };
}


 //Call the API to retrieve flight data from https://travel-login.free.beeceptor.com/flights

export const getFareDetailsApi = async (): Promise<FareData> => {
  const response = await api.get<FareData>('/flights');
  return response.data;
};

export const getFlightListApi = async (): Promise<FareData[]> => {
  const response = await api.get<FareData[]>('/flights');
  return response.data;
};
