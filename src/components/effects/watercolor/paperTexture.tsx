interface Props {
  intensity?: number;
}

export function PaperTexture({ intensity = 0.04 }: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ opacity: intensity }}
    >
      <svg className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="4"
              seed="3"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.45  0 0 0 0 0.42  0 0 0 0 0.38  0 0 0 0.35 0"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#paper-grain)" />
      </svg>
    </div>
  );
}
