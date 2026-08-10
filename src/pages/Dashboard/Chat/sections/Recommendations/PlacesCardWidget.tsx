import MapPinIcon from '@/components/common/Icons/MapPinIcon';
import StarIcon from '@/components/common/Icons/StarIcon';
import UtensilsIcon from '@/components/common/Icons/UtensilsIcon';
import CameraIcon from '@/components/common/Icons/CameraIcon';
import ShoppingBagIcon from '@/components/common/Icons/ShoppingBagIcon';
import CompassIcon from '@/components/common/Icons/CompassIcon';
import HotelIcon from '@/components/common/Icons/HotelIcon';
import { Button } from '@/components/Button';
import { getPlaces } from '@/services/travelService';
import type {
  PlaceData,
  PlacesCardWidgetProps,
} from '@/types/travel';
import { useAsyncData } from '@/hooks/useAsyncData';
import { Icon } from '@/components/common/Icons/Icon';

export type { PlaceData };

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

const getCategoryBadge = (category?: string) => {
  const cat = category?.toLowerCase() ?? '';

  if (cat.includes('food') || cat.includes('cuisine')) {
    return {
      label: 'Cuisine',
      icon: UtensilsIcon,
      color: 'bg-amber-100/70 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300',
    };
  }

  if (cat.includes('sight') || cat.includes('cam')) {
    return {
      label: 'Sightseeing',
      icon: CameraIcon,
      color: 'bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300',
    };
  }

  if (cat.includes('shop') || cat.includes('shopping')) {
    return {
      label: 'Shopping',
      icon: ShoppingBagIcon,
      color: 'bg-purple-100/70 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300',
    };
  }

  if (
    cat.includes('hotel') ||
    cat.includes('resort') ||
    cat.includes('ryokan')
  ) {
    return {
      label: category ?? 'Stay',
      icon: HotelIcon,
      color: 'bg-indigo-100/70 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300',
    };
  }

  return {
    label: category ?? 'Entertainment',
    icon: CompassIcon,
    color: 'bg-blue-100/70 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300',
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
  } = useAsyncData(getPlaces, {
    skip: Boolean(initialPlaces),
  });

  const placesList =
    initialPlaces ?? apiPlaces ?? [];

  return (
    <div className="bg-brand-light dark:bg-slate-700/70 rounded-2xl p-4 md:p-5 flex flex-col gap-4 border border-transparent dark:border-slate-600/70 max-w-2xl w-full shadow-sm dark:shadow-black/20 transition-colors duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-600">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
            <MapPinIcon className="w-4 h-4" />
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

        <span className="px-3 py-1 bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xxs font-bold rounded-full">
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
                className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200/60 dark:border-slate-600 flex items-center gap-3.5 hover:border-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-700 transition-colors cursor-pointer"
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
                        <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />

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
                    <MapPinIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />

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
          className="w-full rounded-2xl dark:bg-slate-950 dark:hover:bg-blue-600"
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
