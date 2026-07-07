import type { WatercolorScene } from "./types";

export const heroScene: WatercolorScene = {
  id: "hero",
  background: "ivory",
  texture: "cotton",
  lighting: "morning",
  motion: true,
  washes: [
    {
      shape: "bloom",
      color: "coral",
      size: 480,
      blur: 38,
      opacity: 0.32,
      composition: {
        anchor: "top-left",
        offset: { x: 8, y: 12 },
        rotation: -22,
        depth: 0,
      },
    },
    {
      shape: "ribbon",
      color: "rose",
      size: 520,
      blur: 42,
      opacity: 0.28,
      composition: {
        anchor: "top-left",
        offset: { x: 22, y: 28 },
        rotation: -12,
        depth: 1,
      },
    },
    {
      shape: "petal",
      color: "peach",
      size: 440,
      blur: 36,
      opacity: 0.27,
      composition: {
        anchor: "top-left",
        offset: { x: 38, y: 18 },
        rotation: 8,
        depth: 2,
      },
    },
    {
      shape: "wash",
      color: "buttercream",
      size: 500,
      blur: 40,
      opacity: 0.25,
      composition: {
        anchor: "top-left",
        offset: { x: 52, y: 35 },
        rotation: -5,
        depth: 0,
      },
    },
    {
      shape: "cloud",
      color: "mint",
      size: 460,
      blur: 38,
      opacity: 0.27,
      composition: {
        anchor: "top-left",
        offset: { x: 65, y: 22 },
        rotation: 15,
        depth: 1,
      },
    },
    {
      shape: "splash",
      color: "sage",
      size: 420,
      blur: 44,
      opacity: 0.24,
      composition: {
        anchor: "top-left",
        offset: { x: 78, y: 38 },
        rotation: -8,
        depth: 0,
      },
    },
    {
      shape: "bloom",
      color: "sky",
      size: 400,
      blur: 36,
      opacity: 0.28,
      composition: {
        anchor: "top-left",
        offset: { x: 88, y: 18 },
        rotation: 20,
        depth: 2,
      },
    },
    {
      shape: "ribbon",
      color: "mist",
      size: 480,
      blur: 46,
      opacity: 0.22,
      composition: {
        anchor: "top-left",
        offset: { x: 18, y: 72 },
        rotation: 10,
        depth: 1,
      },
    },
    {
      shape: "wash",
      color: "periwinkle",
      size: 520,
      blur: 48,
      opacity: 0.2,
      composition: {
        anchor: "top-left",
        offset: { x: 42, y: 78 },
        rotation: -15,
        depth: 0,
      },
    },
    {
      shape: "petal",
      color: "lavender",
      size: 450,
      blur: 42,
      opacity: 0.23,
      composition: {
        anchor: "top-left",
        offset: { x: 68, y: 70 },
        rotation: 6,
        depth: 2,
      },
    },
    {
      shape: "cloud",
      color: "lilac",
      size: 430,
      blur: 45,
      opacity: 0.21,
      composition: {
        anchor: "top-left",
        offset: { x: 85, y: 82 },
        rotation: -18,
        depth: 1,
      },
    },
  ],
};

/** Light washes — story sections */
export const storyScene: WatercolorScene = {
  id: "story",
  background: "ivory",
  texture: "cotton",
  lighting: "afternoon",
  motion: false,
  washes: [
    {
      shape: "wash",
      color: "peach",
      size: 380,
      blur: 45,
      opacity: 0.14,
      composition: {
        anchor: "top-left",
        offset: { x: 10, y: 30 },
        rotation: -10,
        depth: 0,
      },
    },
    {
      shape: "cloud",
      color: "mint",
      size: 360,
      blur: 48,
      opacity: 0.13,
      composition: {
        anchor: "top-left",
        offset: { x: 85, y: 25 },
        rotation: 12,
        depth: 1,
      },
    },
    {
      shape: "splash",
      color: "periwinkle",
      size: 400,
      blur: 50,
      opacity: 0.12,
      composition: {
        anchor: "top-left",
        offset: { x: 50, y: 80 },
        rotation: -5,
        depth: 0,
      },
    },
  ],
};

/** Whisper washes — timeline & venues */
export const detailsScene: WatercolorScene = {
  id: "details",
  background: "ivory",
  texture: "cotton",
  lighting: "afternoon",
  motion: false,
  washes: [
    {
      shape: "cloud",
      color: "sage",
      size: 340,
      blur: 52,
      opacity: 0.07,
      composition: {
        anchor: "top-left",
        offset: { x: 5, y: 20 },
        rotation: -8,
        depth: 0,
      },
    },
    {
      shape: "wash",
      color: "lavender",
      size: 360,
      blur: 55,
      opacity: 0.06,
      composition: {
        anchor: "top-left",
        offset: { x: 75, y: 60 },
        rotation: 12,
        depth: 1,
      },
    },
  ],
};

export const scenePresets = {
  hero: heroScene,
  story: storyScene,
  details: detailsScene,
} as const;

export type ScenePresetId = keyof typeof scenePresets;
