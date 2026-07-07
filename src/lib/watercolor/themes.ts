import type { PaletteColor } from "./palette";

export type TexturePreset = "cotton" | "linen" | "rough";
export type LightingPreset = "morning" | "afternoon" | "evening";

export const rainbow: PaletteColor[] = [
  "coral",
  "rose",
  "peach",
  "apricot",
  "buttercream",
  "sunshine",
  "mint",
  "sage",
  "sky",
  "mist",
  "periwinkle",
  "lavender",
  "lilac",
];

export const texturePresets: Record<
  TexturePreset,
  { intensity: number; grainFrequency: number; fiberOpacity: number }
> = {
  cotton: { intensity: 0.035, grainFrequency: 0.68, fiberOpacity: 0.25 },
  linen: { intensity: 0.045, grainFrequency: 0.82, fiberOpacity: 0.32 },
  rough: { intensity: 0.055, grainFrequency: 0.95, fiberOpacity: 0.4 },
};

export const lightingPresets: Record<
  LightingPreset,
  {
    warmth: number;
    highlightOpacity: number;
    shadowOpacity: number;
    direction: "top-left" | "top-right";
  }
> = {
  morning: {
    warmth: 0.55,
    highlightOpacity: 0.5,
    shadowOpacity: 0.2,
    direction: "top-left",
  },
  afternoon: {
    warmth: 0.35,
    highlightOpacity: 0.4,
    shadowOpacity: 0.15,
    direction: "top-left",
  },
  evening: {
    warmth: 0.45,
    highlightOpacity: 0.3,
    shadowOpacity: 0.28,
    direction: "top-right",
  },
};
