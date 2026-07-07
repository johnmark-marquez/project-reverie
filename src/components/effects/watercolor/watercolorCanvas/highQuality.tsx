"use client";

import { palette } from "@/lib/watercolor/palette";
import { Lighting } from "../lighting";
import { OrganicWash } from "../organicWash";
import { PaperTexture } from "../paperTexture";
import { WashEdgeMask } from "../section-wash-fade";
import type { WatercolorCanvasProps } from "./types";

/** Desktop — organic wash above paper grain, soft lighting. */
export function HighQualityCanvas({
  scene,
  children,
  className = "",
  texture,
  lighting,
  animated,
  washVerticalCenter,
}: WatercolorCanvasProps) {
  const texturePreset = texture ?? scene.texture ?? "cotton";
  const lightingPreset = lighting ?? scene.lighting ?? "morning";
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
      <Lighting preset={lightingPreset} className="z-[2] opacity-60" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
