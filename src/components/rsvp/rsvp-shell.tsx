import Link from "next/link";
import { Ribbon } from "@/components/common/ribbon";
import { PaperTexture } from "@/components/effects/watercolor/paperTexture";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { Container } from "@/components/layout/container";
import { Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";

interface RsvpShellProps {
  children: React.ReactNode;
}

export function RsvpShell({ children }: RsvpShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ivory">
      <SectionBackdrop preset="rsvp" />
      <PaperTexture preset="cotton" lite />

      <header className="relative z-10 border-b border-border/40 bg-ivory/90 backdrop-blur-md">
        <Container className="py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="font-heading text-lg tracking-wide text-ink transition-colors hover:text-gold"
            >
              {siteConfig.title}
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-ink"
            >
              Back to site
            </Link>
          </div>
          <Ribbon className="mt-4 w-full opacity-70" variant="straight" />
        </Container>
      </header>

      <main className="relative z-10 py-10 sm:py-14">{children}</main>

      <footer className="relative z-10 border-t border-border/40 bg-ivory/80 py-8 backdrop-blur-sm">
        <Container className="text-center">
          <Text variant="caption" className="text-muted-foreground">
            {siteConfig.title} · {siteConfig.wedding.dateFormatted}
          </Text>
          <Text variant="caption" className="mt-1 text-muted-foreground/70">
            {siteConfig.wedding.ceremony.venue} & {siteConfig.wedding.reception.venue}
          </Text>
        </Container>
      </footer>
    </div>
  );
}
