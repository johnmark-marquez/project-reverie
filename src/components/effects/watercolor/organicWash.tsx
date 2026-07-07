"use client";

import { useEffect, useRef, useState } from "react";
import type { WatercolorScene } from "@/components/effects/watercolor/types";
import {
  renderOrganicWashToCanvas,
  washOptionsForScene,
} from "@/lib/watercolor/generate-organic-wash";
import { scheduleWashPaint } from "@/lib/watercolor/wash-paint-queue";

interface OrganicWashProps {
  scene: WatercolorScene;
  className?: string;
  animated?: boolean;
  /** Hero paints immediately; section backdrops wait until near the viewport. */
  priority?: "high" | "low";
}

function averageWashOpacity(scene: WatercolorScene) {
  if (!scene.washes.length) {
    return 0.15;
  }

  const total = scene.washes.reduce(
    (sum, wash) => sum + (wash.opacity ?? 0.2),
    0,
  );

  return total / scene.washes.length;
}

/** Procedural watercolor — cached, queued, and lazy-loaded for responsiveness. */
export function OrganicWash({
  scene,
  className = "",
  animated,
  priority = "low",
}: OrganicWashProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const motionEnabled = animated ?? scene.motion ?? false;
  const [shouldPaint, setShouldPaint] = useState(priority === "high");

  useEffect(() => {
    if (priority === "high" || shouldPaint) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldPaint(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [priority, shouldPaint]);

  useEffect(() => {
    if (!shouldPaint) {
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    let cancelled = false;
    let resizeTimer: number | undefined;

    const paint = () => {
      if (cancelled) {
        return;
      }

      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width < 1 || height < 1) {
        return;
      }

      const last = sizeRef.current;

      if (
        Math.abs(last.width - width) < 2 &&
        Math.abs(last.height - height) < 2
      ) {
        return;
      }

      sizeRef.current = { width, height };

      const pixelBudget = priority === "high" ? 380_000 : 200_000;
      const scale = Math.min(1, Math.sqrt(pixelBudget / (width * height)));
      const renderWidth = Math.max(280, Math.round(width * scale));
      const renderHeight = Math.max(160, Math.round(height * scale));

      scheduleWashPaint(() => {
        if (cancelled) {
          return;
        }

        renderOrganicWashToCanvas(
          canvas,
          washOptionsForScene(
            scene.id,
            renderWidth,
            renderHeight,
            averageWashOpacity(scene),
          ),
        );
      }, priority);
    };

    paint();

    const observer = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(paint, 200);
    });

    observer.observe(container);

    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      observer.disconnect();
    };
  }, [shouldPaint, scene.id, scene.washes, priority]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-[1]">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`h-full w-full mix-blend-multiply ${motionEnabled ? "watercolor-opacity-motion" : ""} ${className}`}
      />
    </div>
  );
}
