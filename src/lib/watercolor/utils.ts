import { palette, type PaletteColor } from "./palette";

/** Adjust a hex color lighter or darker for pigment layering */
export function pigmentTone(
  color: PaletteColor,
  tone: "dark" | "medium" | "light",
): string {
  if (tone === "medium") return palette[color];

  const hex = palette[color].replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const factor = tone === "dark" ? 0.82 : 1.12;

  const clamp = (n: number) => Math.min(255, Math.max(0, Math.round(n)));

  return `rgb(${clamp(r * factor)}, ${clamp(g * factor)}, ${clamp(b * factor)})`;
}

/** Subtle brightness shift for lighting based on vertical position (0 = top) */
export function lightingOpacity(
  yPercent: number,
  direction: "top-left" | "top-right",
): number {
  const topBias = 1 - yPercent / 100;
  const sideBias = direction === "top-left" ? 1 : 0.96;
  return 0.88 + topBias * 0.12 * sideBias;
}
