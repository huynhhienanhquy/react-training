import React, { useState } from 'react';
import { Wifi, ParkingCircle, Utensils } from 'lucide-react';
import { RecommendationWrapper } from './RecommendationWrapper';
import { FavoriteButton } from '../ui/button/FavoriteButton';
import { BookButton } from '../ui/button/BookButton';
import { PriceDisplay } from '../ui/PriceDisplay';

// Interface defining individual hotel option data structure
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

// Props interface for hotel recommendation section component
interface HotelRecommendationsProps {
  title?: string;
  hotels?: HotelOption[];
  onBookNow?: (hotelId: string) => void;
  onSeeAll?: () => void;
}

// Mock fallback dataset for hotel recommendations
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
  // State map to track user's favorited hotel items locally
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Handler to toggle favorite state for a specific hotel ID
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    /* Card wrapper component supplying unified layout and optional "See All" header */
    <RecommendationWrapper title={title} onSeeAll={onSeeAll}>
      {hotels.map((hotel) => {
        // Resolve whether this specific hotel is bookmarked
        const isFav = !!(favorites[hotel.id] || hotel.isFavorite);

        return (
          <div
            key={hotel.id}
            className="bg-[#F8FAFC] rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-none"
          >
            {/* Left Section: Hotel Thumbnail & Detailed Information */}
            <div className="flex flex-col sm:flex-row gap-3.5 items-center flex-1 w-full sm:w-auto">
              {/* Hotel Image Thumbnail */}
              <div className="w-full sm:w-32 h-28 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Info & Amenity Icons */}
              <div className="flex-1 flex flex-col justify-between h-auto sm:h-24 py-0.5 w-full">
                <div>
                  <h4 className="text-sm md:text-base font-bold text-slate-900">
                    {hotel.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-medium">
                    {hotel.description}
                  </p>
                </div>

                {/* Amenity Badges (WiFi, Parking, Dining) */}
                <div className="flex items-center gap-3 text-slate-400 mt-2">
                  <Wifi className="w-3.5 h-3.5" />
                  <ParkingCircle className="w-3.5 h-3.5" />
                  <Utensils className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Right Section: Pricing, Highlight Badge & CTA Actions */}
            <div className="flex sm:flex-col flex-row items-end justify-between gap-3 shrink-0 w-full sm:w-auto sm:self-stretch pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/50">
              {/* Highlight Tag & Price Display */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                {hotel.tag ? (
                  <span className="px-3 py-1 bg-emerald-100/70 text-emerald-700 text-[11px] font-bold rounded-full">
                    {hotel.tag}
                  </span>
                ) : (
                  <div />
                )}

                <PriceDisplay
                  amount={hotel.price}
                  period={hotel.pricePeriod || '/per night'}
                  size="sm"
                  className="mt-1"
                />
              </div>

              {/* Action Controls: Favorite & Book Buttons */}
              <div className="flex items-center gap-2">
                <FavoriteButton
                  isFavorite={isFav}
                  onToggle={() => toggleFavorite(hotel.id)}
                />
                <BookButton onClick={() => onBookNow?.(hotel.id)}>
                  Book Now
                </BookButton>
              </div>
            </div>
          </div>
        );
      })}
    </RecommendationWrapper>
  );
};
