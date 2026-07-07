"use client";

import { palette } from "@/lib/watercolor/palette";
import { renderScene } from "@/lib/watercolor/renderer";
import { Lighting } from "../lighting";
import { Motion } from "../motion";
import { PaperTexture } from "../paperTexture";
import { WatercolorFilter } from "../watercolorFilter";
import { WatercolorLayer } from "../watercolorLayer";
import type { WatercolorCanvasProps } from "./types";

/** Desktop — full SVG filters, pigment layers, paper grain, drift motion. */
export function HighQualityCanvas({
  scene,
  children,
  className = "",
  texture,
  lighting,
  animated,
}: WatercolorCanvasProps) {
  const texturePreset = texture ?? scene.texture ?? "cotton";
  const lightingPreset = lighting ?? scene.lighting ?? "morning";
  const motionEnabled = animated ?? scene.motion ?? false;
  const washes = renderScene(scene, {
    lighting: lightingPreset,
    quality: "high",
  });

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: palette[scene.background] }}
    >
      <WatercolorFilter />

      <Motion enabled={motionEnabled}>
        {washes.map((wash) => (
          <WatercolorLayer key={wash.key} wash={wash} useFilter />
        ))}
      </Motion>

      <PaperTexture preset={texturePreset} />
      <Lighting preset={lightingPreset} />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
