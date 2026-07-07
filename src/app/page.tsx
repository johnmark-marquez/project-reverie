import { SiteShell } from "@/components/layout/site-shell";
import { Faq } from "@/components/sections/faq";
import { HeroSection } from "@/components/sections/hero";
import { OurStory } from "@/components/sections/our-story";
import { Rsvp } from "@/components/sections/rsvp";
import { Timeline } from "@/components/sections/timeline";
import { Venues } from "@/components/sections/venues";

export default function HomePage() {
  return (
    <SiteShell>
      <HeroSection />
      <OurStory />
      <Timeline />
      <Venues />
      <Rsvp />
      <Faq />
    </SiteShell>
  );
}
