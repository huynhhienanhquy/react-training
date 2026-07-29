import React from 'react';

interface InfoRowProps {
  label: string;
  value: string;
  className?: string;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, className = '' }) => {
  return (
    <div className={`flex justify-between text-slate-500 text-xs md:text-sm ${className}`}>
      <span>{label}</span>
      <span className="font-semibold text-brand-dark">{value}</span>
    </div>
  );
};
