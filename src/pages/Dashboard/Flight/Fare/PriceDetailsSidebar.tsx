import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { InfoRow } from '../../../../components/InfoRow/InfoRow';

// Props definition for price calculation breakdown
interface PriceDetailsSidebarProps {
  pricePerTraveller: number;
  flightDues: number;
  taxesAndFees: number;
  totalAmount: number;
}

export const PriceDetailsSidebar: React.FC<PriceDetailsSidebarProps> = ({
  pricePerTraveller,
  flightDues,
  taxesAndFees,
  totalAmount,
}) => {
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
      <button className="w-full py-3.5 bg-surface-section hover:bg-blue-600 hover:text-white text-blue-600 font-semibold text-xs md:text-sm rounded-2xl transition cursor-pointer active:scale-95">
        Select booking platform
      </button>
    </Card>
  );
};
