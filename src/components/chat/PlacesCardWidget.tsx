import React from 'react';
import { MapPin, Star, Utensils, Camera, ShoppingBag, Compass } from 'lucide-react';
import { ViewAllButton } from '../ui/button/ViewAllButton';
import { DEFAULT_PLACES, type PlaceItem } from './placesData';

interface PlacesCardWidgetProps {
  places?: PlaceItem[];
  onViewAll?: () => void;
}

export const PlacesCardWidget: React.FC<PlacesCardWidgetProps> = ({
  places = DEFAULT_PLACES,
  onViewAll,
}) => {
  // Helper to map category to icon & badge styling
  const getCategoryBadge = (category: PlaceItem['category']) => {
    switch (category) {
      case 'food':
        return { label: 'Cuisine', icon: Utensils, color: 'bg-amber-100/70 text-amber-700' };
      case 'sightseeing':
        return { label: 'Sightseeing', icon: Camera, color: 'bg-emerald-100/70 text-emerald-700' };
      case 'shopping':
        return { label: 'Shopping', icon: ShoppingBag, color: 'bg-purple-100/70 text-purple-700' };
      default:
        return { label: 'Entertainment', icon: Compass, color: 'bg-blue-100/70 text-blue-700' };
    }
  };

  return (
    /* Card wrapper component styled consistently with HotelRecommendations */
    <div className="bg-[#F8FAFC] rounded-2xl p-4 md:p-5 flex flex-col gap-4 border-none max-w-2xl w-full">
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm md:text-base font-bold text-slate-900">
              Featured Places
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              {places.length} recommended locations nearby
            </p>
          </div>
        </div>

        <span className="px-3 py-1 bg-emerald-100/70 text-emerald-700 text-[11px] font-bold rounded-full">
          Featured
        </span>
      </div>

      {/* Places List */}
      <div className="space-y-3">
        {places.map((place) => {
          const badge = getCategoryBadge(place.category);
          const CategoryIcon = badge.icon;

          return (
            <div
              key={place.id}
              className="bg-white rounded-xl p-3 border border-slate-200/60 flex items-center gap-3.5 hover:border-slate-300 transition-colors cursor-pointer"
            >
              {/* Place Image Thumbnail */}
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Place Information */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.color}`}
                  >
                    <CategoryIcon className="w-3 h-3" />
                    {badge.label}
                  </span>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-800">
                      {place.rating}
                    </span>
                  </div>
                </div>

                <h5 className="font-bold text-xs md:text-sm text-slate-900 truncate">
                  {place.name}
                </h5>

                <p className="text-xs text-slate-500 truncate flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{place.address}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="pt-1">
        <ViewAllButton onClick={onViewAll}>
          See All Recommended Locations
        </ViewAllButton>
      </div>
    </div>
  );
};
