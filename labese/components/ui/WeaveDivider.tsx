import { cn } from "@/lib/utils";

export default function WeaveDivider({ onDark = false }: { onDark?: boolean }) {
  return (
    <div
      className={cn("weave-divider", onDark && "on-dark")}
      role="presentation"
      aria-hidden="true"
    />
  );
}
