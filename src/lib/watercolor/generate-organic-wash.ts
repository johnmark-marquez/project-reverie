import type { PaletteColor } from "@/lib/watercolor/palette";
import { palette } from "@/lib/watercolor/palette";
import { createSeededRandom, hashString } from "@/lib/watercolor/seeded-random";
import {
  getCachedWash,
  setCachedWash,
  washCacheKey,
} from "@/lib/watercolor/wash-cache";

export type WashIntensity = "bold" | "soft" | "whisper";

/** Left → right pigment flow: blue → green → gold → coral → violet */
const WASH_SPECTRUM: PaletteColor[] = [
  "sky",
  "mist",
  "sage",
  "mint",
  "sunshine",
  "buttercream",
  "apricot",
  "peach",
  "rose",
  "coral",
  "lavender",
  "lilac",
  "periwinkle",
];

export interface OrganicWashOptions {
  width: number;
  height: number;
  seed: string;
  intensity?: WashIntensity;
  verticalCenter?: number;
  tilt?: number;
}

const INTENSITY: Record<
  WashIntensity,
  { bandHeight: number; alpha: number; splatters: number; tendrils: number }
> = {
  bold: { bandHeight: 0.62, alpha: 1, splatters: 78, tendrils: 1.15 },
  soft: { bandHeight: 0.54, alpha: 0.84, splatters: 48, tendrils: 0.95 },
  whisper: { bandHeight: 0.4, alpha: 0.58, splatters: 22, tendrils: 0.72 },
};

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function hash01(x: number, seed: number) {
  const value = Math.sin(x * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function smoothNoise(x: number, seed: number) {
  const left = Math.floor(x);
  const fraction = x - left;
  const smooth = fraction * fraction * (3 - 2 * fraction);
  const a = hash01(left, seed);
  const b = hash01(left + 1, seed);
  return a * (1 - smooth) + b * smooth;
}

function fbm(x: number, seed: number, octaves = 4) {
  let total = 0;
  let amplitude = 1;
  let frequency = 1;
  let max = 0;

  for (let octave = 0; octave < octaves; octave += 1) {
    total += smoothNoise(x * frequency, seed + octave * 41) * amplitude;
    max += amplitude;
    amplitude *= 0.52;
    frequency *= 2.05;
  }

  return total / max;
}

function saturate(
  color: { r: number; g: number; b: number },
  amount: number,
) {
  const gray = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return {
    r: Math.min(255, gray + (color.r - gray) * amount),
    g: Math.min(255, gray + (color.g - gray) * amount),
    b: Math.min(255, gray + (color.b - gray) * amount),
  };
}

function colorAt(colors: ReturnType<typeof hexToRgb>[], position: number) {
  const scaled = position * (colors.length - 1);
  const index = Math.floor(scaled);
  const fraction = scaled - index;
  const left = colors[Math.min(index, colors.length - 1)]!;
  const right = colors[Math.min(index + 1, colors.length - 1)]!;

  return saturate(
    {
      r: left.r * (1 - fraction) + right.r * fraction,
      g: left.g * (1 - fraction) + right.g * fraction,
      b: left.b * (1 - fraction) + right.b * fraction,
    },
    1.28,
  );
}

export function intensityForSceneId(sceneId: string, washOpacity?: number) {
  if (sceneId === "hero" || (washOpacity ?? 0) > 0.2) {
    return "bold" as const;
  }

  if ((washOpacity ?? 0) > 0.09) {
    return "soft" as const;
  }

  return "whisper" as const;
}

export function washOptionsForScene(
  sceneId: string,
  width: number,
  height: number,
  washOpacity?: number,
  verticalCenterOverride?: number,
): OrganicWashOptions {
  const rng = createSeededRandom(hashString(sceneId));
  const defaultCenter =
    sceneId === "hero" ? 0.36 : rng.range(0.4, 0.56);

  return {
    width,
    height,
    seed: sceneId,
    intensity: intensityForSceneId(sceneId, washOpacity),
    verticalCenter: verticalCenterOverride ?? defaultCenter,
    tilt: rng.range(-3.5, 3.5),
  };
}

function rgba(color: { r: number; g: number; b: number }, alpha: number) {
  return `rgba(${color.r},${color.g},${color.b},${alpha})`;
}

/** Soft pools, edge rings, and sharp flecks — visible pigment texture. */
function drawPigmentBlooms(
  ctx: CanvasRenderingContext2D,
  rng: ReturnType<typeof createSeededRandom>,
  colors: ReturnType<typeof hexToRgb>[],
  count: number,
  width: number,
  height: number,
  centerY: number,
  bandHalf: number,
) {
  const blooms = document.createElement("canvas");
  blooms.width = width;
  blooms.height = height;

  const splatters = document.createElement("canvas");
  splatters.width = width;
  splatters.height = height;

  const bloomContext = blooms.getContext("2d");
  const splatterContext = splatters.getContext("2d");

  if (!bloomContext || !splatterContext) {
    return;
  }

  const bloomCount = Math.round(count * 0.58);
  const ringCount = Math.max(8, Math.round(count * 0.14));
  const fleckCount = Math.max(12, count - bloomCount - ringCount);

  const pickColor = (x: number) =>
    saturate(colorAt(colors, Math.min(1, Math.max(0, x / width))), 1.18);

  for (let index = 0; index < bloomCount; index += 1) {
    const x = rng.range(-width * 0.06, width * 1.06);
    const y = centerY + rng.range(-bandHalf * 1.35, bandHalf * 1.35);
    const radiusX = rng.range(36, 128);
    const radiusY = radiusX * rng.range(0.42, 0.9);
    const color = pickColor(x);
    const peak = rng.range(0.16, 0.38);

    bloomContext.save();
    bloomContext.translate(x, y);
    bloomContext.rotate(rng.range(0, Math.PI));
    bloomContext.scale(1, radiusY / radiusX);

    const gradient = bloomContext.createRadialGradient(
      0,
      0,
      0,
      0,
      0,
      radiusX,
    );
    gradient.addColorStop(0, rgba(color, peak));
    gradient.addColorStop(0.42, rgba(color, peak * 0.55));
    gradient.addColorStop(0.78, rgba(color, peak * 0.16));
    gradient.addColorStop(1, rgba(color, 0));

    bloomContext.fillStyle = gradient;
    bloomContext.beginPath();
    bloomContext.arc(0, 0, radiusX, 0, Math.PI * 2);
    bloomContext.fill();
    bloomContext.restore();
  }

  for (let index = 0; index < ringCount; index += 1) {
    const x = rng.range(width * 0.04, width * 0.96);
    const y = centerY + rng.range(-bandHalf * 1.1, bandHalf * 1.1);
    const radius = rng.range(48, 118);
    const color = pickColor(x);
    const edge = rng.range(0.22, 0.34);

    bloomContext.save();
    bloomContext.translate(x, y);
    bloomContext.scale(1, rng.range(0.55, 0.92));

    const gradient = bloomContext.createRadialGradient(0, 0, 0, 0, 0, radius);
    gradient.addColorStop(0, rgba(color, 0));
    gradient.addColorStop(edge, rgba(color, 0));
    gradient.addColorStop(edge + 0.1, rgba(color, rng.range(0.28, 0.48)));
    gradient.addColorStop(edge + 0.22, rgba(color, rng.range(0.1, 0.22)));
    gradient.addColorStop(1, rgba(color, 0));

    bloomContext.fillStyle = gradient;
    bloomContext.beginPath();
    bloomContext.arc(0, 0, radius, 0, Math.PI * 2);
    bloomContext.fill();
    bloomContext.restore();
  }

  for (let index = 0; index < fleckCount; index += 1) {
    const x = rng.range(0, width);
    const y = centerY + rng.range(-bandHalf * 1.25, bandHalf * 1.25);
    const radius = rng.range(4, 18);
    const stretch = rng.range(0.45, 1);
    const color = pickColor(x);
    const peak = rng.range(0.32, 0.68);

    splatterContext.save();
    splatterContext.translate(x, y);
    splatterContext.rotate(rng.range(0, Math.PI));
    splatterContext.scale(1, stretch);

    const gradient = splatterContext.createRadialGradient(
      0,
      0,
      0,
      0,
      0,
      radius,
    );
    gradient.addColorStop(0, rgba(color, peak));
    gradient.addColorStop(0.55, rgba(color, peak * 0.42));
    gradient.addColorStop(1, rgba(color, 0));

    splatterContext.fillStyle = gradient;
    splatterContext.beginPath();
    splatterContext.arc(0, 0, radius, 0, Math.PI * 2);
    splatterContext.fill();
    splatterContext.restore();

    const satellites = rng.int(3);

    for (let satellite = 0; satellite < satellites; satellite += 1) {
      const angle = rng.range(0, Math.PI * 2);
      const distance = radius * rng.range(1.4, 2.8);
      const satelliteRadius = rng.range(1.5, 5);
      const satelliteColor = pickColor(x + Math.cos(angle) * distance);

      splatterContext.fillStyle = rgba(
        satelliteColor,
        rng.range(0.22, 0.52),
      );
      splatterContext.beginPath();
      splatterContext.arc(
        x + Math.cos(angle) * distance,
        y + Math.sin(angle) * distance,
        satelliteRadius,
        0,
        Math.PI * 2,
      );
      splatterContext.fill();
    }
  }

  for (let index = 0; index < Math.max(4, Math.round(count * 0.08)); index += 1) {
    const x = rng.range(0, width);
    const y = centerY + rng.range(-bandHalf, bandHalf);
    const radius = rng.range(24, 52);

    bloomContext.save();
    bloomContext.translate(x, y);
    bloomContext.scale(1, rng.range(0.55, 0.88));

    const gradient = bloomContext.createRadialGradient(0, 0, 0, 0, 0, radius);
    gradient.addColorStop(0, `rgba(255,255,255,${rng.range(0.12, 0.28)})`);
    gradient.addColorStop(0.55, `rgba(255,255,255,${rng.range(0.04, 0.1)})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    bloomContext.fillStyle = gradient;
    bloomContext.beginPath();
    bloomContext.arc(0, 0, radius, 0, Math.PI * 2);
    bloomContext.fill();
    bloomContext.restore();
  }

  ctx.save();
  ctx.filter = "blur(4px)";
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.92;
  ctx.drawImage(blooms, 0, 0);
  ctx.filter = "blur(0.8px)";
  ctx.globalAlpha = 0.88;
  ctx.drawImage(splatters, 0, 0);
  ctx.globalAlpha = 1;
  ctx.filter = "none";
  ctx.globalCompositeOperation = "source-over";
  ctx.restore();
}

export function paintOrganicWash(
  ctx: CanvasRenderingContext2D,
  options: OrganicWashOptions,
) {
  const {
    width,
    height,
    seed,
    intensity = "soft",
    verticalCenter = 0.48,
    tilt = 0,
  } = options;
  const config = INTENSITY[intensity];
  const noiseSeed = hashString(seed);
  const rng = createSeededRandom(noiseSeed);
  const colors = WASH_SPECTRUM.map((name) => hexToRgb(palette[name]));
  const centerY = height * verticalCenter;
  const bandHalf = (height * config.bandHeight) / 2;
  const radians = (tilt * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  const noiseBuckets = 384;
  const topNoiseLUT = new Float32Array(noiseBuckets);
  const bottomNoiseLUT = new Float32Array(noiseBuckets);
  const bleedNoiseLUT = new Float32Array(noiseBuckets);

  for (let index = 0; index < noiseBuckets; index += 1) {
    const nx = index / (noiseBuckets - 1);
    topNoiseLUT[index] =
      fbm(nx * 4.2, noiseSeed, 5) * 0.62 +
      fbm(nx * 9.5, noiseSeed + 17, 3) * 0.38;
    bottomNoiseLUT[index] =
      fbm(nx * 3.8 + 1.7, noiseSeed + 53, 5) * 0.64 +
      fbm(nx * 8.1, noiseSeed + 71, 3) * 0.36;
    bleedNoiseLUT[index] = fbm(nx * 2.4, noiseSeed + 240, 2) * 0.08;
  }

  const sampleNoise = (table: Float32Array, nx: number) => {
    const index = Math.min(
      noiseBuckets - 1,
      Math.max(0, Math.round(nx * (noiseBuckets - 1))),
    );
    return table[index]!;
  };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const rotatedX = (x - width / 2) * cos - (y - centerY) * sin + width / 2;
      const nx = rotatedX / width;
      const topNoise = sampleNoise(topNoiseLUT, nx);
      const bottomNoise = sampleNoise(bottomNoiseLUT, nx);
      const topEdge = centerY - bandHalf + topNoise * bandHalf * 0.72;
      const bottomEdge = centerY + bandHalf - bottomNoise * bandHalf * 0.68;
      const mid = (topEdge + bottomEdge) / 2;
      const halfBand = Math.max(12, (bottomEdge - topEdge) / 2);
      let alpha = 0;

      if (y >= topEdge && y <= bottomEdge) {
        const distFromMid = Math.abs(y - mid) / halfBand;
        const verticalFade = Math.pow(1 - distFromMid, 1.05);
        const pigment = fbm(nx * 14 + y * 0.02, noiseSeed + 120, 3);
        alpha = verticalFade * config.alpha * (0.72 + pigment * 0.28);
      } else {
        const outside =
          y < topEdge ? topEdge - y : y > bottomEdge ? y - bottomEdge : 0;
        const tendrilNoise = fbm(nx * 11 + y * 0.04, noiseSeed + 190, 2);

        if (outside < halfBand * 0.42 * config.tendrils && tendrilNoise > 0.42) {
          alpha =
            (1 - outside / (halfBand * 0.42)) *
            (tendrilNoise - 0.42) *
            2.4 *
            config.alpha *
            0.55;
        }
      }

      if (alpha <= 0.01) {
        continue;
      }

      const bleed = sampleNoise(bleedNoiseLUT, nx);
      const pigment = colorAt(colors, Math.min(1, Math.max(0, nx + bleed)));
      const idx = (y * width + x) * 4;

      data[idx] = pigment.r;
      data[idx + 1] = pigment.g;
      data[idx + 2] = pigment.b;
      data[idx + 3] = Math.min(255, alpha * 255);
    }
  }

  ctx.clearRect(0, 0, width, height);
  ctx.putImageData(imageData, 0, 0);

  drawPigmentBlooms(
    ctx,
    rng,
    colors,
    config.splatters,
    width,
    height,
    centerY,
    bandHalf,
  );
}

export function renderOrganicWashToCanvas(
  canvas: HTMLCanvasElement,
  options: OrganicWashOptions,
) {
  const context = canvas.getContext("2d", { alpha: true });

  if (!context) {
    return;
  }

  const targetWidth = Math.max(1, Math.round(options.width));
  const targetHeight = Math.max(1, Math.round(options.height));
  const renderOptions = {
    ...options,
    width: targetWidth,
    height: targetHeight,
  };
  const key = washCacheKey({
    ...renderOptions,
    verticalCenter: renderOptions.verticalCenter,
  });
  const cached = getCachedWash(key);

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  if (cached) {
    context.clearRect(0, 0, targetWidth, targetHeight);
    context.drawImage(cached, 0, 0);
    return;
  }

  const scratch = document.createElement("canvas");
  scratch.width = targetWidth;
  scratch.height = targetHeight;

  const scratchContext = scratch.getContext("2d", { alpha: true });

  if (!scratchContext) {
    return;
  }

  paintOrganicWash(scratchContext, renderOptions);
  setCachedWash(key, scratch);

  context.clearRect(0, 0, targetWidth, targetHeight);
  context.filter = "blur(0.6px)";
  context.drawImage(scratch, 0, 0);
  context.filter = "none";
}
