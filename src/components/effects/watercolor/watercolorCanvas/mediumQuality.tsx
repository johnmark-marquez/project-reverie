"use client";

import { palette } from "@/lib/watercolor/palette";
import { renderScene } from "@/lib/watercolor/renderer";
import { sceneForRenderQuality } from "@/lib/watercolor/render-quality";
import { Lighting } from "../lighting";
import { PaperTexture } from "../paperTexture";
import { WatercolorLayer } from "../watercolorLayer";
import type { WatercolorCanvasProps } from "./types";

/** Tablet — fewer layers, no SVG filters, static paper, opacity animation only. */
export function MediumQualityCanvas({
  scene,
  children,
  className = "",
  texture,
  lighting,
  animated,
}: WatercolorCanvasProps) {
  const adaptedScene = sceneForRenderQuality(scene, "medium");
  const texturePreset = texture ?? adaptedScene.texture ?? "cotton";
  const lightingPreset = lighting ?? adaptedScene.lighting ?? "morning";
  const washes = renderScene(adaptedScene, {
    lighting: lightingPreset,
    quality: "medium",
  });
  const motionEnabled = animated ?? adaptedScene.motion ?? false;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: palette[adaptedScene.background] }}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 z-[1] ${motionEnabled ? "watercolor-opacity-motion" : ""}`}
      >
        {washes.map((wash) => (
          <WatercolorLayer key={wash.key} wash={wash} />
        ))}
      </div>

      <PaperTexture preset={texturePreset} lite />
      <Lighting preset={lightingPreset} />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
