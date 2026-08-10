import { beforeEach, describe, expect, it, vi } from 'vitest';
import { flightApi } from '@/services/api';
import { getFlightById, getFlights } from '@/services/fareService';

vi.mock('@/services/api', () => ({
  flightApi: { get: vi.fn() },
}));

describe('fareService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('fetches the flight collection from the list endpoint', async () => {
    const flights = [{ id: 'fare-1' }];
    vi.mocked(flightApi.get).mockResolvedValue({ data: flights });

    await expect(getFlights()).resolves.toEqual(flights);
    expect(flightApi.get).toHaveBeenCalledWith('/flights');
  });

  it('uses the id in the flight details endpoint', async () => {
    const flight = { id: 'fare-2' };
    vi.mocked(flightApi.get).mockResolvedValue({ data: flight });

    await expect(getFlightById('fare-2')).resolves.toEqual(flight);
    expect(flightApi.get).toHaveBeenCalledWith('/flights/fare-2');
  });
});
