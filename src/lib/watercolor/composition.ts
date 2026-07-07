import type { Anchor, WashComposition } from "@/components/effects/watercolor/types";

const anchorOrigins: Record<Anchor, { x: number; y: number }> = {
  "top-left": { x: 0, y: 0 },
  "top-center": { x: 50, y: 0 },
  "top-right": { x: 100, y: 0 },
  "center-left": { x: 0, y: 50 },
  center: { x: 50, y: 50 },
  "center-right": { x: 100, y: 50 },
  "bottom-left": { x: 0, y: 100 },
  "bottom-center": { x: 50, y: 100 },
  "bottom-right": { x: 100, y: 100 },
};

export function resolveComposition(composition: WashComposition) {
  const origin = anchorOrigins[composition.anchor];

  return {
    left: `${origin.x + composition.offset.x}%`,
    top: `${origin.y + composition.offset.y}%`,
    rotation: composition.rotation ?? 0,
    scale: composition.scale ?? 1,
    depth: composition.depth ?? 0,
  };
}
