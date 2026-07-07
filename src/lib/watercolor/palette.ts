export const palette = {
  ivory: "#FAF8F5",
  ink: "#383838",

  // Anchor tones (original 6, boosted saturation)
  rose: "#E87878",
  apricot: "#F5B070",
  buttercream: "#F5D860",
  sage: "#8FCE9E",
  mist: "#85C4F0",
  lavender: "#B898F0",

  // Expanded rainbow
  coral: "#F07068",
  peach: "#F8A878",
  sunshine: "#F8CC50",
  mint: "#6ECCA8",
  sky: "#68B8F0",
  periwinkle: "#9090F0",
  lilac: "#B078F0",

  gold: "#C8A97E",
} as const;

export type PaletteColor = keyof typeof palette;

/** Ordered left-to-right rainbow sweep for gradients and scenes */
export const rainbow: PaletteColor[] = [
  "coral",
  "rose",
  "peach",
  "apricot",
  "buttercream",
  "sunshine",
  "mint",
  "sage",
  "sky",
  "mist",
  "periwinkle",
  "lavender",
  "lilac",
];
