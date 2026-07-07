"use client";

import { palette } from "@/lib/watercolor/palette";
import { OrganicWash } from "../organicWash";
import { PaperTexture } from "../paperTexture";
import { WashEdgeMask } from "../section-wash-fade";
import type { WatercolorCanvasProps } from "./types";

/** Mobile — procedural organic wash, static paper, gentle opacity fade. */
export function LowQualityCanvas({
  scene,
  children,
  className = "",
  texture,
  animated,
  washVerticalCenter,
}: WatercolorCanvasProps) {
  const texturePreset = texture ?? scene.texture ?? "cotton";
  const motionEnabled = animated ?? scene.motion ?? false;

  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      style={{ backgroundColor: palette[scene.background] }}
    >
      <PaperTexture preset={texturePreset} lite className="z-0" />
      <WashEdgeMask edge="bottom">
        <OrganicWash
          scene={scene}
          animated={motionEnabled}
          priority="high"
          verticalCenter={washVerticalCenter}
          className="h-full w-full"
        />
      </WashEdgeMask>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
