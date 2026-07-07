"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Text } from "@/components/ui/typography";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  RsvpDecorCard,
} from "@/components/rsvp/rsvp-decor-card";
import { RsvpCodeForm } from "@/components/rsvp/rsvp-code-form";
import { RsvpMountFade } from "@/components/rsvp/rsvp-mount-fade";
import { RsvpPageHeader } from "@/components/rsvp/rsvp-page-header";
import { siteConfig } from "@/config/site";

function CodeEntryContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") ?? "";

  return (
    <>
      <RsvpMountFade>
        <RsvpPageHeader
          title="RSVP"
          description={siteConfig.rsvp.message}
        />
      </RsvpMountFade>

      <RsvpMountFade delay={0.08} className="mx-auto max-w-lg px-6">
        <RsvpDecorCard contentClassName="text-left">
          <CardHeader>
            <CardTitle>Invitation code</CardTitle>
            <CardDescription>{siteConfig.rsvp.note}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RsvpCodeForm initialCode={initialCode} />
            <Text variant="caption" className="text-muted-foreground">
              Example format: RVR-4RBSN
            </Text>
          </CardContent>
        </RsvpDecorCard>
      </RsvpMountFade>
    </>
  );
}

export function CodeEntry() {
  return (
    <Suspense fallback={<p className="text-center text-muted-foreground">Loading…</p>}>
      <CodeEntryContent />
    </Suspense>
  );
}
