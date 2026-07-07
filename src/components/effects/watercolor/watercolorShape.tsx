import { watercolorShapes } from "./shapes";
import type { WatercolorShapeName } from "./types";

interface Props {
  shape: WatercolorShapeName;
  color: string;
  filterUrl?: string;
}

export function WatercolorShape({ shape, color, filterUrl }: Props) {
  return (
    <svg
      viewBox="0 0 400 350"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={watercolorShapes[shape]}
        fill={color}
        filter={filterUrl}
      />
    </svg>
  );
}
