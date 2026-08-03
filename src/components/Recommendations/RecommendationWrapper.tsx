import { Button } from '@/components/Button/Button';
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
      <div className="bg-white p-4 md:p-5 rounded-card space-y-3.5 shadow-sm border border-slate-100/50">
        {children}

        {/* See All Button */}
        {onSeeAll && (
          <Button
            type="button"
            variant="secondary"
            size="none"
            className="w-full py-3 text-xs rounded-xl mt-2"
            onClick={onSeeAll}
          >
            {seeAllText}
          </Button>
        )}
      </div>
    </div>
  );
};
