"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import {
  WatercolorCanvas,
  heroScene,
} from "@/components/effects/watercolor";
import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <WatercolorCanvas
      scene={heroScene}
      className="min-h-screen"
      animate
    >
      <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <FadeIn>
          <Ribbon className="mx-auto mb-8 w-24" />
          <Text variant="caption" className="mb-4 tracking-[0.2em] uppercase">
            We&apos;re getting married
          </Text>
          <Heading as="display" className="mb-6">
            {siteConfig.title}
          </Heading>
          <Text className="mx-auto max-w-md text-lg text-muted-foreground">
            {siteConfig.tagline}
          </Text>
          <p className="font-heading mt-8 text-2xl text-ink md:text-3xl">
            {siteConfig.wedding.dateFormatted}
          </p>
        </FadeIn>

        <motion.a
          href="#story"
          aria-label="Scroll to our story"
          className="mt-auto text-muted-foreground transition-colors hover:text-gold"
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ChevronDown className="size-6" />
        </motion.a>
      </div>
    </WatercolorCanvas>
  );
}

export function HeroSection() {
  return <Hero />;
}
