import {
  getWatercolorFilterUrl,
  WATERCOLOR_WASH_FILTER_ID,
} from "./filters";

export function WatercolorFilter() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        <filter
          id={WATERCOLOR_WASH_FILTER_ID}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.055"
            numOctaves="4"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="32"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feTurbulence
            type="turbulence"
            baseFrequency="0.12"
            numOctaves="2"
            seed="11"
            result="edgeNoise"
          />
          <feDisplacementMap
            in="displaced"
            in2="edgeNoise"
            scale="6"
            xChannelSelector="G"
            yChannelSelector="B"
            result="roughened"
          />
          <feGaussianBlur in="roughened" stdDeviation="1.5" result="softened" />
          <feColorMatrix
            in="softened"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.92 0"
          />
        </filter>
      </defs>
    </svg>
  );
}

export { getWatercolorFilterUrl };
