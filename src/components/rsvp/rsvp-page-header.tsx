import { CalendarHeart, MapPin } from "lucide-react";
import { Ribbon } from "@/components/common/ribbon";
import { Heading, Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";

interface RsvpPageHeaderProps {
  title: string;
  description?: string;
  showDeadline?: boolean;
}

export function RsvpPageHeader({
  title,
  description,
  showDeadline = true,
}: RsvpPageHeaderProps) {
  const { wedding, rsvp } = siteConfig;

  return (
    <div className="mx-auto mb-10 max-w-lg px-6 text-center">
      <Text variant="caption" className="mb-3 tracking-[0.2em] uppercase">
        {siteConfig.title}
      </Text>
      <Ribbon className="mx-auto mb-5 w-24 md:w-32" />
      <Text variant="caption" className="mb-2 text-gold">
        {wedding.dateFormatted}
      </Text>
      <Heading as="h1" className="mb-3">
        {title}
      </Heading>
      {description ? (
        <Text className="text-muted-foreground">{description}</Text>
      ) : null}
      {showDeadline ? (
        <Text variant="caption" className="mt-4 text-muted-foreground">
          Please respond by {rsvp.deadline}
        </Text>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarHeart className="size-4 text-gold" aria-hidden="true" />
          {wedding.dateFormatted}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-4 text-gold" aria-hidden="true" />
          Tagaytay, Cavite
        </span>
      </div>
    </div>
  );
}
