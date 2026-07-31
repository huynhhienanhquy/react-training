import type { FareData, FlightOption, FlightLegInfo } from '../types/flight';
import type { HotelData, HotelOption } from '../types/hotel';

export const mapFareDataToFlightOption = (fareData: FareData): FlightOption[] => {
  const fareOptions =
    fareData.fareOptions?.map((opt) => ({
      id: fareData.id ? `${fareData.id}-${opt.id}` : opt.id,
      airline: opt.airline || fareData.airlineName || 'Unknown Airline',
      logoUrl: undefined,
      outbound: mapLeg(fareData.legs?.[0]),
      returnLeg: mapLeg(fareData.legs?.[1] || fareData.legs?.[0]),
      price: opt.price?.toLocaleString() || '0',
      tag: opt.id === 'business' ? 'Best value' : undefined,
      isFavorite: false,
    })) || [];
  return fareOptions;
};

const mapLeg = (leg?: { times?: string; route?: string; duration?: string; stops?: string }): FlightLegInfo => ({
  time: leg?.times || '',
  route: leg?.route || '',
  duration: leg?.duration || '',
  stops: leg?.stops || '0',
});

export const mapHotelDataToOption = (hotels: HotelData[]): HotelOption[] => {
  return hotels.map((hotel) => ({
    id: hotel.id,
    name: hotel.hotelName || 'Unknown Hotel',
    description: hotel.description || '',
    price: hotel.priceBreakdown?.roomRate || hotel.roomOptions?.[0]?.price || 0,
    imageUrl: hotel.coverImage || hotel.imageUrl,
    tag: undefined,
    isFavorite: false,
    rawData: hotel,
  }));
};

export const getCategoryBadge = (category?: string): { label: string; color: string } => {
  switch (category?.toLowerCase()) {
    case 'beach':
    case 'beaches':
      return { label: 'Beach', color: 'bg-cyan-100 text-cyan-700' };
    case 'mountain':
    case 'mountains':
      return { label: 'Mountain', color: 'bg-emerald-100 text-emerald-700' };
    case 'cultural':
    case 'culture':
      return { label: 'Cultural', color: 'bg-amber-100 text-amber-700' };
    case 'adventure':
      return { label: 'Adventure', color: 'bg-orange-100 text-orange-700' };
    case 'romantic':
      return { label: 'Romantic', color: 'bg-rose-100 text-rose-700' };
    default:
      return { label: category || 'Featured', color: 'bg-emerald-100/70 text-emerald-700' };
  }
};
