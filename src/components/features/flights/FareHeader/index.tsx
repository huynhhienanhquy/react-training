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
    <Card variant="surface" className="flex items-start justify-between gap-3 p-4 sm:p-6 lg:min-h-[116px]">
      <div className="min-w-0">
        <h2 className="break-words text-lg font-bold text-brand-dark sm:text-xl md:text-2xl">
          {destination}
        </h2>
        <p className="mt-1 text-xs font-medium text-brand-dark md:text-sm lg:text-base">
          {tripType} • {cabinClass}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <PriceDisplay
          amount={`$${price}`}
          size="md"
          className="[&>span:first-child]:!text-2xl"
        />
        <p className="mt-0.5 text-xs text-slate-500 lg:text-base">{priceUnit}</p>
      </div>
    </Card>
  );
}
