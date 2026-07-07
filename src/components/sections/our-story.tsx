import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import { storyScene, WatercolorCanvas } from "@/components/effects/watercolor";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading, Text } from "@/components/ui/typography";

export function OurStory() {
  return (
    <Section
      id="story"
      aria-labelledby="story-heading"
      className="relative overflow-hidden"
    >
      <WatercolorCanvas
        scene={storyScene}
        className="pointer-events-none absolute inset-0 -z-10 h-full"
      />

      <Container>
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
                [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.]
              </Text>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-4">
              <Heading as="h3">How we got engaged</Heading>
              <Text className="text-muted-foreground">
                [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.]
              </Text>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3} className="mt-12">
          <div className="aspect-[16/9] rounded-2xl border border-border/60 bg-muted/50 flex items-center justify-center">
            <Text variant="caption">Photo placeholder</Text>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
