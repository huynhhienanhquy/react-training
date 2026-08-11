
import { Card } from '@/components/common/Card';
import { InfoRow } from '@/components/common/InfoRow';
import { Button } from '@/components/common/Button';
import type { PriceDetailsSidebarProps } from '@/types/flightFareTypes';

export const PriceDetailsSidebar = ({
  pricePerTraveller,
  flightDues,
  taxesAndFees,
  totalAmount,
}: PriceDetailsSidebarProps) => {
  return (
    /* Sticky sidebar card for price summary */
    <Card variant="surface" className="space-y-6 p-6 lg:sticky lg:top-24 lg:min-h-379 lg:p-8">
      {/* Sidebar Header */}
      <h3 className="text-lg font-bold text-brand-dark md:text-xl lg:text-2xl">Price Details</h3>

      {/* Itemized Price Breakdown */}
      <div className="space-y-6 border-t border-slate-100 pt-4">
        <InfoRow className="[&>span:last-child]:font-normal [&>span:last-child]:text-slate-500" label="Price per traveller" value={`$${pricePerTraveller}`} />
        <InfoRow className="[&>span:last-child]:font-normal [&>span:last-child]:text-slate-500" label="Flight dues" value={`$${flightDues}`} />
        <InfoRow className="[&>span:last-child]:font-normal [&>span:last-child]:text-slate-500" label="Taxes and fees" value={`$${taxesAndFees}`} />

        {/* Total Cost Display */}
        <div className="flex items-center justify-between pt-1">
          <span className="font-bold text-brand-dark">Trip Total</span>
          <span className="text-base font-bold text-brand-dark">
            ${totalAmount}
          </span>
        </div>
      </div>

      {/* Primary Call To Action (CTA) Button */}
      <Button
        type="button"
        variant="light"
        size="none"
        className="h-12 w-full rounded-xl py-3.5 text-xs font-normal hover:bg-blue-600 hover:text-white active:scale-95 md:text-sm lg:text-base"
      >
        Select booking platform
      </Button>
    </Card>
  );
};
