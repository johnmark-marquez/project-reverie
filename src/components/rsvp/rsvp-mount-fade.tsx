"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RsvpMountFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Fade-in on mount — for full-page RSVP routes (not scroll-triggered). */
export function RsvpMountFade({
  children,
  className,
  delay = 0,
}: RsvpMountFadeProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
