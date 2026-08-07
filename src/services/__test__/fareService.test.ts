import { beforeEach, describe, expect, it, vi } from 'vitest';
import { flightApi } from '@/services/api';
import { getFareDetails, getFlights } from '@/services/fareService';

vi.mock('@/services/api', () => ({
  flightApi: { get: vi.fn() },
}));

describe('fareService', () => {
  beforeEach(() => vi.clearAllMocks());

  it.each([
    ['one fare detail', getFareDetails, { id: 'fare-1' }],
    ['the flight list', getFlights, [{ id: 'fare-1' }]],
  ])('returns %s from the flights endpoint', async (_label, request, data) => {
    vi.mocked(flightApi.get).mockResolvedValue({ data });

    await expect(request()).resolves.toEqual(data);
    expect(flightApi.get).toHaveBeenCalledWith('/flights');
  });
});
