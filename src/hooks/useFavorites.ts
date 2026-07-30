import { useState } from 'react';

export const useFavorites = (initialMap?: Record<string, boolean>) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(initialMap ?? {});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
  };

  const isFavorite = (id: string) => !!favorites[id];

  return { favorites, toggleFavorite, isFavorite };
};
