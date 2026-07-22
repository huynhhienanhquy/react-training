import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface FareOption {
  id: 'economy' | 'business';
  name: string;
  airline: string;
  price: number;
  features: string[];
}

interface FareCardsProps {
  fareOptions: FareOption[];
  selectedFareId: 'economy' | 'business';
  defaultFlightLogo: string;
  onSelectFare: (id: 'economy' | 'business') => void;
}

export const FareCards: React.FC<FareCardsProps> = ({
  fareOptions,
  selectedFareId,
  defaultFlightLogo,
  onSelectFare,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        Select fare
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fareOptions.map((fare) => {
          const isSelected = selectedFareId === fare.id;

          return (
            <div
              key={fare.id}
               className={`bg-surface p-6 rounded-3xl border transition-all shadow-sm flex flex-col justify-between space-y-6 ${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-slate-100'
              }`}
            >
              <div className="space-y-4">
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

                <div>
                  <div className="text-2xl font-bold text-brand-dark">
                    ${fare.price}
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    {fare.name}
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-slate-500">
                  {fare.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectFare(fare.id)}
                className={`w-full py-3 rounded-2xl text-xs font-bold transition ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-surface-section text-blue-600 hover:bg-blue-100'
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
