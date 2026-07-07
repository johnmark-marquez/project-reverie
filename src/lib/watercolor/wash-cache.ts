import type { OrganicWashOptions } from "@/lib/watercolor/generate-organic-wash";

const cache = new Map<string, HTMLCanvasElement>();
const MAX_CACHE_ENTRIES = 16;

export function washCacheKey(options: OrganicWashOptions) {
  const { width, height, seed, intensity, verticalCenter, tilt } = options;
  return `${seed}:${width}x${height}:${intensity}:${verticalCenter?.toFixed(3)}:${tilt?.toFixed(2)}`;
}

export function getCachedWash(key: string) {
  return cache.get(key) ?? null;
}

export function setCachedWash(key: string, canvas: HTMLCanvasElement) {
  if (cache.size >= MAX_CACHE_ENTRIES) {
    const oldest = cache.keys().next().value;

    if (oldest) {
      cache.delete(oldest);
    }
  }

  cache.set(key, canvas);
}
