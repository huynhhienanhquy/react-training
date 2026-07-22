import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
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
    <div className="bg-[#FAFBFD] rounded-3xl border border-slate-200/80 p-5 max-w-md w-full shadow-sm my-3 space-y-4">
      {/* Header Widget */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100/80 flex items-center justify-center text-blue-600">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#14153E] uppercase tracking-wider">
              Lịch trình gợi ý
            </h4>
            <p className="text-[11px] text-slate-400 font-medium">
              Kế hoạch {itinerary.length} ngày chi tiết
            </p>
          </div>
        </div>
      </div>

      {/* List the dates in the schedule. */}
      <div className="space-y-4">
        {itinerary.map((dayPlan) => (
          <div key={dayPlan.day} className="space-y-2">
            {/* Daily headlines */}
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                Ngày {dayPlan.day}
              </span>
              <h5 className="text-xs font-bold text-[#14153E]">
                {dayPlan.dateTitle}
              </h5>
            </div>

            {/* List of activities for the day*/}
            <div className="bg-white rounded-2xl border border-slate-100 p-3 space-y-3 shadow-xs">
              {dayPlan.activities.map((act, index) => (
                <div
                  key={act.id}
                  className={`flex gap-3 items-start ${
                    index !== dayPlan.activities.length - 1
                      ? 'pb-3 border-b border-slate-100'
                      : ''
                  }`}
                >
                  {/* Time*/}
                  <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 shrink-0 mt-0.5 w-18">
                    <Clock className="w-3 h-3" />
                    <span>{act.time}</span>
                  </div>

                  {/* Activity details */}
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h6 className="text-xs font-bold text-[#14153E] truncate">
                      {act.title}
                    </h6>
                    <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>{act.location}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Button Action */}
      <button
        onClick={onViewAll}
        className="w-full py-3 bg-[#EEF3FC] hover:bg-blue-600 hover:text-white text-blue-600 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
      >
        <span>Xem toàn bộ lịch trình</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
