"use client";

import Link from "next/link";
import { PaperTexture } from "@/components/effects/watercolor/paperTexture";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#story", label: "Story" },
  { href: "#details", label: "Details" },
  { href: "#venues", label: "Venues" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#faq", label: "FAQ" },
];

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header className="fixed top-0 right-0 left-0 z-50 overflow-hidden border-b border-border/30 bg-white/75 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <PaperTexture preset="cotton" lite className="opacity-[0.35]" />
        <nav
          aria-label="Main navigation"
          className="relative mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-2 sm:gap-3 sm:px-6 sm:py-4"
        >
          <Link
            href="/"
            className="font-heading hidden text-lg tracking-wide text-ink transition-colors hover:text-gold sm:block"
          >
            {siteConfig.title}
          </Link>

          <ul className="scrollbar-none flex w-full items-center justify-between gap-1 overflow-x-auto sm:w-auto sm:justify-end sm:gap-6">
            {navLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  className={cn(
                    "inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-xs whitespace-nowrap text-muted-foreground transition-colors sm:min-h-0 sm:min-w-0 sm:px-0 sm:text-sm",
                    "hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main-content" className="relative bg-ivory">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{ opacity: 0.5 }}
        >
          <PaperTexture preset="cotton" lite />
        </div>
        <div className="relative z-[1]">{children}</div>
      </main>

      <footer className="relative z-[1] overflow-hidden border-t border-border/60 bg-ivory py-10">
        <SectionBackdrop preset="footer" />
        <div className="relative z-[1] mx-auto max-w-3xl px-6 text-center">
          <p className="font-heading text-lg text-ink">{siteConfig.title}</p>
          <p className="text-caption mt-2">
            February 10, 2028 · Made with love
          </p>
          <p className="text-caption mt-1 text-muted-foreground/70">
            {siteConfig.projectName}
          </p>
        </div>
      </footer>
    </>
  );
}
