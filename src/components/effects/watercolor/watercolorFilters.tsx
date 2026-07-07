const FILTER_ID = "watercolor-wash";

export function WatercolorFilters() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        <filter id={FILTER_ID} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="2" result="blurred" />
          <feColorMatrix
            in="blurred"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.95 0"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function getWatercolorFilterUrl() {
  return `url(#${FILTER_ID})`;
}
