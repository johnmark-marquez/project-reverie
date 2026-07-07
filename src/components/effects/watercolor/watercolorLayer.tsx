import type { RenderedWash } from "@/lib/watercolor/renderer";
import { WatercolorShape } from "./watercolorShape";

interface Props {
  wash: RenderedWash;
  useFilter?: boolean;
}

export function WatercolorLayer({ wash, useFilter = false }: Props) {
  return (
    <div
      className="absolute watercolor-wash"
      style={{
        left: wash.left,
        top: wash.top,
        width: wash.size,
        height: wash.size,
        opacity: wash.opacity,
        zIndex: Math.round(wash.depth * 10) + 1,
        filter: `blur(${wash.blur}px)`,
        mixBlendMode: "multiply",
        transform: `
          translate(-50%, -50%)
          rotate(${wash.rotation}deg)
          scale(${wash.scale})
        `,
      }}
    >
      <WatercolorShape
        shape={wash.shape}
        color={wash.color}
        filterUrl={useFilter ? "url(#watercolor-wash)" : undefined}
      />
    </div>
  );
}
