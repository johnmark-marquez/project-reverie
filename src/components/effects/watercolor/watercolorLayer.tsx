import { palette } from "@/lib/watercolor/palette";
import type { WatercolorWash } from "./types";
import { getWatercolorFilterUrl } from "./watercolorFilters";
import { WatercolorShape } from "./waterColorShape";

interface Props {
  wash: WatercolorWash;
  useFilter?: boolean;
}

export function WatercolorLayer({ wash, useFilter = true }: Props) {
  return (
    <div
      className="absolute watercolor-wash"
      style={{
        left: wash.x,
        top: wash.y,
        width: wash.size,
        height: wash.size,
        opacity: wash.opacity,
        filter: `blur(${wash.blur}px)`,
        transform: `
          translate(-50%, -50%)
          rotate(${wash.rotation ?? 0}deg)
        `,
      }}
    >
      <WatercolorShape
        path={wash.shape}
        color={palette[wash.color]}
        filterUrl={useFilter ? getWatercolorFilterUrl() : undefined}
      />
    </div>
  );
}
