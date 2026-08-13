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

  it('maps explicit ids, legs, airline and zero-price fallbacks', () => {
    const result = mapFareDataToFlightOption({
      ...fareData,
      id: 'fare-1',
      airlineName: '',
      fareOptions: [],
      legs: [
        { id: 'outbound', times: '08:00', route: 'HAN-SGN', duration: '2h', stops: '1 stop' },
      ],
    }, 0);

    expect(result).toMatchObject({
      id: 'fare-1',
      airline: 'Airline',
      price: '$0',
      outbound: { time: '08:00', route: 'HAN-SGN', duration: '2h', stops: '1 stop' },
      returnLeg: { time: '08:00', route: 'HAN-SGN', duration: '2h', stops: '1 stop' },
    });
  });

  it('maps a distinct return leg and missing leg fields', () => {
    const result = mapFareDataToFlightOption({
      ...fareData,
      legs: [
        { id: 'outbound', times: '', route: '', duration: '', stops: '' },
        { id: 'return', times: '20:00', route: '', duration: '', stops: '' },
      ],
    }, 0);

    expect(result.outbound).toEqual({ time: 'N/A', route: 'N/A', duration: 'N/A', stops: 'Direct' });
    expect(result.returnLeg.time).toBe('20:00');
  });
});

describe('mapHotelDataToOption', () => {
  it('maps primary hotel values and room-rate price', () => {
    const hotel = {
      id: 'hotel-1',
      hotelName: 'Grand Hotel',
      description: 'Central',
      coverImage: 'cover.jpg',
      priceBreakdown: { roomRate: 120, taxesAndFees: 10 },
    } as HotelData;

    expect(mapHotelDataToOption([hotel])[0]).toMatchObject({
      id: 'hotel-1', name: 'Grand Hotel', description: 'Central', price: 120,
      imageUrl: 'cover.jpg', isFavorite: false, rawData: hotel,
    });
  });

  it('uses hotel fallbacks and room-option price', () => {
    const hotel = {
      id: 'hotel-2',
      imageUrl: 'fallback.jpg',
      roomOptions: [{ price: 80 }],
    } as HotelData;

    expect(mapHotelDataToOption([hotel])[0]).toMatchObject({
      name: 'Unknown Hotel', description: '', price: 80, imageUrl: 'fallback.jpg',
    });
    expect(mapHotelDataToOption([{ id: 'hotel-3' } as HotelData])[0].price).toBe(0);
  });
});

describe('getCategoryBadge', () => {
  it.each([
    ['beach', 'Beach'], ['beaches', 'Beach'], ['mountain', 'Mountain'],
    ['mountains', 'Mountain'], ['cultural', 'Cultural'], ['culture', 'Cultural'],
    ['adventure', 'Adventure'], ['romantic', 'Romantic'],
  ])('maps %s to %s', (category, label) => {
    expect(getCategoryBadge(category).label).toBe(label);
  });

  it('preserves unknown categories and defaults an empty category', () => {
    expect(getCategoryBadge('City')).toMatchObject({ label: 'City' });
    expect(getCategoryBadge()).toMatchObject({ label: 'Featured' });
  });
});
