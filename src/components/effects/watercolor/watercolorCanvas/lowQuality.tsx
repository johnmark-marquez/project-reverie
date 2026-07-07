"use client";

import { palette } from "@/lib/watercolor/palette";
import { staticColorWash } from "@/lib/watercolor/static-color-wash";
import { PaperTexture } from "../paperTexture";
import type { WatercolorCanvasProps } from "./types";

/** Mobile — soft CSS gradient blobs, static paper, gentle opacity fade. */
export function LowQualityCanvas({
  scene,
  children,
  className = "",
  texture,
  animated,
}: WatercolorCanvasProps) {
  const texturePreset = texture ?? scene.texture ?? "cotton";
  const motionEnabled = animated ?? scene.motion ?? false;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: palette[scene.background] }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-[1] ${motionEnabled ? "watercolor-opacity-motion" : ""}`}
        style={{ background: staticColorWash(scene, "low") }}
      />

      <PaperTexture preset={texturePreset} lite />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
