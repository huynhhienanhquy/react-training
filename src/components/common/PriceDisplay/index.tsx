interface PriceDisplayProps {
  amount: string;
  period?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'text-xl md:text-2xl font-black',
  md: 'text-2xl md:text-3xl font-bold',
  lg: 'text-2xl md:text-3xl font-black',
};

export const PriceDisplay = ({ amount, period, size = 'sm', className = '' }: PriceDisplayProps) => {
  return (
    <div className={`flex items-baseline gap-1 ${className}`}>
      <span className={`${sizeClasses[size]} text-slate-900 tracking-tight`}>
        {amount}
      </span>
      {period && (
        <span className="text-xs text-slate-500 font-medium">{period}</span>
      )}
    </div>
  );
};
