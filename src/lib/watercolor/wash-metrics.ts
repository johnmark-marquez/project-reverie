import type { WashComposition } from "@/components/effects/watercolor/types";
import type { WatercolorQuality } from "@/hooks/use-watercolor-quality";

export function adaptCompositionForQuality(
  composition: WashComposition,
  quality: WatercolorQuality,
): WashComposition {
  if (quality === "full") {
    return composition;
  }

  const { offset } = composition;

  return {
    ...composition,
    offset: {
      x: offset.x < 50 ? offset.x * 0.55 : 50 + (offset.x - 50) * 1.2,
      y: offset.y < 50 ? offset.y * 0.55 : 50 + (offset.y - 50) * 1.15,
    },
    scale: (composition.scale ?? 1) * (quality === "reduced" ? 0.92 : 0.85),
  };
}

export function adaptWashMetrics(
  size: number,
  blur: number,
  quality: WatercolorQuality,
) {
  if (quality === "full") {
    return { size, blur };
  }

  if (quality === "reduced") {
    return {
      size: Math.round(size * 0.62),
      blur: Math.round(blur * 2.4),
    };
  }

  return {
    size: Math.round(size * 0.5),
    blur: Math.round(blur * 2.8),
  };
}
