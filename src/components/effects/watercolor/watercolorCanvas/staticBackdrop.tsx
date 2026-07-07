import { palette } from "@/lib/watercolor/palette";
import { staticColorWash } from "@/lib/watercolor/static-color-wash";
import type { WatercolorScene } from "../types";
import { PaperTexture } from "../paperTexture";

interface StaticBackdropProps {
  scene: WatercolorScene;
  className?: string;
}

/** Static CSS watercolor for section backgrounds — all devices. */
export function StaticBackdrop({ scene, className = "" }: StaticBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
      style={{ backgroundColor: palette[scene.background] }}
    >
      <div
        className="absolute inset-0"
        style={{ background: staticColorWash(scene, "low") }}
      />
      <PaperTexture preset={scene.texture ?? "cotton"} lite />
    </div>
  );
}
