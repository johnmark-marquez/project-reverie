import type { PaletteColor } from "@/lib/watercolor/palette";
import type { LightingPreset, TexturePreset } from "@/lib/watercolor/themes";
import type { watercolorShapes } from "./shapes";

export type WatercolorShapeName = keyof typeof watercolorShapes;

export type Anchor =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type PigmentTone = "dark" | "medium" | "light";

export interface WashComposition {
  anchor: Anchor;
  offset: { x: number; y: number };
  rotation?: number;
  scale?: number;
  depth?: number;
}

export interface PigmentLayer {
  tone: PigmentTone;
  opacity: number;
  scale?: number;
}

export interface WatercolorWash {
  color: PaletteColor;
  shape: WatercolorShapeName;
  size: number;
  blur: number;
  composition: WashComposition;
  /** Base opacity when pigment layers are auto-generated */
  opacity?: number;
  /** Custom pigment stack — dark → medium → light */
  pigment?: PigmentLayer[];
}

export interface WatercolorScene {
  id: string;
  background: PaletteColor;
  washes: WatercolorWash[];
  texture?: TexturePreset;
  lighting?: LightingPreset;
  motion?: boolean;
}

export type { TexturePreset, LightingPreset };
