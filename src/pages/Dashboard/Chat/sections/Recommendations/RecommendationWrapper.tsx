import { Button } from '@/components/common/Button';

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
    <section className="my-5 w-full space-y-5">
      {/* Title */}
      <h3 className="pl-1 text-xl font-bold tracking-tight text-slate-950 md:text-2xl lg:pl-0">
        {title}
      </h3>

      {/* Main Container */}
      <div className="w-chat-input overflow-hidden rounded-3xl border-8 border-white bg-white shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-800 dark:shadow-black/30">
        {children}

        {/* See All Button */}
        {onSeeAll && (
          <Button
            type="button"
            variant="secondary"
            size="none"
            className="mt-2 h-14 w-full rounded-none bg-indigo-50 py-4 text-base font-normal text-blue-600 hover:bg-indigo-100 hover:text-blue-700 dark:bg-slate-700"
            onClick={onSeeAll}
          >
            {seeAllText}
          </Button>
        )}
      </div>
    </section>
  );
};
