import React from 'react';
import { RecommendationWrapper } from './RecommendationWrapper';
import { Button } from '../Button/Button';
import { getHotelListApi } from '../../services/hotelService';
import type { HotelData, HotelOption, HotelRecommendationsProps } from '../../types/hotel';
import { useAsyncData } from '../../hooks/useAsyncData';
import { useFavorites } from '../../hooks/useFavorites';

export type { HotelOption };

const defaultHotelImg =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80';

const mapHotelDataToOption = (hotel: HotelData, index: number): HotelOption => {
  const lowestPrice = hotel.roomOptions?.[0]?.price ?? hotel.priceBreakdown?.roomRate ?? 1200;

  return {
    id: hotel.id ? String(hotel.id) : `hotel-${index + 1}`,
    name: hotel.hotelName || 'Five Star Hotel, Bahamas',
    description:
      hotel.description ||
      'Exclusive suites and large rooms dedicated to your comfort and luxury. Free wifi available',
    price: lowestPrice,
    tag: 'Cheap',
    imageUrl: hotel.coverImage || hotel.images?.[0] || defaultHotelImg,
    rawData: hotel,
  };
};

export const HotelRecommendations: React.FC<HotelRecommendationsProps> = ({
  title = 'Recommended Hotels',
  hotels: initialHotels,
  onBookNow,
  onSeeAll,
}) => {
  const isControlled = !!initialHotels;

  const { data: apiHotels, loading, error } = useAsyncData(async () => {
    const data = await getHotelListApi();
    const items = Array.isArray(data) ? data : [data];
    return items.map((item, index) => mapHotelDataToOption(item, index));
  }, { skip: isControlled });

  const { favorites, toggleFavorite } = useFavorites();

  const hotelList = initialHotels ?? (apiHotels as HotelOption[]) ?? [];

  // SYNCHRONIZATION: Saves selected hotel data and transmits it externally.
  const handleBookNow = (e: React.MouseEvent, hotel: HotelOption) => {
    e.stopPropagation();

    // Save to LocalStorage and synchronize across all apps.
    localStorage.setItem('selectedHotel', JSON.stringify(hotel.rawData || hotel));

    if (onBookNow) {
      onBookNow(hotel);
    }
  };

  return (
    <RecommendationWrapper title={title} onSeeAll={onSeeAll}>
      {!isControlled && loading && (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Loading hotel list...</p>
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
        hotelList.map((hotel, idx) => {
          const isFav = !!(favorites[hotel.id] || hotel.isFavorite);
          const uniqueKey = `${hotel.id}-${idx}`;

          return (
            <div
              key={uniqueKey}
              className="bg-[#F8FAFC] rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 mb-3 border-none"
            >
              <div className="w-full md:w-36 h-36 md:h-32 rounded-xl overflow-hidden shrink-0">
                <img
                  src={hotel.imageUrl || defaultHotelImg}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between h-full space-y-2 text-left w-full">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-[#101828] leading-snug">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {hotel.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-slate-400 pt-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.071-7.071a10 10 0 0114.142 0M1.05 8.05a15 15 0 0121.9 0" />
                  </svg>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H7v11h2v-4h3a1 1 0 001-1zm0 0l2 2" />
                  </svg>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between w-full md:w-auto h-full self-stretch space-y-3 shrink-0">
                <div>
                  {hotel.tag && (
                    <span className="px-3 py-0.5 bg-emerald-50 text-emerald-600 text-[11px] font-medium rounded-full border border-emerald-100">
                      {hotel.tag}
                    </span>
                  )}
                </div>

                <div className="text-right my-1">
                  <span className="text-xl md:text-2xl font-bold text-[#101828]">
                    ${hotel.price}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">/per night</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="favorite"
                    size="icon"
                    isFavorite={isFav}
                    onClick={() => toggleFavorite(hotel.id)}
                  />

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => handleBookNow(e, hotel)}
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
