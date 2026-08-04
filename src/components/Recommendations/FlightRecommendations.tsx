import { RecommendationWrapper } from './RecommendationWrapper';
import { Button } from '@/components/Button/Button';
import { PriceDisplay } from '../PriceDisplay/PriceDisplay';
import defaultFlightLogo from '@/assets/images/ellipse.png';

import { getFlightListApi } from '@/services/fareService';
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
  } = useAsyncData(getFlightListApi, {
    skip: isControlled,
  });

  const { favorites, toggleFavorite } = useFavorites();

  const apiFlights =
    fareData?.map(mapFareDataToFlightOption) ?? [];

  const flightList = initialFlights ?? apiFlights;

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
          const isFav = Boolean(
            favorites[flight.id] || flight.isFavorite,
          );

          return (
            <div
              key={flight.id}
              className="bg-brand-light rounded-2xl p-3.5 sm:p-5 flex flex-col gap-3.5 border-none mb-3 overflow-hidden w-full min-h-200 "
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={flight.logoUrl || defaultFlightLogo}
                      alt={flight.airline}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate">
                    {flight.airline}
                  </span>
                </div>

                <div className="pb-2 flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="favorite"
                    size="icon"
                    isFavorite={isFav}
                    onClick={() => toggleFavorite(flight.id)}
                  />

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onBookNow?.(flight.id)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1 border-t border-slate-100/60">
                <div className="space-y-2 text-xs sm:text-sm flex-1">
                  <div className="pb-7 flex flex-wrap sm:flex-nowrap items-baseline sm:items-center gap-x-3 gap-y-0.5">
                    <span className="font-bold text-slate-900 shrink-0 text-xs sm:text-sm">
                      {flight.outbound.time}
                    </span>

                    <span className="text-slate-500 font-medium text-xxs sm:text-xs leading-tight">
                      {flight.outbound.route} • {flight.outbound.duration} •{' '}
                      {flight.outbound.stops}
                    </span>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-baseline sm:items-center gap-x-3 gap-y-0.5">
                    <span className="font-bold text-slate-900 shrink-0 text-xs sm:text-sm">
                      {flight.returnLeg.time}
                    </span>

                    <span className="text-slate-500 font-medium text-xxs sm:text-xs leading-tight">
                      {flight.returnLeg.route} • {flight.returnLeg.duration} •{' '}
                      {flight.returnLeg.stops}
                    </span>
                  </div>
                </div>

                <div className="pb-10 flex items-center sm:flex-col justify-between sm:justify-end sm:items-end gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/40 shrink-0">
                  {flight.tag && (
                    <span className="px-2.5 py-0.5 bg-emerald-100/80 text-emerald-700 text-2xs sm:text-xxs font-bold rounded-full">
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
