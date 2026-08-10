
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
    <Card variant="surface" className="p-6 space-y-6 lg:sticky lg:top-24">
      {/* Sidebar Header */}
      <h3 className="text-lg font-bold text-brand-dark">Price Details</h3>

      {/* Itemized Price Breakdown */}
      <div className="space-y-4">
        <InfoRow label="Price per traveller" value={`$${pricePerTraveller}`} />
        <InfoRow label="Flight dues" value={`$${flightDues}`} />
        <InfoRow label="Taxes and fees" value={`$${taxesAndFees}`} />

        {/* Total Cost Display */}
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="font-bold text-brand-dark">Trip Total</span>
          <span className="text-xl font-bold text-brand-dark">
            ${totalAmount}
          </span>
        </div>
      </div>

      {/* Primary Call To Action (CTA) Button */}
      <Button
        type="button"
        variant="light"
        size="none"
        className="w-full py-3.5 text-xs md:text-sm rounded-2xl hover:bg-blue-600 hover:text-white active:scale-95"
      >
        Select booking platform
      </Button>
    </Card>
  );
};
