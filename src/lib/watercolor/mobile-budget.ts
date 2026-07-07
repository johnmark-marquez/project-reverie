/** Pixel budget for procedural wash — lower on phones to keep scroll smooth. */
export function washPixelBudget(priority: "high" | "low"): number {
  if (typeof window === "undefined") {
    return priority === "high" ? 280_000 : 160_000;
  }

  const isMobile = window.matchMedia(
    "(max-width: 640px), (pointer: coarse)",
  ).matches;

  if (isMobile) {
    return priority === "high" ? 175_000 : 95_000;
  }

  return priority === "high" ? 380_000 : 200_000;
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(max-width: 640px), (pointer: coarse)").matches;
}

export function washLazyRootMargin(): string {
  return isMobileViewport() ? "120px 0px" : "320px 0px";
}
