import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import { SectionWashFade } from "@/components/effects/watercolor/section-wash-fade";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PrenupGallery } from "@/components/sections/prenup-gallery";
import { Heading, Text } from "@/components/ui/typography";

export function OurStory() {
  return (
    <Section
      id="story"
      aria-labelledby="story-heading"
      className="relative -mt-20 overflow-hidden pt-20 md:-mt-28 md:pt-24"
    >
      <SectionBackdrop preset="story" />
      <SectionWashFade position="top" />

      <Container className="relative z-10">
        <FadeIn>
          <Ribbon className="mb-8 w-16" />
          <Heading as="h2" id="story-heading" className="mb-4">
            Our Story
          </Heading>
          <Text className="mb-12 max-w-2xl text-muted-foreground">
            Every love story is beautiful, but ours is our favorite.
          </Text>
        </FadeIn>

        <div className="grid gap-12 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="space-y-4">
              <Heading as="h3">How we met</Heading>
              <Text className="text-muted-foreground">
                [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.]
              </Text>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-4">
              <Heading as="h3">How we got engaged</Heading>
              <Text className="text-muted-foreground">
                [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.]
              </Text>
            </div>
          </FadeIn>
        </div>

        <PrenupGallery />
      </Container>
    </Section>
  );
}
