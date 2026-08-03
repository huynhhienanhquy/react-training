import {
  MapPin,
  Star,
  Utensils,
  Camera,
  ShoppingBag,
  Compass,
  Hotel,
} from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { getPlaceListApi } from '@/services/travelService';
import type {
  PlaceData,
  PlacesCardWidgetProps,
} from '../../types/travel';
import { useAsyncData } from '@/hooks/useAsyncData';
import {Icon} from '@/components/Icons/Icon';

export type { PlaceData };

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

const getCategoryBadge = (category?: string) => {
  const cat = category?.toLowerCase() ?? '';

  if (cat.includes('food') || cat.includes('cuisine')) {
    return {
      label: 'Cuisine',
      icon: Utensils,
      color: 'bg-amber-100/70 text-amber-700',
    };
  }

  if (cat.includes('sight') || cat.includes('cam')) {
    return {
      label: 'Sightseeing',
      icon: Camera,
      color: 'bg-emerald-100/70 text-emerald-700',
    };
  }

  if (cat.includes('shop') || cat.includes('shopping')) {
    return {
      label: 'Shopping',
      icon: ShoppingBag,
      color: 'bg-purple-100/70 text-purple-700',
    };
  }

  if (
    cat.includes('hotel') ||
    cat.includes('resort') ||
    cat.includes('ryokan')
  ) {
    return {
      label: category ?? 'Stay',
      icon: Hotel,
      color: 'bg-indigo-100/70 text-indigo-700',
    };
  }

  return {
    label: category ?? 'Entertainment',
    icon: Compass,
    color: 'bg-blue-100/70 text-blue-700',
  };
};

export function PlacesCardWidget({
  places: initialPlaces,
  onViewAll,
}: PlacesCardWidgetProps) {
  const {
    data: apiPlaces,
    loading,
    error,
  } = useAsyncData(getPlaceListApi, {
    skip: Boolean(initialPlaces),
  });

  const placesList =
    initialPlaces ?? apiPlaces ?? [];

  return (
    <div className="bg-brand-light rounded-2xl p-4 md:p-5 flex flex-col gap-4 border-none max-w-2xl w-full">
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
              {placesList.length > 0
                ? `${placesList.length} recommended locations nearby`
                : 'Recommended locations nearby'}
            </p>
          </div>
        </div>

        <span className="px-3 py-1 bg-emerald-100/70 text-emerald-700 text-xxs font-bold rounded-full">
          Featured
        </span>
      </div>

      {loading && (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />

          <p className="text-xs text-slate-400 font-medium">
            Loading list of locations...
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-xs text-center font-medium my-1">
          {error}
        </div>
      )}

      {!loading && !error && placesList.length === 0 && (
        <div className="p-6 text-center text-xs text-slate-400 font-medium">
          No location has been chosen yet.
        </div>
      )}

      {!loading && !error && placesList.length > 0 && (
        <div className="space-y-3">
          {placesList.map((place) => {
            const badge = getCategoryBadge(place.category);
            const CategoryIcon = badge.icon;

            const imageSrc =
              place.imageUrl ?? DEFAULT_IMAGE;

            const addressText =
              place.location ?? 'N/A';

            return (
              <div
                key={place.id}
                className="bg-white rounded-xl p-3 border border-slate-200/60 flex items-center gap-3.5 hover:border-slate-300 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={imageSrc}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-2xs font-bold px-2 py-0.5 rounded-full ${badge.color}`}
                    >
                      <CategoryIcon className="w-3 h-3" />
                      {badge.label}
                    </span>

                    {place.rating !== undefined && (
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />

                        <span className="text-xs font-bold text-slate-800">
                          {place.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  <h5 className="font-bold text-xs md:text-sm text-slate-900 truncate">
                    {place.name}
                  </h5>

                  <p className="text-xs text-slate-500 truncate flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />

                    <span>{addressText}</span>
                  </p>
                </div>
              </div>
            );
          })}
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
          See All Recommended Locations
        </Button>
      </div>
    </div>
  );
}
