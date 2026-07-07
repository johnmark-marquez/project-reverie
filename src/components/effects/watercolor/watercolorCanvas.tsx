import { palette } from "@/lib/watercolor/palette";
import { renderScene } from "@/lib/watercolor/renderer";
import type { LightingPreset, TexturePreset } from "@/lib/watercolor/themes";
import { Lighting } from "./lighting";
import { Motion } from "./motion";
import { PaperTexture } from "./paperTexture";
import type { WatercolorScene } from "./types";
import { WatercolorFilter } from "./watercolorFilter";
import { WatercolorLayer } from "./watercolorLayer";

interface Props {
  scene: WatercolorScene;
  children?: React.ReactNode;
  className?: string;
  texture?: TexturePreset;
  lighting?: LightingPreset;
  animated?: boolean;
}

/**
 * Watercolor Engine public API.
 *
 * Scene → Composition → Washes → Texture → Lighting → Motion → Content
 */
export function WatercolorCanvas({
  scene,
  children,
  className = "",
  texture,
  lighting,
  animated,
}: Props) {
  const texturePreset = texture ?? scene.texture ?? "cotton";
  const lightingPreset = lighting ?? scene.lighting ?? "morning";
  const motionEnabled = animated ?? scene.motion ?? false;
  const washes = renderScene(scene, { lighting: lightingPreset });

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: palette[scene.background] }}
    >
      <WatercolorFilter />

      <Motion enabled={motionEnabled}>
        {washes.map((wash) => (
          <WatercolorLayer key={wash.key} wash={wash} />
        ))}
      </Motion>

      <PaperTexture preset={texturePreset} />
      <Lighting preset={lightingPreset} />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
