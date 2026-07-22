import React from 'react';

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
    <div className="bg-surface p-6 rounded-3xl border border-slate-100 space-y-6 sticky top-24 shadow-sm">
      <h3 className="text-lg font-bold text-brand-dark">Price Details</h3>

      <div className="space-y-4 text-xs md:text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Price per traveller</span>
          <span className="font-semibold text-brand-dark">
            ${pricePerTraveller}
          </span>
        </div>

        <div className="flex justify-between text-slate-500">
          <span>Flight dues</span>
          <span className="font-semibold text-brand-dark">
            ${flightDues}
          </span>
        </div>

        <div className="flex justify-between text-slate-500">
          <span>Taxes and fees</span>
          <span className="font-semibold text-brand-dark">
            ${taxesAndFees}
          </span>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="font-bold text-brand-dark">Trip Total</span>
          <span className="text-xl font-bold text-brand-dark">
            ${totalAmount}
          </span>
        </div>
      </div>

      <button className="w-full py-3.5 bg-surface-section hover:bg-blue-600 hover:text-white text-blue-600 font-semibold text-xs md:text-sm rounded-2xl transition">
        Select booking platform
      </button>
    </div>
  );
};
