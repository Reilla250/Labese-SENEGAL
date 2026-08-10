import type { Initiative } from "@/data/initiatives";
import StatusBadge from "@/components/ui/StatusBadge";

export default function InitiativeCard({ initiative }: { initiative: Initiative }) {
  return (
    <article className="rounded-2xl border border-line bg-white overflow-hidden">
      <div className="p-7">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <StatusBadge tone={initiative.statusTone} label={initiative.status} />
        </div>
        <h3 className="text-2xl font-display font-medium text-navy">
          {initiative.title}
        </h3>
        <p className="mt-4 text-sm text-ink/75 leading-relaxed">
          {initiative.description}
        </p>

        {initiative.stats && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {initiative.stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-cream px-4 py-3">
                <p className="font-mono-stat text-2xl font-semibold text-forest-dark">
                  {s.value}
                </p>
                <p className="text-xs text-ink/70 mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {initiative.note && (
          <p className="mt-5 text-xs text-navy/70 border-l-2 border-sand pl-3 leading-relaxed">
            {initiative.note}
          </p>
        )}
      </div>
    </article>
  );
}
