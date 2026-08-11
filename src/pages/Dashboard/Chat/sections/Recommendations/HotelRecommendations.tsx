import React, { useCallback, useMemo } from 'react';
import { RecommendationWrapper } from './RecommendationWrapper';
import { Button } from '@/components/common/Button';
import { getHotels } from '@/services/hotelService';
import type {
  HotelData,
  HotelOption,
  HotelRecommendationsProps,
} from '@/types/hotel';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useFavorites } from '@/hooks/useFavorites';
import defaultHotelImage from '@/assets/images/tropical-beach.png';

export type { HotelOption };

const mapHotelDataToOption = (
  hotel: HotelData,
  index: number,
): HotelOption => {
  const lowestPrice =
    hotel.roomOptions?.[0]?.price ??
    hotel.priceBreakdown?.roomRate ??
    1200;

  return {
    id: hotel.id ? String(hotel.id) : `hotel-${index + 1}`,
    name: hotel.hotelName || 'Five Star Hotel, Bahamas',
    description:
      hotel.description ||
      'Exclusive suites and large rooms dedicated to your comfort and luxury. Free wifi available',
    price: lowestPrice,
    tag: 'Cheap',
    imageUrl:
      hotel.coverImage ||
      hotel.images?.[0] ||
      defaultHotelImage,
    rawData: hotel,
  };
};

export const HotelRecommendations = ({
  title = 'Recommended Hotels For a Three-Night Staycation',
  hotels: initialHotels,
  onBookNow,
  onSeeAll,
}: HotelRecommendationsProps) => {
  const isControlled = Boolean(initialHotels);

  const {
    data: hotelData,
    loading,
    error,
  } = useAsyncData(getHotels, {
    skip: isControlled,
  });

  const { favorites, toggleFavorite } = useFavorites();
  const apiHotels = useMemo(
    () => hotelData?.map(mapHotelDataToOption) ?? [],
    [hotelData],
  );

  const hotelList = initialHotels ?? apiHotels;

  const handleBookNow = useCallback((
    e: React.MouseEvent,
    hotel: HotelOption,
  ) => {
    e.stopPropagation();

    onBookNow?.(hotel);
  }, [onBookNow]);

  const createFavoriteHandler = useCallback(
    (hotelId: string) => () => toggleFavorite(hotelId),
    [toggleFavorite],
  );
  const createBookHandler = useCallback(
    (hotel: HotelOption) => (event: React.MouseEvent) => handleBookNow(event, hotel),
    [handleBookNow],
  );

  return (
    <RecommendationWrapper
      title={title}
      onSeeAll={onSeeAll}
    >
      {!isControlled && loading && (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">
            Loading hotel list...
          </p>
        </div>
      )}

      {!isControlled && error && !loading && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-xs text-center font-medium my-2">
          {error}
        </div>
      )}

      {!isControlled && !loading && !error && hotelList.length === 0 && (
        <div className="p-6 text-center text-xs text-slate-400">
          No suitable hotels were found.
        </div>
      )}

      {(isControlled || (!loading && !error)) &&
        hotelList.map((hotel) => {
          const isFavorite = Boolean(
            favorites[hotel.id] || hotel.isFavorite,
          );

          return (
            <div
              key={hotel.id}
              className="mb-2 grid grid-cols-1 gap-4 rounded-2xl bg-slate-50 p-4 transition-colors duration-200 last:mb-0 md:grid-cols-hotel-card md:items-stretch dark:bg-slate-700/70"
            >
              <div className="h-52 w-full overflow-hidden rounded-xl md:h-48 md:w-55">
                <img
                  src={hotel.imageUrl || defaultHotelImage}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-col justify-between space-y-3 text-left">
                <div>
                  <h3 className="text-xl font-bold leading-snug text-ink md:text-2xl">
                    {hotel.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                    {hotel.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-2 text-slate-400" aria-label="Hotel amenities">
                  <span title="Free Wi-Fi" className="text-xl">⌁</span>
                  <span title="Parking" className="text-lg">Ⓟ</span>
                  <span title="Room service" className="text-xl">♨</span>
                </div>
              </div>

              <div className="flex w-full shrink-0 flex-row flex-wrap items-center justify-between gap-4 md:w-auto md:min-w-47.5 md:flex-col md:items-end md:justify-between">
                <div>
                  {hotel.tag && (
                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                      {hotel.tag}
                    </span>
                  )}
                </div>

                <div className="text-right md:my-auto">
                  <span className="text-2xl font-black text-ink">
                    ${hotel.price}
                  </span>

                  <span className="text-sm font-normal text-slate-400">
                    /per night
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="favorite"
                    size="icon"
                    isFavorite={isFavorite}
                    onClick={createFavoriteHandler(hotel.id)}
                    className="h-12 w-12 rounded-xl border border-blue-100 md:h-12 md:w-12"
                  />

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={createBookHandler(hotel)}
                    className="h-12 rounded-xl px-5 text-sm"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
    </RecommendationWrapper>
  );
};
