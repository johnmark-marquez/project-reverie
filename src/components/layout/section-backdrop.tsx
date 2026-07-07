import {
  detailsScene,
  storyScene,
  type ScenePresetId,
} from "@/components/effects/watercolor/scenes";
import { PaperTexture } from "@/components/effects/watercolor/paperTexture";
import { WatercolorCanvas } from "@/components/effects/watercolor/watercolorCanvas";

export type BackdropTier = ScenePresetId | "minimal";

const presetScenes = {
  story: storyScene,
  details: detailsScene,
} as const;

interface SectionBackdropProps {
  tier: BackdropTier;
}

/**
 * Tiered section backgrounds:
 * - hero: full canvas (handled in Hero section directly)
 * - story: light washes
 * - details: whisper washes (timeline, venues)
 * - minimal: ivory + paper grain only (rsvp, faq)
 */
export function SectionBackdrop({ tier }: SectionBackdropProps) {
  if (tier === "minimal") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-ivory"
      >
        <PaperTexture preset="cotton" />
      </div>
    );
  }

  if (tier === "hero") {
    return null;
  }

  const scene = presetScenes[tier];

  return (
    <WatercolorCanvas
      scene={scene}
      className="pointer-events-none absolute inset-0 -z-10 h-full"
    />
  );
}
