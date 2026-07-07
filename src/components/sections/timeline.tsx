import { FadeIn } from "@/components/common/fade-in";
import { Ribbon } from "@/components/common/ribbon";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";

const events = siteConfig.wedding.itinerary;

export function Timeline() {
  return (
    <Section
      id="details"
      aria-labelledby="details-heading"
      className="relative overflow-hidden"
    >
      <SectionBackdrop preset="details" />
      <Container>
        <FadeIn>
          <Ribbon className="mb-8 w-16" />
          <Heading as="h2" id="details-heading" className="mb-4">
            Wedding Day
          </Heading>
          <Text className="mb-12 max-w-2xl text-muted-foreground">
            {siteConfig.wedding.dateFormatted} — here&apos;s what to expect.
          </Text>
        </FadeIn>

        <div className="relative space-y-0">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-px bg-border md:left-1/2 md:-translate-x-px"
          />

          {events.map((event, index) => (
            <FadeIn key={event.title} delay={index * 0.1}>
              <div
                className={`relative flex flex-col gap-4 pb-12 md:flex-row md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden flex-1 md:block" />

                <div
                  aria-hidden="true"
                  className="absolute left-4 z-10 size-3 -translate-x-1/2 rounded-full border-2 border-gold bg-ivory md:left-1/2"
                />

                <div className="flex-1 pl-10 md:pl-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="font-heading text-2xl text-gold">
                      {event.start}
                      <span className="mx-2 text-muted-foreground/60">–</span>
                      {event.end}
                    </p>
                    {"duration" in event && event.duration ? (
                      <span className="text-caption rounded-full border border-border/70 bg-card/60 px-2.5 py-0.5">
                        {event.duration}
                      </span>
                    ) : null}
                  </div>
                  <Heading as="h3" className="mt-2">
                    {event.title}
                  </Heading>
                  {"venue" in event && event.venue ? (
                    <Text className="mt-1 font-medium text-ink">
                      {event.venue}
                    </Text>
                  ) : null}
                  <Text className="mt-2 text-muted-foreground">
                    {event.description}
                  </Text>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
