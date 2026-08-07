import { beforeEach, describe, expect, it, vi } from 'vitest';
import { flightApi } from './api';
import { getHotelById, getHotels } from './hotelService';

vi.mock('./api', () => ({
  flightApi: { get: vi.fn() },
}));

describe('hotelService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('fetches the hotel collection from the list endpoint', async () => {
    const hotels = [{ id: 'hotel-1', hotelName: 'First Hotel' }];
    vi.mocked(flightApi.get).mockResolvedValue({ data: hotels });

    await expect(getHotels()).resolves.toEqual(hotels);
    expect(flightApi.get).toHaveBeenCalledWith('/hotel');
  });

  it('uses the id in the hotel details endpoint', async () => {
    const hotel = { id: 'hotel-2', hotelName: 'Second Hotel' };
    vi.mocked(flightApi.get).mockResolvedValue({ data: hotel });

    await expect(getHotelById('hotel-2')).resolves.toEqual(hotel);
    expect(flightApi.get).toHaveBeenCalledWith('/hotel/hotel-2');
  });
});
