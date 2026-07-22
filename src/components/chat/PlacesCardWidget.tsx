import React from 'react';
import { MapPin, Star, ArrowRight, Utensils, Camera, ShoppingBag, Compass } from 'lucide-react';
import { DEFAULT_PLACES, type PlaceItem } from './placesData';

interface PlacesCardWidgetProps {
  places?: PlaceItem[];
  onViewAll?: () => void;
}

export const PlacesCardWidget: React.FC<PlacesCardWidgetProps> = ({
  places = DEFAULT_PLACES,
  onViewAll,
}) => {
  const getCategoryBadge = (category: PlaceItem['category']) => {
    switch (category) {
      case 'food':
        return { label: 'Ẩm thực', icon: Utensils, color: 'bg-orange-50 text-orange-600 border-orange-100' };
      case 'sightseeing':
        return { label: 'Tham quan', icon: Camera, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
      case 'shopping':
        return { label: 'Mua sắm', icon: ShoppingBag, color: 'bg-purple-50 text-purple-600 border-purple-100' };
      default:
        return { label: 'Giải trí', icon: Compass, color: 'bg-blue-50 text-blue-600 border-blue-100' };
    }
  };

  return (
    <div className="bg-[#FAFBFD] rounded-3xl border border-slate-200/80 p-5 max-w-md w-full shadow-sm my-3 space-y-4">
      {/* Header Widget */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-100/80 flex items-center justify-center text-orange-600">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#14153E] uppercase tracking-wider">
              Địa điểm nổi bật
            </h4>
            <p className="text-[11px] text-slate-400 font-medium">
              {places.length} gợi ý xung quanh
            </p>
          </div>
        </div>
      </div>

      {/* Item List */}
      <div className="space-y-3">
        {places.map((place) => {
          const badge = getCategoryBadge(place.category);
          const CategoryIcon = badge.icon;

          return (
            <div
              key={place.id}
              className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs flex gap-3.5 items-center hover:border-blue-200 transition"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge.color}`}
                  >
                    <CategoryIcon className="w-3 h-3" />
                    {badge.label}
                  </span>

                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-[#14153E]">
                      {place.rating}
                    </span>
                  </div>
                </div>

                <h5 className="font-bold text-xs text-[#14153E] truncate">
                  {place.name}
                </h5>

                <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{place.address}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Button Action */}
      <button
        onClick={onViewAll}
        className="w-full py-3 bg-[#EEF3FC] hover:bg-blue-600 hover:text-white text-blue-600 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
      >
        <span>Xem danh sách đầy đủ</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
