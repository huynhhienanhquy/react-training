// components/ClipPath/PentagonClipPath.tsx
export const PentagonClipPath = () => {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <clipPath
          id="pentagon-clip"
          clipPathUnits="objectBoundingBox"
        >
          <path d="M 0.5 0.05 C 0.52 0.05, 0.93 0.32, 0.95 0.35 C 0.97 0.38, 0.88 0.88, 0.85 0.92 C 0.82 0.96, 0.18 0.96, 0.15 0.92 C 0.12 0.88, 0.03 0.38, 0.05 0.35 C 0.07 0.32, 0.48 0.05, 0.5 0.05 Z" />
        </clipPath>
      </defs>
    </svg>
  );
};
