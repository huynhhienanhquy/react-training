
import {type SectionHeaderProps } from "@/types/card";


export const SectionHeader = ({ title, className = '' }: SectionHeaderProps) => {
  return (
    <h3 className={`text-xs font-bold text-slate-500 uppercase tracking-wider ${className}`}>
      {title}
    </h3>
  );
};
