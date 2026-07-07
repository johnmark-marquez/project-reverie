import type { WatercolorScene } from "@/components/effects/watercolor/types";
import type { RenderQuality } from "@/hooks/useRenderQuality";

export type { RenderQuality };

export const WASH_LIMITS: Record<RenderQuality, number | null> = {
  high: null,
  medium: 7,
  low: 3,
};

function pickSpreadWashes<T>(items: T[], limit: number): T[] {
  if (items.length <= limit) {
    return items;
  }

  if (limit <= 1) {
    return [items[0]!];
  }

  return Array.from({ length: limit }, (_, index) => {
    const sourceIndex = Math.round((index / (limit - 1)) * (items.length - 1));
    return items[sourceIndex]!;
  });
}

export function sceneForRenderQuality(
  scene: WatercolorScene,
  quality: RenderQuality,
): WatercolorScene {
  const limit = WASH_LIMITS[quality];

  if (limit === null) {
    return scene;
  }

  return {
    ...scene,
    motion: quality === "high" && scene.motion,
    washes: pickSpreadWashes(scene.washes, limit),
  };
}

export function usesSvgFilters(quality: RenderQuality) {
  return quality === "high";
}

export function usesPigmentLayers(quality: RenderQuality) {
  return quality === "high" ? 3 : quality === "medium" ? 1 : 0;
}

export function washBlurCss(blur: number, quality: RenderQuality) {
  if (quality === "medium") {
    return Math.min(16, Math.round(blur * 0.32));
  }

  return Math.max(10, Math.round(blur * 0.4));
}

export function opacityBoostForScene(
  scene: WatercolorScene,
  quality: RenderQuality,
) {
  const isWhisperScene = scene.washes.every(
    (wash) => (wash.opacity ?? 0.24) < 0.15,
  );

  if (quality === "high") {
    return 1;
  }

  return isWhisperScene ? 2.4 : 1.25;
}
