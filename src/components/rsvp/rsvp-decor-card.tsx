import { Ribbon } from "@/components/common/ribbon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RsvpDecorCardProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

/** Invitation-style card with a soft rainbow accent. */
export function RsvpDecorCard({
  children,
  className,
  contentClassName,
}: RsvpDecorCardProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-30"
        style={{ background: "var(--rainbow-gradient)" }}
      />
      <Card className="relative overflow-hidden border-border/50 bg-card/92 shadow-md backdrop-blur-sm">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 opacity-50"
          style={{ background: "var(--rainbow-gradient)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-rose/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-16 size-44 rounded-full bg-mist/12 blur-3xl"
        />
        <div className={cn("relative", contentClassName)}>{children}</div>
      </Card>
    </div>
  );
}

export {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
};
