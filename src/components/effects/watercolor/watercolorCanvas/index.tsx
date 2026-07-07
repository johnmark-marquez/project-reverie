"use client";

import { useRenderQuality } from "@/hooks/useRenderQuality";
import type { RenderQuality } from "@/hooks/useRenderQuality";
import { HighQualityCanvas } from "./highQuality";
import { LowQualityCanvas } from "./lowQuality";
import { MediumQualityCanvas } from "./mediumQuality";
import type { WatercolorCanvasProps } from "./types";

export type { WatercolorCanvasProps };

export function WatercolorCanvas({
  quality: qualityOverride,
  scene,
  washVerticalCenter,
  ...props
}: WatercolorCanvasProps) {
  const detectedQuality = useRenderQuality();
  const quality: RenderQuality = qualityOverride ?? detectedQuality;

  switch (quality) {
    case "high":
      return (
        <HighQualityCanvas
          scene={scene}
          washVerticalCenter={washVerticalCenter}
          {...props}
        />
      );
    case "medium":
      return (
        <MediumQualityCanvas
          scene={scene}
          washVerticalCenter={washVerticalCenter}
          {...props}
        />
      );
    case "low":
      return (
        <LowQualityCanvas
          scene={scene}
          washVerticalCenter={washVerticalCenter}
          {...props}
        />
      );
  }
}
