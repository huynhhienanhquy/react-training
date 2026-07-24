import React, { useState } from 'react';
import { RecommendationWrapper } from './RecommendationWrapper';
import { FavoriteButton } from '../ui/button/FavoriteButton';
import { Button } from '../ui/Button';
import { PriceDisplay } from '../ui/PriceDisplay';
import defaultFlightLogo from '../../assets/icons/ellipse.png';

// Type definitions for outbound/return flight legs
export interface FlightLeg {
  time: string;
  route: string;
  duration: string;
  stops: string;
}

// Interface for individual flight recommendation item
export interface FlightOption {
  id: string;
  airline: string;
  logoUrl?: string;
  outbound: FlightLeg;
  returnLeg: FlightLeg;
  price: string;
  tag?: string;
  isFavorite?: boolean;
}

// Component props interface
interface FlightRecommendationsProps {
  title?: string;
  flights?: FlightOption[];
  onBookNow?: (flightId: string) => void;
  onSeeAll?: () => void;
}

// Mock fallback dataset for flight recommendations
const DEFAULT_FLIGHTS: FlightOption[] = [
  {
    id: '1',
    airline: 'AirPeace Airways, Nigerian',
    outbound: { time: '9:15am - 9:15pm', route: 'QOW - LAG', duration: '9h 24m', stops: '1 stop' },
    returnLeg: { time: '4:25am - 10:20pm', route: 'LAG - QOW', duration: '9h 24m', stops: '1 stop' },
    price: '$1200',
    tag: 'Cheap',
  },
  {
    id: '2',
    airline: 'AirPeace Airways, Nigerian',
    outbound: { time: '9:15am - 9:15pm', route: 'QOW - LAG', duration: '9h 24m', stops: '1 stop' },
    returnLeg: { time: '4:25am - 10:20pm', route: 'LAG - QOW', duration: '9h 24m', stops: '1 stop' },
    price: '$1200',
    tag: 'Cheap',
  },
];

export const FlightRecommendations: React.FC<FlightRecommendationsProps> = ({
  title = "Recommended Flights For a Round Trip Journey",
  flights = DEFAULT_FLIGHTS,
  onBookNow,
  onSeeAll,
}) => {
  // State map to track user's favorited flight items locally
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Handler to toggle favorite state for a specific flight ID
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    /* Card wrapper component supplying unified layout and optional "See All" header */
    <RecommendationWrapper title={title} onSeeAll={onSeeAll}>
      {flights.map((flight) => {
        // Resolve whether this specific flight is bookmarked
        const isFav = !!(favorites[flight.id] || flight.isFavorite);

        return (
          <div
            key={flight.id}
            className="bg-[#F8FAFC] rounded-2xl p-4 md:p-5 flex flex-col gap-4 border-none"
          >
            {/* Header: Airline Logo, Name & Action Controls */}
            <div className="flex items-center justify-between">
              {/* Airline Brand Info */}
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={flight.logoUrl || defaultFlightLogo}
                    alt={flight.airline}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-600">
                  {flight.airline}
                </span>
              </div>

              {/* Action Buttons: Favorite toggle & Booking CTA */}
              <div className="flex items-center gap-2">
                <FavoriteButton
                  isFavorite={isFav}
                  onToggle={() => toggleFavorite(flight.id)}
                />
                <Button variant="secondary" size="sm" onClick={() => onBookNow?.(flight.id)}>
                  Book Now
                </Button>
              </div>
            </div>

            {/* Main Content: Flight Schedules & Pricing Details */}
            <div className="grid grid-cols-[1fr_auto] gap-2 items-end pt-1">
              {/* Schedule Breakdown: Outbound & Return Legs */}
              <div className="space-y-3 text-xs md:text-sm">
                {/* Outbound Leg Information */}
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="font-bold text-slate-900 w-24 md:w-32 shrink-0 text-xs md:text-sm">
                    {flight.outbound.time}
                  </span>
                  <span className="text-slate-500 font-medium truncate text-xs md:text-sm">
                    {flight.outbound.route} • {flight.outbound.duration} • {flight.outbound.stops}
                  </span>
                </div>

                {/* Return Leg Information */}
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="font-bold text-slate-900 w-24 md:w-32 shrink-0 text-xs md:text-sm">
                    {flight.returnLeg.time}
                  </span>
                  <span className="text-slate-500 font-medium truncate text-xs md:text-sm">
                    {flight.returnLeg.route} • {flight.returnLeg.duration} • {flight.returnLeg.stops}
                  </span>
                </div>
              </div>

              {/* Price Display and Highlight Tag */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                {flight.tag && (
                  <span className="px-3 py-1 bg-emerald-100/70 text-emerald-700 text-[11px] font-bold rounded-full">
                    {flight.tag}
                  </span>
                )}
                <PriceDisplay amount={flight.price} size="sm" />
              </div>
            </div>
          </div>
        );
      })}
    </RecommendationWrapper>
  );
};
