import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { DEFAULT_ITINERARY, type DayItinerary } from './itineraryData';

interface ItineraryCardWidgetProps {
  itinerary?: DayItinerary[];
  onViewAll?: () => void;
}

export const ItineraryCardWidget: React.FC<ItineraryCardWidgetProps> = ({
  itinerary = DEFAULT_ITINERARY,
  onViewAll,
}) => {
  return (
    /* Floating widget container styled to match recommendation cards */
    <div className="bg-[#F8FAFC] rounded-2xl p-4 md:p-5 flex flex-col gap-4 border-none max-w-2xl w-full">
      {/* Widget Header: Title & Icon */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm md:text-base font-bold text-slate-900">
              Suggested Itinerary
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              {itinerary.length} day trip plan recommendation
            </p>
          </div>
        </div>
      </div>

      {/* Itinerary Schedule Days */}
      <div className="space-y-4">
        {itinerary.map((dayPlan) => (
          <div key={dayPlan.day} className="space-y-2.5">
            {/* Day Header Badge */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[11px] font-bold rounded-full">
                Day {dayPlan.day}
              </span>
              <h5 className="text-xs md:text-sm font-bold text-slate-800 truncate">
                {dayPlan.dateTitle}
              </h5>
            </div>

            {/* Activities Card List */}
            <div className="bg-white rounded-xl p-3 border border-slate-200/60 space-y-2">
              {dayPlan.activities.map((act, index) => (
                <div
                  key={act.id || index}
                  className="flex items-start justify-between gap-3 pt-2 first:pt-0 border-t border-slate-100 first:border-t-0"
                >
                  {/* Activity Details */}
                  <div className="flex-1 min-w-0">
                    <h6 className="text-xs md:text-sm font-semibold text-slate-900 truncate">
                      {act.title}
                    </h6>
                    {act.location && (
                      <p className="text-xs text-slate-500 flex items-center gap-1 font-medium mt-0.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{act.location}</span>
                      </p>
                    )}
                  </div>

                  {/* Activity Schedule Time */}
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md shrink-0">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Primary Action Button */}
      <div className="pt-1">
        <Button variant="dark" size="md" className="w-full rounded-2xl" rightIcon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>} onClick={onViewAll}>
          View Full Itinerary Details
        </Button>
      </div>
    </div>
  );
};
