import type { PaletteColor } from "@/lib/watercolor/palette";
import type { watercolorShapes } from "./shapes";

export type WatercolorShapeName = keyof typeof watercolorShapes;

export interface WatercolorWash {
  color: PaletteColor;
  shape: WatercolorShapeName;
  x: string;
  y: string;
  size: number;
  opacity: number;
  blur: number;
  rotation?: number;
}

export interface WatercolorScene {
  name: string;
  background: PaletteColor;
  washes: WatercolorWash[];
}
