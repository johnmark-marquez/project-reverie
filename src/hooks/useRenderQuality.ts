"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export type RenderQuality = "high" | "medium" | "low";

function getRenderQuality(): RenderQuality {
  if (typeof window === "undefined") {
    return "medium";
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "low";
  }

  if (window.matchMedia("(max-width: 640px)").matches) {
    return "low";
  }

  if (
    window.matchMedia("(max-width: 1024px)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return "medium";
  }

  return "high";
}

function subscribe(onStoreChange: () => void) {
  const queries = [
    window.matchMedia("(prefers-reduced-motion: reduce)"),
    window.matchMedia("(max-width: 640px)"),
    window.matchMedia("(max-width: 1024px)"),
    window.matchMedia("(pointer: coarse)"),
  ];

  queries.forEach((query) => query.addEventListener("change", onStoreChange));

  return () => {
    queries.forEach((query) =>
      query.removeEventListener("change", onStoreChange),
    );
  };
}

/** Picks high / medium / low renderer tier for progressive enhancement. */
export function useRenderQuality(): RenderQuality {
  const clientQuality = useSyncExternalStore(
    subscribe,
    getRenderQuality,
    (): RenderQuality => "medium",
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? clientQuality : "medium";
}
