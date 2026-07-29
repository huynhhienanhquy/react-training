import React from 'react';
import iconHeart from '../../../assets/icons/heart-blue.png';

// Props definition for the reusable favorite/bookmark toggle button
interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
  className = '',
}) => {
  return (
    /* Reusable favorite button with active scaling feedback */
    <button
      type="button"
      onClick={onToggle}
      className={`w-10 h-10 md:w-9 md:h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 ${
        isFavorite
          ? 'bg-blue-600 text-white shadow-md shadow-blue-200' // Highlighted background style when favorited
          : 'bg-[#EEF2FF] hover:bg-blue-100' // Default subtle background style
      } ${className}`}
    >
      {/* Heart icon with brightness filter to invert PNG color when active */}
      <img
        src={iconHeart}
        alt="Favorite"
        className={`w-4 h-4 transition-all duration-200 object-contain ${
          isFavorite ? 'brightness-0 invert scale-110' : 'opacity-70 hover:opacity-100'
        }`}
      />
    </button>
  );
};
