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
    <Card 
      variant="surface"   
      className="box-border flex min-h-select-fare-card w-full flex-col gap-4 p-4 sm:p-6 sm:flex-row sm:items-start sm:justify-between desktop:h-select-fare-card desktop:w-select-hotel-card desktop:shrink-0"
    >
      <div className="min-w-0">
        <h2 className="break-words text-lg font-bold text-brand-dark sm:text-xl md:text-2xl">
          {destination}
        </h2>
        <p className="mt-1 text-xs font-normal text-brand-dark md:text-sm lg:text-base">
          {tripType} • {cabinClass}
        </p>
      </div>

      <div className="self-end text-right sm:shrink-0 sm:self-auto">
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
