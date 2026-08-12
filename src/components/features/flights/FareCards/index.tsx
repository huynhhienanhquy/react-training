
import CheckCircleIcon from '@/components/common/Icons/CheckCircleIcon';
import { SectionHeader } from '../SectionHeader';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { Button } from '@/components/common/Button';

import type { FareOption } from '@/types/flight';
import type { FareCardsProps } from '@/types/flightFareTypes';

export type { FareOption };

  export const FareCards = ({
    fareOptions,
    selectedFareId,
    defaultFlightLogo,
    onSelectFare,
  }: FareCardsProps) => {
    const createSelectHandler = (fareId: FareOption['id']) => () => onSelectFare(fareId);
    return (
      <div className="space-y-3 lg:space-y-4">
        {/* Section Title */}
        <SectionHeader title="Select fare" />

        {/* Grid containing Economy and Business fare cards */}
        <div className="grid min-w-0 grid-cols-1 gap-4 desktop:grid-cols-2">
          {fareOptions.map((fare) => {
            return (
              <div
                key={fare.id}
                className="box-border flex min-h-fare-card w-full flex-col justify-between space-y-6 rounded-3xl border border-slate-100 bg-surface p-4 shadow-sm transition-all sm:p-6 lg:p-8 desktop:h-fare-card desktop:w-price-details"              >
                <div className="space-y-4">
                  {/* Airline Logo & Name */}
                  <div className="flex items-center gap-2">
                    <img
                      src={defaultFlightLogo}
                      alt={fare.airline}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs font-normal text-slate-500 md:text-sm lg:text-base">
                      {fare.airline}
                    </span>
                  </div>

                  {/* Fare Price & Cabin Class Title */}
                  <div>
                    <PriceDisplay
                      amount={`$${fare.price}`}
                      size="md"
                      className="[&>span:first-child]:!text-2xl [&>span:first-child]:text-brand-dark"
                    />
                    <div className="mt-1 text-xs font-normal uppercase text-slate-500 md:text-sm lg:text-base">
                      {fare.name}
                    </div>
                  </div>

                  {/* List of included benefits/features */}
                  <ul className="space-y-4 border-t border-slate-100 pt-4 text-xs text-slate-500 md:text-sm lg:text-base">
                    {fare.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircleIcon className="h-4.5 w-4.5 shrink-0 text-slate-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button to pick the fare class */}
                <Button
                  type="button"
                  variant="light"
                  size="none"
                  aria-pressed={selectedFareId === fare.id}
                  className="h-12 w-full rounded-xl py-3 text-base font-normal active:scale-95 desktop:w-330"
                  onClick={createSelectHandler(fare.id)}
                >
                  Select
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
