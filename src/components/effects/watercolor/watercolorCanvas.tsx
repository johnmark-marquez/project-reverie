import { palette } from "@/lib/watercolor/palette";
import { PaperTexture } from "./paperTexture";
import type { WatercolorScene } from "./types";
import { WatercolorFilters } from "./watercolorFilters";
import { WatercolorLayer } from "./watercolorLayer";

interface Props {
  scene: WatercolorScene;
  children?: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function WatercolorCanvas({
  scene,
  children,
  className = "",
  animate = false,
}: Props) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: palette[scene.background] }}
    >
      <WatercolorFilters />

      <div
        className={`absolute inset-0 ${animate ? "watercolor-drift" : ""}`}
        aria-hidden="true"
      >
        {scene.washes.map((wash, index) => (
          <WatercolorLayer key={`${scene.name}-${index}`} wash={wash} />
        ))}
      </div>

      <PaperTexture />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
