import React, { useState, useEffect } from 'react';
import { MapPin, Star, Utensils, Camera, ShoppingBag, Compass, Hotel } from 'lucide-react';
import { AxiosError } from 'axios';
import { Button } from '../ui/Button';
import { getPlaceListApi, type PlaceData } from '../../services/travelService';

interface PlacesCardWidgetProps {
  places?: PlaceData[];
  onViewAll?: () => void;
}

export const PlacesCardWidget: React.FC<PlacesCardWidgetProps> = ({
  places: initialPlaces,
  onViewAll,
}) => {
  const [placesList, setPlacesList] = useState<PlaceData[]>(initialPlaces || []);
  const [loading, setLoading] = useState<boolean>(!initialPlaces);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Nếu có truyền places trực tiếp qua props thì không cần gọi API
    if (initialPlaces) return;

    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getPlaceListApi();
        setPlacesList(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || err.message || 'Lỗi kết nối máy chủ');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Không thể tải danh sách địa điểm');
        }
        setPlacesList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [initialPlaces]);

  // Helper to map category to icon & badge styling
  const getCategoryBadge = (category?: string) => {
    const cat = category?.toLowerCase() || '';

    if (cat.includes('food') || cat.includes('cuisine') || cat.includes('ẩm thực')) {
      return { label: 'Cuisine', icon: Utensils, color: 'bg-amber-100/70 text-amber-700' };
    }
    if (cat.includes('sight') || cat.includes('cam') || cat.includes('tham quan')) {
      return { label: 'Sightseeing', icon: Camera, color: 'bg-emerald-100/70 text-emerald-700' };
    }
    if (cat.includes('shop') || cat.includes('mua sắm')) {
      return { label: 'Shopping', icon: ShoppingBag, color: 'bg-purple-100/70 text-purple-700' };
    }
    if (cat.includes('hotel') || cat.includes('resort') || cat.includes('ryokan')) {
      return { label: category || 'Stay', icon: Hotel, color: 'bg-indigo-100/70 text-indigo-700' };
    }

    return { label: category || 'Entertainment', icon: Compass, color: 'bg-blue-100/70 text-blue-700' };
  };

  return (
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
              {placesList.length > 0
                ? `${placesList.length} recommended locations nearby`
                : 'Recommended locations nearby'}
            </p>
          </div>
        </div>

        <span className="px-3 py-1 bg-emerald-100/70 text-emerald-700 text-[11px] font-bold rounded-full">
          Featured
        </span>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Đang tải danh sách địa điểm...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {error && !loading && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-xs text-center font-medium my-1">
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && placesList.length === 0 && (
        <div className="p-6 text-center text-xs text-slate-400 font-medium">
          Chưa có địa điểm nào.
        </div>
      )}

      {/* PLACES LIST */}
      {!loading && !error && placesList.length > 0 && (
        <div className="space-y-3">
          {placesList.map((place) => {
            const badge = getCategoryBadge(place.category);
            const CategoryIcon = badge.icon;
            // Map linh hoạt giữa imageUrl hoặc image, location hoặc address
            const imageSrc = place.imageUrl || (place as unknown as { image?: string }).image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
            const addressText = place.location || (place as unknown as { address?: string }).address || 'N/A';

            return (
              <div
                key={place.id}
                className="bg-white rounded-xl p-3 border border-slate-200/60 flex items-center gap-3.5 hover:border-slate-300 transition-colors cursor-pointer"
              >
                {/* Place Image Thumbnail */}
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={imageSrc}
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

      {/* Action Button */}
      <div className="pt-1">
        <Button
          variant="dark"
          size="md"
          className="w-full rounded-2xl"
          rightIcon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          }
          onClick={onViewAll}
        >
          See All Recommended Locations
        </Button>
      </div>
    </div>
  );
};
