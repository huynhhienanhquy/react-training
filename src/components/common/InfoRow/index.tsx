interface InfoRowProps {
  label: string;
  value: string;
  className?: string;
}

export const InfoRow = ({ label, value, className = '' }: InfoRowProps) => {
  return (
    <div className={`flex justify-between text-xs text-slate-500 md:text-sm lg:text-base ${className}`}>
      <span>{label}</span>
      <span className="font-semibold text-brand-dark">{value}</span>
    </div>
  );
};
