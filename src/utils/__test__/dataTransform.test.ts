import { describe, expect, it } from 'vitest';
import type { FareData } from '@/types/flight';
import { mapFareDataToFlightOption } from '@/utils/dataTransform';

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
});
