import React from 'react';
import { RecommendationWrapper } from './RecommendationWrapper';
import { Button } from '@/components/Button';
import { getHotels } from '@/services/hotelService';
import type {
  HotelData,
  HotelOption,
  HotelRecommendationsProps,
} from '@/types/hotel';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useFavorites } from '@/hooks/useFavorites';

export type { HotelOption };

const defaultHotelImage =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80';

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
  title = 'Recommended Hotels',
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
  const apiHotels =
    hotelData?.map(mapHotelDataToOption) ?? [];

  const hotelList = initialHotels ?? apiHotels;

  const handleBookNow = (
    e: React.MouseEvent,
    hotel: HotelOption,
  ) => {
    e.stopPropagation();

    onBookNow?.(hotel);
  };

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
              className="bg-brand-light dark:bg-slate-700/70 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 mb-3 border border-transparent dark:border-slate-600/70 shadow-sm dark:shadow-black/20 transition-colors duration-200"
            >
              <div className="w-full md:w-36 h-36 md:h-32 rounded-xl overflow-hidden shrink-0">
                <img
                  src={hotel.imageUrl || defaultHotelImage}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between h-full space-y-2 text-left w-full">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-ink leading-snug">
                    {hotel.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {hotel.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-slate-400 pt-2">
                </div>
              </div>

              <div className="flex flex-col items-end justify-between w-full md:w-auto h-full self-stretch space-y-3 shrink-0">
                <div>
                  {hotel.tag && (
                    <span className="px-3 py-0.5 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 text-xxs font-medium rounded-full border border-emerald-100 dark:border-emerald-800">
                      {hotel.tag}
                    </span>
                  )}
                </div>

                <div className="text-right my-1">
                  <span className="text-xl md:text-2xl font-bold text-ink">
                    ${hotel.price}
                  </span>

                  <span className="text-xs text-slate-400 font-normal">
                    /per night
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="favorite"
                    size="icon"
                    isFavorite={isFavorite}
                    onClick={() =>
                      toggleFavorite(hotel.id)
                    }
                  />

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) =>
                      handleBookNow(e, hotel)
                    }
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
