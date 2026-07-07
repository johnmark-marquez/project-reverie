import { cn } from "@/lib/utils";

interface SectionWashFadeProps {
  position: "top" | "bottom";
  className?: string;
}

/** Soft ivory veil at section edges — paper showing through as pigment dries. */
export function SectionWashFade({ position, className }: SectionWashFadeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-[3]",
        position === "bottom"
          ? "bottom-0 h-[min(40vh,320px)] bg-gradient-to-b from-transparent via-ivory/40 to-ivory md:h-[min(48vh,400px)] md:via-ivory/50"
          : "top-0 h-[min(36vh,280px)] bg-gradient-to-b from-ivory via-ivory/75 via-40% to-transparent md:h-[min(44vh,340px)]",
        className,
      )}
    />
  );
}

/** Masks a wash canvas so pigment fades out toward an edge (not a hard cut). */
export function WashEdgeMask({
  edge,
  children,
  className,
}: {
  edge: "top" | "bottom";
  children: React.ReactNode;
  className?: string;
}) {
  const mask =
    edge === "bottom"
      ? "linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.88) 66%, rgba(0,0,0,0.52) 80%, rgba(0,0,0,0.15) 92%, transparent 100%)"
      : "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 8%, rgba(0,0,0,0.52) 20%, rgba(0,0,0,0.88) 34%, black 50%, black 100%)";

  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      {children}
    </div>
  );
}
