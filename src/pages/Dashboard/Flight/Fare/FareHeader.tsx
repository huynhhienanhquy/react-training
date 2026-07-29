import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { PriceDisplay } from '../../../../components/PriceDisplay/PriceDisplay';

// Interface defining properties for the FareHeader component
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
    <Card variant="surface" className="p-6 flex items-center justify-between">
      {/* Left side: Destination name & flight details summary */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-brand-dark">
          {destination}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
          {tripType} • {cabinClass}
        </p>
      </div>

      {/* Right side: Base price amount & unit label */}
      <div className="text-right">
        <PriceDisplay amount={`$${price}`} size="md" />
        <p className="text-xs text-slate-400 mt-0.5">{priceUnit}</p>
      </div>
    </Card>
  );
};
