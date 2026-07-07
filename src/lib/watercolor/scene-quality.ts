import type { WatercolorScene } from "@/components/effects/watercolor/types";
import type { WatercolorQuality } from "@/hooks/use-watercolor-quality";

const WASH_LIMITS: Record<WatercolorQuality, number | null> = {
  full: null,
  reduced: 8,
  minimal: 4,
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

export function sceneForQuality(
  scene: WatercolorScene,
  quality: WatercolorQuality,
): WatercolorScene {
  const limit = WASH_LIMITS[quality];

  if (limit === null) {
    return scene;
  }

  return {
    ...scene,
    motion: quality !== "minimal" && scene.motion,
    washes: pickSpreadWashes(scene.washes, limit),
  };
}
