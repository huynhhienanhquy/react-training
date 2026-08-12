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
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-hotel-loading border-t-transparent" />
          <p className="text-xs font-medium text-hotel-subtle">
            Loading hotel list...
          </p>
        </div>
      )}

      {!isControlled && error && !loading && (
        <div className="my-2 rounded-2xl border border-hotel-error-border bg-hotel-error-bg p-4 text-center text-xs font-medium text-hotel-error-text">
          {error}
        </div>
      )}

      {!isControlled && !loading && !error && hotelList.length === 0 && (
        <div className="p-6 text-center text-xs text-hotel-subtle">
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
              className="mb-2 grid grid-cols-1 gap-4 rounded-2xl bg-hotel-card p-4 transition-colors duration-200 last:mb-0 md:min-h-hotel-card md:grid-cols-hotel-card md:items-stretch md:gap-6 dark:bg-hotel-card-dark/70"
            >
              <div className="h-52 w-full overflow-hidden rounded-xl md:h-hotel-image md:w-hotel-image">
                <img
                  src={hotel.imageUrl || defaultHotelImage}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-col justify-between space-y-3 text-left">
                <div>
                  <h3 className="text-xl font-medium leading-7 text-hotel-text md:text-2xl md:leading-8">
                    {hotel.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm font-normal leading-6 text-hotel-muted md:text-base">
                    {hotel.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-2 text-hotel-amenity" aria-label="Hotel amenities">
                  <span title="Free Wi-Fi" className="flex h-5 w-5 items-center justify-center text-lg">⌁</span>
                  <span title="Parking" className="flex h-5 w-5 items-center justify-center text-base">Ⓟ</span>
                  <span title="Room service" className="flex h-5 w-5 items-center justify-center text-lg">♨</span>
                </div>
              </div>

              <div className="flex w-full shrink-0 flex-row flex-wrap items-center justify-between gap-4 md:w-auto md:flex-col md:items-end md:justify-between">
                <div>
                  {hotel.tag && (
                    <span className="inline-flex rounded-full border border-hotel-tag-border bg-hotel-tag-bg px-3 py-1 text-base font-medium text-hotel-tag-text dark:border-hotel-tag-border-dark dark:bg-hotel-tag-bg-dark/70 dark:text-hotel-tag-text-dark">
                      {hotel.tag}
                    </span>
                  )}
                </div>

                <div className="text-right md:my-auto">
                  <span className="mb-2 text-2xl font-bold text-hotel-text">
                    ${hotel.price}
                  </span>

                  <span className="text-base font-normal text-hotel-subtle">
                    /per night
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="favorite"
                    size="icon"
                    isFavorite={isFavorite}
                    favoriteIconSize={20}
                    onClick={createFavoriteHandler(hotel.id)}
                    className="h-12 w-12 gap-0 rounded-xl border border-hotel-action-border !p-0 md:h-12 md:w-12"
                  />

                  <Button
                    variant="secondary"
                    size="none"
                    onClick={createBookHandler(hotel)}
                    className="ml-2 h-12 w-book-now shrink-0 rounded-xl text-base"                  
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
