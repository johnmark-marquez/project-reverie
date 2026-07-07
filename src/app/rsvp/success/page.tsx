"use client";

import { CheckCircle2, Heart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  RsvpDecorCard,
} from "@/components/rsvp/rsvp-decor-card";
import { RsvpMountFade } from "@/components/rsvp/rsvp-mount-fade";
import { RsvpPageHeader } from "@/components/rsvp/rsvp-page-header";
import { RsvpShell } from "@/components/rsvp/rsvp-shell";
import { rsvpPath } from "@/lib/guest-code";

function SuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const status = searchParams.get("status");

  const declined = status === "Declined";

  return (
    <>
      <RsvpMountFade>
        <div className="mx-auto max-w-lg px-6 text-center">
          <div className="mb-4 flex justify-center">
            {declined ? (
              <Heart className="size-12 text-muted-foreground" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="size-12 text-gold" aria-hidden="true" />
            )}
          </div>
          <RsvpPageHeader
            title={declined ? "We'll miss you" : "Thank you!"}
            description={
              declined
                ? "Your response has been recorded. We hope to celebrate with you another time."
                : "Your RSVP has been received. We can't wait to celebrate with you."
            }
            showDeadline={false}
          />
        </div>
      </RsvpMountFade>

      <RsvpMountFade delay={0.1} className="mx-auto max-w-lg px-6">
        <RsvpDecorCard>
          <CardHeader className="text-center">
            <CardTitle>All set</CardTitle>
            <CardDescription>
              {code
                ? `Confirmation saved for invitation ${code}.`
                : "Your response is saved."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {code ? (
              <Button
                nativeButton={false}
                variant="outline"
                className="w-full"
                render={<Link href={rsvpPath(code)} />}
              >
                View or update RSVP
              </Button>
            ) : null}
            <Button nativeButton={false} className="w-full" render={<Link href="/" />}>
              Back to wedding site
            </Button>
          </CardContent>
        </RsvpDecorCard>

        <Text variant="caption" className="mt-6 block text-center text-muted-foreground">
          With love, from our celebration in Tagaytay.
        </Text>
      </RsvpMountFade>
    </>
  );
}

export default function RsvpSuccessPage() {
  return (
    <RsvpShell>
      <Suspense
        fallback={
          <p className="text-center text-muted-foreground">Loading…</p>
        }
      >
        <SuccessContent />
      </Suspense>
    </RsvpShell>
  );
}
