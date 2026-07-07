import { resolveComposition } from "./composition";
import { lightingOpacity, pigmentTone } from "./utils";
import type {
  LightingPreset,
  PigmentTone,
  WatercolorScene,
  WatercolorShapeName,
  WatercolorWash,
} from "@/components/effects/watercolor/types";
import { lightingPresets } from "./themes";

export interface RenderedWash {
  key: string;
  shape: WatercolorShapeName;
  color: string;
  left: string;
  top: string;
  size: number;
  blur: number;
  opacity: number;
  rotation: number;
  scale: number;
  depth: number;
}

interface RenderOptions {
  lighting?: LightingPreset;
}

function expandPigment(
  wash: WatercolorWash,
  washIndex: number,
): Array<{
  tone: PigmentTone;
  opacity: number;
  scale: number;
}> {
  if (wash.pigment?.length) {
    return wash.pigment.map((layer) => ({
      tone: layer.tone,
      opacity: layer.opacity,
      scale: layer.scale ?? 1,
    }));
  }

  const base = wash.opacity ?? 0.24;

  return [
    { tone: "dark", opacity: base * 0.55, scale: 0.94 },
    { tone: "medium", opacity: base, scale: 1 },
    { tone: "light", opacity: base * 0.38, scale: 1.06 },
  ];
}

export function renderScene(
  scene: WatercolorScene,
  options: RenderOptions = {},
): RenderedWash[] {
  const lighting = options.lighting ?? scene.lighting ?? "morning";
  const preset = lightingPresets[lighting];
  const rendered: RenderedWash[] = [];

  scene.washes.forEach((wash, washIndex) => {
    const position = resolveComposition(wash.composition);
    const yPercent = parseFloat(position.top);
    const lightMod = lightingOpacity(yPercent, preset.direction);

    expandPigment(wash, washIndex).forEach((layer, layerIndex) => {
      rendered.push({
        key: `${scene.id}-${washIndex}-${layerIndex}`,
        shape: wash.shape,
        color: pigmentTone(wash.color, layer.tone),
        left: position.left,
        top: position.top,
        size: wash.size,
        blur: wash.blur,
        opacity: layer.opacity * lightMod,
        rotation: position.rotation,
        scale: position.scale * layer.scale,
        depth: position.depth + layerIndex * 0.1,
      });
    });
  });

  return rendered;
}
