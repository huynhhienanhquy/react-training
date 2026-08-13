import { beforeEach, describe, expect, it, vi } from 'vitest';
import { travelApi } from '@/services/api';
import {
  getItineraries,
  getItineraryById,
  getPlaceById,
  getPlaces,
} from '@/services/travelService';

vi.mock('@/services/api', () => ({
  travelApi: { get: vi.fn() },
}));

const days = [
  { id: 'day-1', day: 1, dateTitle: 'Arrival', activities: [] },
];

describe('getItineraries', () => {
  beforeEach(() => vi.clearAllMocks());

  it.each([
    ['an array response', days],
    ['a days envelope', { days }],
  ])('exposes DayItinerary[] for %s', async (_label, data) => {
    vi.mocked(travelApi.get).mockResolvedValue({ data });

    await expect(getItineraries()).resolves.toEqual(days);
    expect(travelApi.get).toHaveBeenCalledWith('/itinerary');
  });

  it('rejects a malformed itinerary envelope', async () => {
    vi.mocked(travelApi.get).mockResolvedValue({ data: {} });

    await expect(getItineraries()).rejects.toThrow(
      'Invalid itinerary response',
    );
  });
});

describe('place and itinerary details', () => {
  beforeEach(() => vi.clearAllMocks());

  it('gets the place list', async () => {
    const places = [{ id: 'place-1', name: 'Lagos' }];
    vi.mocked(travelApi.get).mockResolvedValue({ data: places });

    await expect(getPlaces()).resolves.toBe(places);
    expect(travelApi.get).toHaveBeenCalledWith('/place');
  });

  it('gets a place by its id', async () => {
    const place = { id: 'place-1', name: 'Lagos' };
    vi.mocked(travelApi.get).mockResolvedValue({ data: place });

    await expect(getPlaceById('place-1')).resolves.toBe(place);
    expect(travelApi.get).toHaveBeenCalledWith('/place/place-1');
  });

  it('gets an itinerary by its id', async () => {
    const itinerary = days[0];
    vi.mocked(travelApi.get).mockResolvedValue({ data: itinerary });

    await expect(getItineraryById('day-1')).resolves.toBe(itinerary);
    expect(travelApi.get).toHaveBeenCalledWith('/itinerary/day-1');
  });
});
