"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function ScrollCue() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href="#story"
      aria-label="Scroll to our story"
      className="mt-10 inline-flex text-muted-foreground transition-colors hover:text-gold"
      animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }
      }
    >
      <ChevronDown className="size-5 opacity-75" aria-hidden="true" />
    </motion.a>
  );
}
