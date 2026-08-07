import { Button } from '@/components/Button';

interface RecommendationWrapperProps {
  title: string;
  children: React.ReactNode;
  onSeeAll?: () => void;
  seeAllText?: string;
}

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
      <div className="bg-white dark:bg-slate-800 p-4 md:p-5 rounded-card space-y-3.5 shadow-sm dark:shadow-black/30 border border-slate-100/50 dark:border-slate-700 transition-colors duration-200">
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
