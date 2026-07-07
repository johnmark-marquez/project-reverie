"use client";

import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import { ScrollCue } from "@/components/common/scroll-cue";
import {
  WatercolorCanvas,
  heroScene,
} from "@/components/effects/watercolor";
import { SectionWashFade } from "@/components/effects/watercolor/section-wash-fade";
import { Heading, Text } from "@/components/ui/typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { siteConfig } from "@/config/site";

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 640px), (pointer: coarse)");

  return (
    <WatercolorCanvas
      scene={heroScene}
      className="min-h-[100dvh] min-h-screen"
      animated={!isMobile}
      washVerticalCenter={isMobile ? 0.4 : 0.36}
    >
      <SectionWashFade position="bottom" />

      <div className="relative z-10 flex min-h-[100dvh] min-h-screen flex-col items-center px-4 pt-[calc(6.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))] text-center sm:px-6 md:pt-32">
        <FadeIn className="flex w-full max-w-2xl flex-col items-center">
          <Ribbon className="mb-5 w-24 sm:w-28 md:w-36" />
          <Text
            variant="caption"
            className="mb-4 max-w-xs tracking-[0.16em] uppercase sm:max-w-none sm:tracking-[0.2em]"
          >
            We&apos;re getting married
          </Text>

          <Heading
            as="display"
            className="relative mb-6 px-2 text-4xl sm:px-4 sm:text-5xl md:text-7xl"
          >
            {siteConfig.title}
          </Heading>

          <div className="relative w-full max-w-md px-4 py-4 sm:px-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(250,248,245,0.94)_0%,rgba(250,248,245,0.72)_45%,transparent_78%)]"
            />
            <Text className="text-base text-muted-foreground sm:text-lg">
              {siteConfig.tagline}
            </Text>
            <p className="font-heading mt-4 text-xl text-ink sm:text-2xl md:text-3xl">
              {siteConfig.wedding.dateFormatted}
            </p>
          </div>

          <ScrollCue />
        </FadeIn>
      </div>
    </WatercolorCanvas>
  );
}

export function HeroSection() {
  return <Hero />;
}
