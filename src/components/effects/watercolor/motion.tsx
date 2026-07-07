interface Props {
  enabled?: boolean;
  children: React.ReactNode;
}

export function Motion({ enabled = false, children }: Props) {
  return (
    <div
      className={`absolute inset-0 z-[1] ${enabled ? "watercolor-motion" : ""}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
