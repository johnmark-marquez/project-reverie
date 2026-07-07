import { Ribbon } from "@/components/common/ribbon";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface RsvpLoadingProps {
  message?: string;
  className?: string;
}

export function RsvpLoading({
  message = "Loading your invitation…",
  className,
}: RsvpLoadingProps) {
  return (
    <div className={cn("mx-auto max-w-lg px-6 text-center", className)}>
      <Ribbon className="mx-auto mb-6 w-20 opacity-80" />
      <div
        className="mx-auto mb-4 size-9 animate-spin rounded-full border-2 border-gold/25 border-t-gold"
        role="status"
        aria-label="Loading"
      />
      <Text className="text-muted-foreground">{message}</Text>
    </div>
  );
}
