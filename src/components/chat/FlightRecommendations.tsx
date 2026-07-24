import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { RecommendationWrapper } from './RecommendationWrapper';
import { FavoriteButton } from '../ui/button/FavoriteButton';
import { Button } from '../ui/Button';
import { PriceDisplay } from '../ui/PriceDisplay';
import defaultFlightLogo from '../../assets/icons/ellipse.png';

// Import Service API
import {  getFlightListApi, type FareData } from '../../services/fareService';

// Type definitions for outbound/return flights
export interface FlightLeg {
  time: string;
  route: string;
  duration: string;
  stops: string;
}

// Interface for flight suggestion card
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


  //This function helps convert data from the API (FareData) to a display format (FlightOption).
  //Secured with Optional Chaining (?.) to prevent crashes when a field is missing.

const mapFareDataToFlightOption = (fareData: FareData, index: number): FlightOption => {
  const legs = fareData?.legs || [];
  const fareOptions = fareData?.fareOptions || [];

  const outboundLeg = legs[0];
  const returnLeg = legs[1] || legs[0];
  const lowestPrice = fareOptions[0]?.price ?? 0;

  return {
    // Add a fallback index if IDs are duplicated or missing from MockAPI.
    id: fareData?.id ? String(fareData.id) : `flight-${index + 1}`,
    airline: fareData?.airlineName || 'Airline',
    outbound: {
      time: outboundLeg?.times || 'N/A',
      route: outboundLeg?.route || 'N/A',
      duration: outboundLeg?.duration || 'N/A',
      stops: outboundLeg?.stops || 'Direct',
    },
    returnLeg: {
      time: returnLeg?.times || 'N/A',
      route: returnLeg?.route || 'N/A',
      duration: returnLeg?.duration || 'N/A',
      stops: returnLeg?.stops || 'Direct',
    },
    price: `$${lowestPrice}`,
    tag: 'Cheap',
  };
};

export const FlightRecommendations: React.FC<FlightRecommendationsProps> = ({
  title = 'Recommended Flights For a Round Trip Journey',
  flights: initialFlights,
  onBookNow,
  onSeeAll,
}) => {
  const [flightList, setFlightList] = useState<FlightOption[]>(initialFlights || []);
  const [loading, setLoading] = useState<boolean>(!initialFlights);
  const [error, setError] = useState<string | null>(null);

  // State tracks flights marked as favorites.
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // If you pass flights directly through props, don't call the API.
    if (initialFlights) return;

    const fetchFlights = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call the API to retrieve the complete list of flights.
        const data = await getFlightListApi();

        // Flexible handling regardless of whether the API returns an Array or a Single Object.
        const items = Array.isArray(data) ? data : [data];
        const mappedList = items.map((item, index) => mapFareDataToFlightOption(item, index));

        setFlightList(mappedList);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || err.message || 'Lỗi kết nối máy chủ');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unable to load flight information from the server.');
        }
        setFlightList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [initialFlights]);

  // Handler toggle favorite status
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <RecommendationWrapper title={title} onSeeAll={onSeeAll}>
      {/* LOADING STATE */}
      {loading && (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Đang tải danh sách chuyến bay...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {error && !loading && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-xs text-center font-medium my-2">
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && flightList.length === 0 && (
        <div className="p-6 text-center text-xs text-slate-400">
          No suitable flights were found.
        </div>
      )}

      {/* FLIGHT LIST DISPLAY */}
      {!loading &&
        !error &&
        flightList.map((flight, idx) => {
          const isFav = !!(favorites[flight.id] || flight.isFavorite);
          // Ensure the key remains unique even if the API returns duplicate IDs.
          const uniqueKey = `${flight.id}-${idx}`;

          return (
            <div
              key={uniqueKey}
              className="bg-[#F8FAFC] rounded-2xl p-4 md:p-5 flex flex-col gap-4 border-none mb-3"
            >
              {/* Header: Logo, Airline Name & Action Controls */}
              <div className="flex items-center justify-between">
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

              {/* Schedules & Pricing Details */}
              <div className="grid grid-cols-[1fr_auto] gap-2 items-end pt-1">
                <div className="space-y-3 text-xs md:text-sm">
                  {/* Outbound Leg */}
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className="font-bold text-slate-900 w-24 md:w-32 shrink-0 text-xs md:text-sm">
                      {flight.outbound.time}
                    </span>
                    <span className="text-slate-500 font-medium truncate text-xs md:text-sm">
                      {flight.outbound.route} • {flight.outbound.duration} • {flight.outbound.stops}
                    </span>
                  </div>

                  {/* Return Leg */}
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
