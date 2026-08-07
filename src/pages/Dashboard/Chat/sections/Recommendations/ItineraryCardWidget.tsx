import CalendarIcon from '@/components/icons/CalendarIcon';
import ClockIcon from '@/components/icons/ClockIcon';
import MapPinIcon from '@/components/icons/MapPinIcon';
import { Button } from '@/components/Button';
import { getItineraryListApi } from '@/services/travelService';
import type {
  DayItinerary,
  ItineraryCardWidgetProps,
} from '@/types/travel';
import { useAsyncData } from '@/hooks/useAsyncData';
import { Icon } from '@/components/icons/Icon';

export type { DayItinerary };

export function ItineraryCardWidget({
  itinerary: initialItinerary,
  onViewAll,
}: ItineraryCardWidgetProps) {
  const {
    data: apiItinerary,
    loading,
    error,
  } = useAsyncData(getItineraryListApi, {
    skip: Boolean(initialItinerary),
  });

  const itineraryList =
    initialItinerary ?? apiItinerary ?? [];

  return (
    <div className="bg-brand-light rounded-2xl p-4 md:p-5 flex flex-col gap-4 border-none max-w-2xl w-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
            <CalendarIcon className="w-4 h-4" />
          </div>

          <div>
            <h4 className="text-sm md:text-base font-bold text-slate-900">
              Suggested Itinerary
            </h4>

            <p className="text-xs text-slate-500 font-medium">
              {itineraryList.length > 0
                ? `${itineraryList.length} day trip plan recommendation`
                : 'Trip schedule overview'}
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />

          <p className="text-xs text-slate-400 font-medium">
            Loading schedule from server...
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-xs text-center font-medium my-1">
          {error}
        </div>
      )}

      {!loading && !error && itineraryList.length === 0 && (
        <div className="p-6 text-center text-xs text-slate-400 font-medium">
          No schedule has been created yet.
        </div>
      )}

      {!loading && !error && itineraryList.length > 0 && (
        <div className="space-y-4">
          {itineraryList.map((dayPlan) => (
          <div
            key={dayPlan.id ?? `${dayPlan.day}-${dayPlan.dateTitle}`}
            className="space-y-2.5"
          >
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-600 text-white text-xxs font-bold rounded-full">
                Day {dayPlan.day}
              </span>

              <h5 className="text-xs md:text-sm font-bold text-slate-800 truncate">
                {dayPlan.dateTitle}
              </h5>
            </div>

            <div className="bg-white rounded-xl p-3 border border-slate-200/60 space-y-2">
              {dayPlan.activities?.map((act) => (
                <div
                  key={act.id ?? `${act.title}-${act.time}`}
                  className="flex items-start justify-between gap-3 pt-2 first:pt-0 border-t border-slate-100 first:border-t-0"
                >
                  <div className="flex-1 min-w-0">
                    <h6 className="text-xs md:text-sm font-semibold text-slate-900 truncate">
                      {act.title}
                    </h6>

                    {act.location && (
                      <p className="text-xs text-slate-500 flex items-center gap-1 font-medium mt-0.5 truncate">
                        <MapPinIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{act.location}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xxs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md shrink-0">
                    <ClockIcon className="w-3 h-3 text-slate-400" />
                    <span>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        </div>
      )}

      <div className="pt-1">
        <Button
          variant="dark"
          size="md"
          className="w-full rounded-2xl"
          rightIcon={
            <Icon name="arrow-right" className="w-4 h-4" />
          }
          onClick={onViewAll}
        >
          View Full Itinerary Details
        </Button>
      </div>
    </div>
  );
}
