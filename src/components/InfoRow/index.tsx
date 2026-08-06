interface InfoRowProps {
  label: string;
  value: string;
  className?: string;
}

export const InfoRow = ({ label, value, className = '' }: InfoRowProps) => {
  return (
    <div className={`flex justify-between text-slate-500 text-xs md:text-sm ${className}`}>
      <span>{label}</span>
      <span className="font-semibold text-brand-dark">{value}</span>
    </div>
  );
};
