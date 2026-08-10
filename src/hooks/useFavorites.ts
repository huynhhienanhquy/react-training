import { useCallback, useState } from 'react';

export const useFavorites = (initialMap?: Record<string, boolean>) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(initialMap ?? {});

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => !!favorites[id], [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};
