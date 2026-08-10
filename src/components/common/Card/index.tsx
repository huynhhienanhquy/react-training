
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'surface';
  className?: string;
}
// Predefined style maps for card variants
const variants = {
  default: 'bg-white rounded-3xl border border-slate-100 shadow-sm',
  surface: 'bg-surface rounded-3xl border border-slate-100 shadow-sm',
};

export const Card = ({
  children,
  variant = 'default',
  className = '',
}: CardProps) => {
  return (
    /* Universal content card container merging variant styles and custom layout classes */
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};
