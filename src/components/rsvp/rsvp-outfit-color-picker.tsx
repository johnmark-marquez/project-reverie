"use client";

import {
  fetchOutfitColorCatalog,
  filterAvailableOutfitColors,
  type OutfitColor,
} from "@/lib/outfit-colors";
import { cn } from "@/lib/utils";

interface RsvpOutfitColorPickerProps {
  takenNames: string[];
  value: string | null;
  onChange: (hex: string) => void;
  colors: OutfitColor[];
  loading?: boolean;
  error?: string | null;
}

export function RsvpOutfitColorPicker({
  takenNames,
  value,
  onChange,
  colors,
  loading = false,
  error = null,
}: RsvpOutfitColorPickerProps) {
  const availableColors = filterAvailableOutfitColors(colors, takenNames, value);

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading outfit colors…</p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-destructive" role="alert">
        {error}
      </p>
    );
  }

  if (availableColors.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        All colors are currently taken. Please contact us if you need help.
      </p>
    );
  }

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-ink">
        What color will you wear?
      </legend>
      <p className="text-sm text-muted-foreground">
        Each color can be chosen by up to two guests. Colors at that limit are
        hidden from the list.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {availableColors.map((color) => {
          const selected = value === color.hex;

          return (
            <button
              key={color.hex}
              type="button"
              onClick={() => onChange(color.hex)}
              aria-pressed={selected}
              title={color.name}
              className={cn(
                "flex min-w-0 flex-col items-center gap-2 rounded-lg border px-2 py-3 text-center transition-colors",
                selected
                  ? "border-gold/60 bg-gold/5 ring-2 ring-gold/20"
                  : "border-border/60 hover:border-gold/40",
              )}
            >
              <span
                aria-hidden="true"
                className="size-7 shrink-0 rounded-full border border-border/60"
                style={{ backgroundColor: color.hex }}
              />
              <span className="w-full text-xs leading-snug break-words text-ink sm:text-sm">
                {color.name}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export async function loadOutfitColorCatalog(): Promise<OutfitColor[]> {
  return fetchOutfitColorCatalog();
}
