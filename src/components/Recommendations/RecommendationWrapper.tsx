import React from 'react';
import { type RecommendationWrapperProps } from '@/types/card';

export const RecommendationWrapper = ({
  title,
  children,
  onSeeAll,
  seeAllText = 'See all recommendations',
}: RecommendationWrapperProps) => {
  return (
    <div className="w-full  my-3 space-y-4">
      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight pl-1">
        {title}
      </h3>

      {/* Main Container */}
      <div className="bg-white p-4 md:p-5 rounded-[28px] space-y-3.5 shadow-sm border border-slate-100/50">
        {children}

        {/* See All Button */}
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="w-full py-3 bg-[#EEF2FF] hover:bg-blue-600 hover:text-white text-blue-600 text-xs font-bold rounded-xl transition-all duration-200 text-center mt-2 cursor-pointer"
          >
            {seeAllText}
          </button>
        )}
      </div>
    </div>
  );
};
