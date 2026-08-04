import { Card } from '@/components/Card';
import { PriceDisplay } from '@/components/PriceDisplay';
import type { FareHeaderProps } from '@/types/flightfare';

export function FareHeader({
  destination,
  tripType,
  cabinClass,
  price,
  priceUnit,
}: FareHeaderProps) {
  return (
    <Card variant="surface" className="p-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-brand-dark">
          {destination}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
          {tripType} • {cabinClass}
        </p>
      </div>

      <div className="text-right">
        <PriceDisplay amount={`$${price}`} size="md" />
        <p className="text-xs text-slate-400 mt-0.5">{priceUnit}</p>
      </div>
    </Card>
  );
}
