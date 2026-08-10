import { cn } from "@/lib/utils";
import { Clock, FileSearch, FlaskConical } from "lucide-react";

type Tone = "proposed" | "review" | "proof";

const toneStyles: Record<Tone, string> = {
  proposed: "bg-sand/15 text-sand-dark border-sand/40",
  review: "bg-navy/8 text-navy border-navy/25",
  proof: "bg-forest-light text-forest-dark border-forest/30",
};

const toneIcon: Record<Tone, React.ReactNode> = {
  proposed: <Clock size={14} aria-hidden="true" />,
  review: <FileSearch size={14} aria-hidden="true" />,
  proof: <FlaskConical size={14} aria-hidden="true" />,
};

export default function StatusBadge({ tone, label }: { tone: Tone; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold",
        toneStyles[tone]
      )}
    >
      {toneIcon[tone]}
      {label}
    </span>
  );
}
