import type { LightingPreset } from "@/lib/watercolor/themes";
import { lightingPresets } from "@/lib/watercolor/themes";
import { cn } from "@/lib/utils";

interface Props {
  preset?: LightingPreset;
  className?: string;
}

export function Lighting({ preset = "morning", className }: Props) {
  const config = lightingPresets[preset];
  const isLeft = config.direction === "top-left";

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-[2]", className)}
    >
      <div
        className={`absolute -top-1/4 h-2/3 w-2/3 rounded-full ${
          isLeft ? "-left-1/4" : "-right-1/4"
        }`}
        style={{
          background: `radial-gradient(circle, rgba(255,248,235,${config.highlightOpacity * 0.45}) 0%, transparent 70%)`,
        }}
      />
      <div
        className={`absolute -bottom-1/4 h-1/2 w-1/2 rounded-full ${
          isLeft ? "-right-1/4" : "-left-1/4"
        }`}
        style={{
          background: `radial-gradient(circle, rgba(180,195,220,${config.shadowOpacity * 0.6}) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
