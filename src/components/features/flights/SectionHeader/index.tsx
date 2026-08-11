
interface SectionHeaderProps {
   title: string;
   className?: string;
 }

export const SectionHeader = ({ title, className = '' }: SectionHeaderProps) => {
  return (
    <h3 className={`text-sm font-bold text-brand-dark md:text-base ${className}`}>
      {title}
    </h3>
  );
};
