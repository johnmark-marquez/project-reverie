import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  "aria-labelledby"?: string;
}

export function Section({
  id,
  children,
  className,
  "aria-labelledby": ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("py-16 md:py-28", className)}
    >
      {children}
    </section>
  );
}
