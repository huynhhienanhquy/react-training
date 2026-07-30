export interface RoomOption {
  id: string;
  name: string;
  price: number;
  bedType: string;
  maxGuests: number;
  features: string[];
}

export interface HotelData {
  id: string;
  hotelName?: string;
  name?: string;
  location?: string;
  address?: string;
  coverImage?: string;
  imageUrl?: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  priceUnit?: string;
  description?: string;
  amenities?: string[];
  cancellationPolicy?: string;
  roomOptions?: RoomOption[];
  importantInformation?: string[];
  priceBreakdown?: {
    roomRate: number;
    taxesAndFees: number;
  };
}

export interface HotelOption {
  id: string;
  name: string;
  description: string;
  price: number;
  tag?: string;
  imageUrl?: string;
  isFavorite?: boolean;
  rawData?: HotelData;
}

export interface HotelRecommendationsProps {
  title?: string;
  hotels?: HotelOption[];
  onBookNow?: (hotel: HotelOption) => void;
  onSeeAll?: () => void;
}
