"use client";

import { palette } from "@/lib/watercolor/palette";
import type { WatercolorScene } from "../types";
import { OrganicWash } from "../organicWash";
import { PaperTexture } from "../paperTexture";
import { WashEdgeMask } from "../section-wash-fade";

interface StaticBackdropProps {
  scene: WatercolorScene;
  className?: string;
  /** Fade wash in from the top — for sections that follow the hero. */
  fadeTop?: boolean;
}

/** Static organic watercolor for section backgrounds. */
export function StaticBackdrop({
  scene,
  className = "",
  fadeTop = false,
}: StaticBackdropProps) {
  const wash = (
    <OrganicWash scene={scene} priority="low" className="h-full w-full" />
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 isolate ${className}`}
      style={{ backgroundColor: palette[scene.background] }}
    >
      <PaperTexture preset={scene.texture ?? "cotton"} lite className="z-0" />
      {fadeTop ? (
        <WashEdgeMask edge="top" className="z-[1]">
          {wash}
        </WashEdgeMask>
      ) : (
        <div className="absolute inset-0 z-[1]">{wash}</div>
      )}
    </div>
  );
}
