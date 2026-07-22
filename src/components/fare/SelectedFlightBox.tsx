import React, { useState } from 'react';

export interface FlightLeg {
  id: string;
  times: string;
  route: string;
  duration: string;
  stops: string;
}

interface SelectedFlightBoxProps {
  airlineName: string;
  defaultFlightLogo: string;
  iconHeart: string;
  legs: FlightLeg[];
  cancellationPolicy: string;
}

export const SelectedFlightBox: React.FC<SelectedFlightBoxProps> = ({
  airlineName,
  defaultFlightLogo,
  iconHeart,
  legs,
  cancellationPolicy,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        Selected flights
      </h3>

      <div className="bg-surface p-6 rounded-3xl border border-slate-100 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition p-2 ${
                isFavorite ? 'bg-blue-100' : 'bg-surface-section hover:bg-blue-100'
              }`}
            >
              <img src={iconHeart} alt="Favorite" className="w-4 h-4 object-contain" />
            </button>

            <button className="px-4 py-2 bg-surface-section hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-xl transition">
              Change Flight
            </button>
          </div>
        </div>

        {/* Map danh sách chặng bay */}
        <div className="space-y-2 text-xs md:text-sm pt-2">
          {legs.map((leg) => (
            <div key={leg.id} className="flex items-center gap-4">
              <span className="font-bold text-brand-dark w-32">{leg.times}</span>
              <span className="text-slate-400">
                {leg.route} • {leg.duration} • {leg.stops}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 pt-2 border-t border-slate-100">
          {cancellationPolicy}
        </p>
      </div>
    </div>
  );
};
