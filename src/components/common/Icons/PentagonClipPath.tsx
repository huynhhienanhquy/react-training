// components/ClipPath/PentagonClipPath.tsx
export const PentagonClipPath = () => {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <clipPath
          id="pentagon-clip"
          clipPathUnits="objectBoundingBox"
        >
          <polygon
            points="
              0.5,0.05
              0.95,0.35
              0.85,0.92
              0.15,0.92
              0.05,0.35
            "
          />
        </clipPath>
      </defs>
    </svg>
  );
};
