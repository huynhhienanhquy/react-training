import React, { useState } from 'react';
import { Wifi, ParkingCircle, Utensils } from 'lucide-react';

import iconHeart from '../../assets/icons/heart-blue.png';

export interface HotelOption {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  pricePeriod?: string;
  tag?: string;
  isFavorite?: boolean;
}

interface HotelRecommendationsProps {
  title?: string;
  hotels?: HotelOption[];
  onBookNow?: (hotelId: string) => void;
  onSeeAll?: () => void;
}

const DEFAULT_HOTELS: HotelOption[] = [
  {
    id: '1',
    name: 'Five Star Hotel, Bahamas',
    description: 'Exclusive suites and large rooms dedicated to your comfort and luxury. Free wifi available',
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
    price: '$1200',
    pricePeriod: '/per night',
    tag: 'Cheap',
  },
  {
    id: '2',
    name: 'Five Star Hotel, Bahamas',
    description: 'Exclusive suites and large rooms dedicated to your comfort and luxury. Free wifi available',
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
    price: '$1200',
    pricePeriod: '/per night',
    tag: 'Cheap',
  },
];

export const HotelRecommendations: React.FC<HotelRecommendationsProps> = ({
  title = "Recommended Hotels For a Three-Night Staycation",
  hotels = DEFAULT_HOTELS,
  onBookNow,
  onSeeAll,
}) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full bg-surface-section-alt p-5 rounded-3xl space-y-4 my-2 border border-slate-100/60 shadow-sm max-w-2xl">
      <h3 className="text-base md:text-lg font-bold text-brand-dark">
        {title}
      </h3>

      <div className="space-y-3.5">
        {hotels.map((hotel) => {
          const isFav = favorites[hotel.id] || hotel.isFavorite;

          return (
            <div
              key={hotel.id}
              className="bg-surface hover:bg-white rounded-2xl p-4 transition-all duration-200 border border-slate-100/80 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm"
            >
              {/* Image + Information on the left */}
              <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
                <div className="w-full sm:w-36 h-28 sm:h-28 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between h-28 py-0.5">
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-brand-dark">
                      {hotel.name}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-300 mt-2">
                    <Wifi className="w-3.5 h-3.5" />
                    <ParkingCircle className="w-3.5 h-3.5" />
                    <Utensils className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Right column: Tag Cheap, Price, Heart button + Book Now */}
              <div className="flex flex-col items-end justify-between gap-2.5 shrink-0 self-stretch">
                <div>
                  {hotel.tag && (
                    <span className="px-3 py-1 bg-success-light text-success text-xxs font-semibold rounded-full border border-green-200/40">
                      {hotel.tag}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-0.5">
                  <span className="text-lg md:text-xl font-bold text-brand-dark">
                    {hotel.price}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">
                    {hotel.pricePeriod || '/per night'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(hotel.id)}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition p-2.5 ${
                      isFav
                        ? 'bg-blue-100 border border-blue-200'
                        : 'bg-surface-section hover:bg-blue-100/60'
                    }`}
                  >
                    <img
                      src={iconHeart}
                      alt="Favorite"
                      className={`w-4 h-4 object-contain transition-all ${
                        isFav ? 'scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => onBookNow && onBookNow(hotel.id)}
                    className="px-4 py-2.5 bg-surface-section hover:bg-blue-600 hover:text-white text-blue-600 text-xs font-semibold rounded-2xl transition-all duration-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onSeeAll}
        className="w-full py-3 bg-surface-see-more/80 hover:bg-surface-see-more text-blue-600 text-xs md:text-sm font-semibold rounded-xl transition text-center"
      >
        See all recommendations
      </button>
    </div>
  );
};
