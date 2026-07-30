  import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { PriceDisplay } from '../../components/PriceDisplay/PriceDisplay';

import type { FareOption } from '../../types/flight';
import type { FareCardsProps } from '../../types/flightfare';

export type { FareOption };

  export const FareCards: React.FC<FareCardsProps> = ({
    fareOptions,
    selectedFareId,
    defaultFlightLogo,
    onSelectFare,
  }) => {
    return (
      <div className="space-y-3">
        {/* Section Title */}
        <SectionHeader title="Select fare" />

        {/* Grid containing Economy and Business fare cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fareOptions.map((fare) => {
            // Check if the current card is active/selected
            const isSelected = selectedFareId === fare.id;

            return (
              <div
                key={fare.id}
                className={`bg-surface p-6 rounded-3xl border transition-all shadow-sm flex flex-col justify-between space-y-6 ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-500/20' // Highlight border when selected
                    : 'border-slate-100'
                }`}
              >
                <div className="space-y-4">
                  {/* Airline Logo & Name */}
                  <div className="flex items-center gap-2">
                    <img
                      src={defaultFlightLogo}
                      alt={fare.airline}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs font-medium text-slate-500">
                      {fare.airline}
                    </span>
                  </div>

                  {/* Fare Price & Cabin Class Title */}
                  <div>
                    <PriceDisplay amount={`$${fare.price}`} size="md" className="text-brand-dark" />
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                      {fare.name}
                    </div>
                  </div>

                  {/* List of included benefits/features */}
                  <ul className="space-y-3 text-xs text-slate-500">
                    {fare.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button to pick the fare class */}
                <button
                  onClick={() => onSelectFare(fare.id)}
                  className={`w-full py-3 rounded-2xl text-xs font-bold transition cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-blue-600 text-white' // Primary button style for active selection
                      : 'bg-surface-section text-blue-600 hover:bg-blue-100' // Secondary style for inactive cards
                  }`}
                >
                  Select
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
