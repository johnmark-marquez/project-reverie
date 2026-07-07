import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "display";

interface HeadingProps extends React.ComponentProps<"h1"> {
  as?: HeadingLevel;
}

const headingStyles: Record<HeadingLevel, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

export function Heading({
  as = "h2",
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = as === "display" ? "h1" : as;

  return (
    <Tag className={cn(headingStyles[as], className)} {...props}>
      {children}
    </Tag>
  );
}

interface TextProps extends React.ComponentProps<"p"> {
  variant?: "body" | "caption";
}

export function Text({
  variant = "body",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <p
      className={cn(variant === "caption" ? "text-caption" : "text-body", className)}
      {...props}
    >
      {children}
    </p>
  );
}
