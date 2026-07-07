import { cn } from "@/lib/utils";

interface RibbonProps {
  className?: string;
}

export function Ribbon({ className }: RibbonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-px w-full", className)}
      style={{ background: "var(--rainbow-gradient)" }}
    />
  );
}
