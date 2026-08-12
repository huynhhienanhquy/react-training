import { useCallback, useMemo } from 'react';
import { RecommendationWrapper } from './RecommendationWrapper';
import { Button } from '@/components/common/Button';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import defaultFlightLogo from '@/assets/images/travel-provider-logo.png';

import { getFlights } from '@/services/fareService';
import type {
  FareData,
  FlightOption,
  FlightLegInfo,
  FlightRecommendationsProps,
} from '@/types/flight';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useFavorites } from '@/hooks/useFavorites';

export type { FlightOption, FlightLegInfo };

const mapFareDataToFlightOption = (
  fareData: FareData,
  index: number,
): FlightOption => {
  const legs = fareData.legs ?? [];
  const fareOptions = fareData.fareOptions ?? [];

  const outboundLeg = legs[0];
  const returnLeg = legs[1] ?? legs[0];
  const lowestPrice = fareOptions[0]?.price ?? 0;

  return {
    id: fareData.id ? String(fareData.id) : `flight-${index + 1}`,
    airline: fareData.airlineName ?? 'Airline',
    outbound: {
      time: outboundLeg?.times ?? 'N/A',
      route: outboundLeg?.route ?? 'N/A',
      duration: outboundLeg?.duration ?? 'N/A',
      stops: outboundLeg?.stops ?? 'Direct',
    },
    returnLeg: {
      time: returnLeg?.times ?? 'N/A',
      route: returnLeg?.route ?? 'N/A',
      duration: returnLeg?.duration ?? 'N/A',
      stops: returnLeg?.stops ?? 'Direct',
    },
    price: `$${lowestPrice}`,
    tag: 'Cheap',
  };
};

export function FlightRecommendations({
  title = 'Recommended Flights For a Round Trip Journey',
  flights: initialFlights,
  onBookNow,
  onSeeAll,
}: FlightRecommendationsProps) {
  const isControlled = Boolean(initialFlights);

  const {
    data: fareData,
    loading,
    error,
  } = useAsyncData(getFlights, {
    skip: isControlled,
  });

  const { favorites, toggleFavorite } = useFavorites();

  const apiFlights = useMemo(
    () => fareData?.map(mapFareDataToFlightOption) ?? [],
    [fareData],
  );

  const flightList = initialFlights ?? apiFlights;
  const createFavoriteHandler = useCallback(
    (flightId: string) => () => toggleFavorite(flightId),
    [toggleFavorite],
  );
  const createBookHandler = useCallback(
    (flightId: string) => () => onBookNow?.(flightId),
    [onBookNow],
  );

  return (
    <RecommendationWrapper title={title} onSeeAll={onSeeAll}>
      {!isControlled && loading && (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">
            Loading flight list...
          </p>
        </div>
      )}

      {!isControlled && error && !loading && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-xs text-center font-medium my-2">
          {error}
        </div>
      )}

      {!isControlled && !loading && !error && flightList.length === 0 && (
        <div className="p-6 text-center text-xs text-slate-400">
          No suitable flights were found.
        </div>
      )}

      {(isControlled || (!loading && !error)) &&
        flightList.map((flight) => {
          const isFavorite = Boolean(
            favorites[flight.id] || flight.isFavorite,
          );

          return (
            <div
              key={flight.id}
              className="mb-2 w-full overflow-hidden rounded-2xl bg-slate-50 p-4 shadow-none transition-colors duration-200 last:mb-0 sm:p-5 dark:bg-slate-700/70"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden">
                    <img
                      src={flight.logoUrl || defaultFlightLogo}
                      alt={flight.airline}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <span className="truncate text-sm font-semibold text-slate-500 sm:text-base">
                    {flight.airline}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    type="button"
                    variant="favorite"
                    size="icon"
                    isFavorite={isFavorite}
                    favoriteIconSize={20}
                    onClick={createFavoriteHandler(flight.id)}
                    className="h-12 w-12 rounded-xl border border-blue-100 md:h-12 md:w-12"
                  />

                  <Button
                    variant="secondary"
                    size="none"
                    onClick={createBookHandler(flight.id)}
                    className="ml-2 h-12 w-book-now shrink-0 rounded-xl text-base"                  
                    >
                    Book Now
                  </Button>
                </div>
              </div>

              <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div className="flex-1 space-y-5 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-flight-route sm:items-center sm:gap-4 desktop:grid-cols-flight-route-desktop">
                    <span className="shrink-0 text-sm font-bold text-slate-950 sm:text-base">
                      {flight.outbound.time}
                    </span>

                    <span className="text-sm font-medium leading-tight text-slate-500 sm:text-base">
                      {flight.outbound.route} • {flight.outbound.duration} •{' '}
                      {flight.outbound.stops}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-flight-route sm:items-center sm:gap-4 desktop:grid-cols-flight-route-desktop">
                    <span className="shrink-0 text-sm font-bold text-slate-950 sm:text-base">
                      {flight.returnLeg.time}
                    </span>

                    <span className="text-sm font-medium leading-tight text-slate-500 sm:text-base">
                      {flight.returnLeg.route} • {flight.returnLeg.duration} •{' '}
                      {flight.returnLeg.stops}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-4 border-t border-slate-200/60 pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                  {flight.tag && (
                    <span className="mb-3 flex h-10 w-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-base font-medium text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
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
}
