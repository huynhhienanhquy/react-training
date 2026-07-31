import React, { useState } from 'react';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { Card } from '../../components/Card/Card';
import type { FlightLeg } from '../../types/flight';
import type { SelectedFlightBoxProps } from '../../types/flightfare';


export type { FlightLeg };

export const SelectedFlightBox = ({
  airlineName,
  defaultFlightLogo,
  iconHeart,
  legs,
  cancellationPolicy,
}: SelectedFlightBoxProps) => {
  // State to manage bookmark / favorite button toggle
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="space-y-3">
      {/* Section Title */}
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
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition p-2 cursor-pointer active:scale-95 ${
                isFavorite ? 'bg-blue-100' : 'bg-surface-section hover:bg-blue-100'
              }`}
            >
              <img
                src={iconHeart}
                alt="Favorite"
                className={`w-4 h-4 object-contain transition-transform ${
                  isFavorite ? 'scale-110' : ''
                }`}
              />
            </button>

            {/* Button to switch or re-select flight */}
            <button className="px-4 py-2 bg-surface-section hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-xl transition cursor-pointer active:scale-95">
              Change Flight
            </button>
          </div>
        </div>

        {/* List of Flight Legs / Routes */}
        <div className="space-y-2 text-xs md:text-sm pt-2">
          {legs.map((leg) => (
            <div key={leg.id} className="flex items-center gap-4">
              <span className="font-bold text-brand-dark w-24 md:w-32 text-xs md:text-sm">{leg.times}</span>
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
