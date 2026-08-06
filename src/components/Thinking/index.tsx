import {type ThinkingLoaderProps}  from '@/types/loading'

export const ThinkingLoader = ({
  text = "Travelpal is thinking..."
}: ThinkingLoaderProps) => {
  return (
    <div
      className="flex items-center gap-2.5 py-2 px-1 text-slate-400 select-none"
      role="status"
      aria-live="polite"
    >
      {/* 🔹 iOS Style Spinner  */}
      <svg
        className="animate-spin w-4 h-4 text-slate-400 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="6" opacity="1" />
          <line x1="17" y1="3.34" x2="15" y2="6.8" opacity="0.9" />
          <line x1="20.66" y1="7" x2="17.2" y2="9" opacity="0.8" />
          <line x1="22" y1="12" x2="18" y2="12" opacity="0.7" />
          <line x1="20.66" y1="17" x2="17.2" y2="15" opacity="0.6" />
          <line x1="17" y1="20.66" x2="15" y2="17.2" opacity="0.5" />
          <line x1="12" y1="22" x2="12" y2="18" opacity="0.4" />
          <line x1="7" y1="20.66" x2="9" y2="17.2" opacity="0.3" />
          <line x1="3.34" y1="17" x2="6.8" y2="15" opacity="0.25" />
          <line x1="2" y1="12" x2="6" y2="12" opacity="0.2" />
          <line x1="3.34" y1="7" x2="6.8" y2="9" opacity="0.15" />
          <line x1="7" y1="3.34" x2="9" y2="6.8" opacity="0.1" />
        </g>
      </svg>

      {/* 🔹 Text "Travelpal is thinking..." */}
      <span className="text-sm font-normal text-slate-400/90 tracking-wide">
        {text}
      </span>
    </div>
  );
};
