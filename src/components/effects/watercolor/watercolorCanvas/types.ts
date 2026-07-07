import type { LightingPreset, TexturePreset } from "@/lib/watercolor/themes";
import type { RenderQuality } from "@/hooks/useRenderQuality";
import type { WatercolorScene } from "../types";

export interface WatercolorCanvasProps {
  scene: WatercolorScene;
  children?: React.ReactNode;
  className?: string;
  texture?: TexturePreset;
  lighting?: LightingPreset;
  animated?: boolean;
  quality?: RenderQuality;
  washVerticalCenter?: number;
}
