import type { Programme } from "@/data/programmes";
import { iconMap } from "@/lib/icons";
import Button from "@/components/ui/Button";

export default function ProgrammeCard({ programme }: { programme: Programme }) {
  const Icon = iconMap[programme.icon];

  return (
    <article
      id={programme.slug}
      className="card-hover scroll-mt-24 rounded-2xl border border-line bg-white p-7 flex flex-col"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-forest-light text-forest-dark shrink-0">
          <Icon size={22} aria-hidden="true" />
        </div>
        <span className="font-mono-stat text-xs text-ink/40">
          {String(programme.number).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-display font-medium text-navy leading-snug">
        {programme.title}
      </h3>
      <p className="mt-3 text-sm text-ink/75 leading-relaxed">
        {programme.description}
      </p>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-dark mb-2">
          Main Activities
        </p>
        <ul className="space-y-1.5 text-sm text-ink/75 list-disc list-outside pl-4 marker:text-sand">
          {programme.activities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-lg bg-cream px-4 py-3 text-sm text-navy/85">
        <span className="font-semibold">Advocacy focus: </span>
        {programme.advocacyFocus}
      </div>

      <div className="mt-6 pt-1">
        <Button href="/contact" variant="ghost" showArrow={false} className="text-sm">
          Partner with LABESE
        </Button>
      </div>
    </article>
  );
}
