// Props interface for the reusable container Card component
export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'surface'; // Predefined style variants for card background
  className?: string;
}

export interface SectionHeaderProps {
  title: string;
  className?: string;
}

export interface RecommendationWrapperProps {
  title: string;
  children: React.ReactNode;
  onSeeAll?: () => void;
  seeAllText?: string;
}
