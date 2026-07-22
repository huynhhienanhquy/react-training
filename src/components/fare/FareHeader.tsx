import React from 'react';

interface FareHeaderProps {
  destination: string;
  tripType: string;
  cabinClass: string;
  price: number;
  priceUnit: string;
}

export const FareHeader: React.FC<FareHeaderProps> = ({
  destination,
  tripType,
  cabinClass,
  price,
  priceUnit,
}) => {
  return (
    <div className="bg-surface p-6 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-brand-dark">
          {destination}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
          {tripType} • {cabinClass}
        </p>
      </div>

      <div className="text-right">
        <span className="text-2xl md:text-3xl font-bold text-brand-dark">
          ${price}
        </span>
        <p className="text-xs text-slate-400 mt-0.5">{priceUnit}</p>
      </div>
    </div>
  );
};
