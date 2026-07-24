import api from './api';

export interface RoomOption {
  id: 'standard' | 'deluxe' | 'suite' | string;
  name: string;
  price: number;
  bedType: string;
  maxGuests: number;
  features: string[];
}

export interface HotelData {
  id: string;
  hotelName: string;
  location: string;
  address: string;
  rating: number;
  reviewCount: number;
  priceUnit: string;
  coverImage?: string;
  images: string[];
  description: string;
  amenities: string[];
  cancellationPolicy: string;
  roomOptions: RoomOption[];
  importantInformation: string[];
  priceBreakdown: {
    roomRate: number;
    taxesAndFees: number;
  };
}

//Get a list of all hotels
export const getHotelListApi = async (): Promise<HotelData[]> => {
  const response = await api.get<HotelData[]>('/hotel');
  return response.data;
};


//Get details of a hotel by ID.
export const getHotelDetailsApi = async (id: string = '1'): Promise<HotelData> => {
  const response = await api.get<HotelData | HotelData[]>(`/hotel`);

  if (Array.isArray(response.data)) {
    const found = response.data.find((item) => item.id === id);
    return found || response.data[0];
  }

  return response.data;
};
