import { Card } from '@/components/common/Card';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import type { FareHeaderProps } from '@/types/flightFareTypes';

export function FareHeader({
  destination,
  tripType,
  cabinClass,
  price,
  priceUnit,
}: FareHeaderProps) {
  return (
    <Card variant="surface" className="flex items-start justify-between gap-3 p-4 sm:p-6">
      <div className="min-w-0">
        <h2 className="break-words text-lg font-bold text-brand-dark sm:text-xl md:text-2xl">
          {destination}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
          {tripType} • {cabinClass}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <PriceDisplay amount={`$${price}`} size="md" />
        <p className="text-xs text-slate-400 mt-0.5">{priceUnit}</p>
      </div>
    </Card>
  );
}
