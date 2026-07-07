"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function ScrollCue() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href="#story"
      aria-label="Scroll to our story"
      className="mt-10 flex flex-col items-center gap-0.5 text-muted-foreground transition-colors hover:text-gold"
      animate={prefersReducedMotion ? undefined : { y: [0, 7, 0] }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
      }
    >
      {[0, 1, 2].map((i) => (
        <ChevronDown
          key={i}
          className="size-4 opacity-70"
          style={{ opacity: 0.9 - i * 0.25 }}
          aria-hidden="true"
        />
      ))}
    </motion.a>
  );
}
