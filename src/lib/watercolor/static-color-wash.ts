import { palette } from "@/lib/watercolor/palette";
import { sceneForRenderQuality } from "@/lib/watercolor/render-quality";
import type { RenderQuality } from "@/hooks/useRenderQuality";
import type { WatercolorScene } from "@/components/effects/watercolor/types";

function colorMix(hex: string, opacity: number) {
  return `color-mix(in srgb, ${hex} ${Math.round(opacity * 100)}%, transparent)`;
}

/** CSS-only rainbow wash — no SVG filters or displacement. */
export function staticColorWash(
  scene: WatercolorScene,
  quality: RenderQuality = "low",
) {
  const adapted = sceneForRenderQuality(scene, quality);
  const whisper = scene.washes.every((wash) => (wash.opacity ?? 0.24) < 0.15);

  const layers = adapted.washes.map((wash) => {
    const x = wash.composition.offset.x;
    const y = wash.composition.offset.y;
    const baseOpacity = wash.opacity ?? 0.22;
    const strength = Math.min(
      whisper ? 0.38 : 0.48,
      baseOpacity * (quality === "low" ? 2.8 : 2.2),
    );

    return `radial-gradient(ellipse 78% 68% at ${x}% ${y}%, ${colorMix(palette[wash.color], strength)} 0%, transparent 64%)`;
  });

  return layers.join(", ");
}
