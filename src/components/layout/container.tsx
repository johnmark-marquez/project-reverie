import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-5xl",
};

export function Container({
  children,
  className,
  size = "md",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6", sizeClasses[size], className)}>
      {children}
    </div>
  );
}
