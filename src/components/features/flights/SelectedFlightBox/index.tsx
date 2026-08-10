import { useState } from 'react';
import { SectionHeader } from '../SectionHeader';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import type { FlightLeg } from '@/types/flight';
import type { SelectedFlightBoxProps } from '@/types/flightFareTypes';

export type { FlightLeg };

export const SelectedFlightBox = ({
  airlineName,
  defaultFlightLogo,
  iconHeart: HeartIcon,
  legs,
  cancellationPolicy,
}: SelectedFlightBoxProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleToggleFavorite = () => setIsFavorite((prev) => !prev);

  return (
    <div className="space-y-3">
      <SectionHeader title="Selected flights" />

      <Card variant="surface" className="p-6 space-y-4">
        {/* Header: Airline info, favorite button, and change flight action */}
        <div className="flex items-center justify-between">
          {/* Airline Logo & Name */}
          <div className="flex items-center gap-2.5">
            <img
              src={defaultFlightLogo}
              alt={airlineName}
              className="w-5 h-5 object-contain"
            />

            <span className="text-sm font-semibold text-slate-600">
              {airlineName}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Bookmark / Favorite Toggle Button */}
            <Button
              type="button"
              variant="favorite"
              size="icon"
              isFavorite={isFavorite}
              aria-label={
                isFavorite
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              }
              aria-pressed={isFavorite}
              className="w-9 h-9 rounded-xl p-2 active:scale-95"
              onClick={handleToggleFavorite}
              leftIcon={
                <HeartIcon
                  width={16}
                  height={16}
                  color={isFavorite ? '#FFFFFF' : '#0436FF'}
                  aria-hidden="true"
                  className={`transition-transform ${
                    isFavorite ? 'scale-110' : ''
                  }`}
                />
              }
            />

            {/* Button to switch or re-select flight */}
            <Button
              type="button"
              variant="light"
              size="sm"
              className="px-4 active:scale-95"
            >
              Change Flight
            </Button>
          </div>
        </div>

        {/* List of Flight Legs / Routes */}
        <div className="space-y-2 text-xs md:text-sm pt-2">
          {legs.map((leg) => (
            <div key={leg.id} className="flex items-center gap-4">
              <span className="font-bold text-brand-dark w-24 md:w-32 text-xs md:text-sm">
                {leg.times}
              </span>

              <span className="text-slate-400 text-xs md:text-sm">
                {leg.route} • {leg.duration} • {leg.stops}
              </span>
            </div>
          ))}
        </div>

        {/* Cancellation policy note */}
        <p className="text-xs text-slate-400 pt-2 border-t border-slate-100">
          {cancellationPolicy}
        </p>
      </Card>
    </div>
  );
};
