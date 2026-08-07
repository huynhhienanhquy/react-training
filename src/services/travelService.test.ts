import { beforeEach, describe, expect, it, vi } from 'vitest';
import { travelApi } from './api';
import { getItineraries } from './travelService';

vi.mock('./api', () => ({
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
