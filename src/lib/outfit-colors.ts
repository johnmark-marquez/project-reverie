export interface OutfitColor {
  name: string;
  hex: string;
}

interface ColorPizzaColor {
  name: string;
  hex: string;
  luminanceWCAG?: number;
}

interface ColorPizzaResponse {
  colors: ColorPizzaColor[];
}

const COLOR_PIZZA_URL = "https://api.color.pizza/v1/?list=x11";

const EXCLUDED_NAME_PATTERN =
  /white|ivory|snow|ghost|linen|cream|beige|wheat|chiffon|lace|smoke|azure|mintcream|honeydew|seashell|cornsilk|floral|oldlace|antique|blanched|papaya|navajo|bisque|moccasin|peachpuff|mistyrose/i;

/** Dress code: no white for ladies — drop very light neutrals from the picker. */
function isExcludedColor(color: ColorPizzaColor): boolean {
  if (EXCLUDED_NAME_PATTERN.test(color.name)) {
    return true;
  }

  if (typeof color.luminanceWCAG === "number" && color.luminanceWCAG >= 0.88) {
    return true;
  }

  return false;
}

function normalizeHex(hex: string): string {
  return hex.trim().toLowerCase();
}

function formatLabel(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([a-z])(\d)/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function fetchOutfitColorCatalog(): Promise<OutfitColor[]> {
  const response = await fetch(COLOR_PIZZA_URL, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error("Could not load outfit colors.");
  }

  const data = (await response.json()) as ColorPizzaResponse;
  const seen = new Set<string>();
  const colors: OutfitColor[] = [];

  for (const color of data.colors) {
    const hex = normalizeHex(color.hex);

    if (!hex || seen.has(hex) || isExcludedColor(color)) {
      continue;
    }

    seen.add(hex);
    colors.push({
      name: formatLabel(color.name),
      hex,
    });
  }

  return colors.sort((left, right) => left.name.localeCompare(right.name));
}

export const MAX_OUTFIT_COLOR_CLAIMS = 2;

export function filterAvailableOutfitColors(
  catalog: OutfitColor[],
  takenHexes: string[],
  selectedHex?: string | null,
): OutfitColor[] {
  const takenCounts = new Map<string, number>();

  for (const hex of takenHexes) {
    const key = normalizeHex(hex);
    takenCounts.set(key, (takenCounts.get(key) ?? 0) + 1);
  }

  const selected = selectedHex ? normalizeHex(selectedHex) : null;

  return catalog.filter((color) => {
    const hex = normalizeHex(color.hex);
    const claimCount = takenCounts.get(hex) ?? 0;
    return hex === selected || claimCount < MAX_OUTFIT_COLOR_CLAIMS;
  });
}
