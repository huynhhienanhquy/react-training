import { describe, expect, it } from 'vitest';
import type { FareData } from '@/types/flight';
import type { HotelData } from '@/types/hotel';
import {
  getCategoryBadge,
  mapFareDataToFlightOption,
  mapHotelDataToOption,
} from '@/utils/dataTransform';

const fareData: FareData = {
  destination: 'Hanoi',
  tripType: 'Round Trip',
  cabinClass: 'Economy',
  priceUnit: 'USD',
  airlineName: 'VietJet',
  legs: [],
  fareOptions: [
    {
      id: 'economy',
      name: 'Economy',
      airline: 'VietJet',
      price: 1500,
      features: [],
    },
  ],
  priceBreakdown: { flightDues: 0, taxesAndFees: 0 },
  cancellationPolicy: '',
  importantInformation: [],
};

describe('mapFareDataToFlightOption', () => {
  it('maps one fare data record to one flight option and formats its price', () => {
    expect(mapFareDataToFlightOption(fareData, 1)).toMatchObject({
      id: 'flight-2',
      airline: 'VietJet',
      price: '$1,500',
      outbound: {
        time: 'N/A',
        route: 'N/A',
        duration: 'N/A',
        stops: 'Direct',
      },
    });
  });

  it('uses supplied ids, both legs, and all leg fields', () => {
    const completeFare = {
      ...fareData,
      id: 42,
      legs: [
        { times: '08:00', route: 'HAN-SGN', duration: '2h', stops: 'Direct' },
        { times: '18:00', route: 'SGN-HAN', duration: '2h', stops: '1 stop' },
      ],
    } as FareData;

    expect(mapFareDataToFlightOption(completeFare, 0)).toMatchObject({
      id: '42',
      outbound: { time: '08:00', route: 'HAN-SGN', duration: '2h', stops: 'Direct' },
      returnLeg: { time: '18:00', route: 'SGN-HAN', duration: '2h', stops: '1 stop' },
    });
  });

  it('falls back when optional fare fields are missing', () => {
    const sparseFare = {
      ...fareData,
      airlineName: '',
      legs: undefined,
      fareOptions: undefined,
    } as unknown as FareData;

    expect(mapFareDataToFlightOption(sparseFare, 0)).toMatchObject({
      airline: 'Airline',
      price: '$0',
      returnLeg: { time: 'N/A', route: 'N/A', duration: 'N/A', stops: 'Direct' },
    });
  });
});

describe('mapHotelDataToOption', () => {
  it('maps primary hotel fields and room-rate price', () => {
    const hotel = {
      id: 'hotel-1',
      hotelName: 'Lotus Hotel',
      description: 'Central location',
      coverImage: '/lotus.jpg',
      priceBreakdown: { roomRate: 120 },
    } as HotelData;

    expect(mapHotelDataToOption([hotel])[0]).toMatchObject({
      id: 'hotel-1',
      name: 'Lotus Hotel',
      description: 'Central location',
      price: 120,
      imageUrl: '/lotus.jpg',
      isFavorite: false,
      rawData: hotel,
    });
  });

  it('uses nested and empty fallbacks for sparse hotels', () => {
    const roomOptionHotel = {
      id: 'hotel-2',
      imageUrl: '/fallback.jpg',
      roomOptions: [{ price: 80 }],
    } as HotelData;
    const emptyHotel = { id: 'hotel-3' } as HotelData;

    expect(mapHotelDataToOption([roomOptionHotel, emptyHotel])).toMatchObject([
      { name: 'Unknown Hotel', description: '', price: 80, imageUrl: '/fallback.jpg' },
      { name: 'Unknown Hotel', description: '', price: 0 },
    ]);
  });
});

describe('getCategoryBadge', () => {
  it.each([
    ['beach', 'Beach'],
    ['BEACHES', 'Beach'],
    ['mountain', 'Mountain'],
    ['mountains', 'Mountain'],
    ['cultural', 'Cultural'],
    ['culture', 'Cultural'],
    ['adventure', 'Adventure'],
    ['romantic', 'Romantic'],
  ])('maps %s to the expected badge', (category, label) => {
    expect(getCategoryBadge(category).label).toBe(label);
  });

  it('preserves unknown categories and handles missing categories', () => {
    expect(getCategoryBadge('City')).toEqual({
      label: 'City',
      color: 'bg-emerald-100/70 text-emerald-700',
    });
    expect(getCategoryBadge()).toEqual({
      label: 'Featured',
      color: 'bg-emerald-100/70 text-emerald-700',
    });
  });
});
