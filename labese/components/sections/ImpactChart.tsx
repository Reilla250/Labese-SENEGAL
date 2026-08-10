import type { ImpactChartData } from "@/data/impact";

export default function ImpactChart({ chart }: { chart: ImpactChartData }) {
  const { title, before, after, unit } = chart;
  const improved = after > before;

  return (
    <div className="rounded-xl border border-line bg-white p-6">
      <h3 className="text-base font-semibold text-navy leading-snug">{title}</h3>
      <div className="mt-5 space-y-3">
        <BarRow label="Before" value={before} unit={unit} tone="before" />
        <BarRow label="After" value={after} unit={unit} tone="after" />
      </div>
      <p className="mt-4 text-sm font-medium text-forest-dark">
        {improved ? "Increased" : "Decreased"} by {Math.abs(after - before)}{unit} between baseline and endline.
      </p>
    </div>
  );
}

function BarRow({
  label,
  value,
  unit,
  tone,
}: {
  label: string;
  value: number;
  unit: string;
  tone: "before" | "after";
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-ink/70 mb-1">
        <span className="font-medium uppercase tracking-wide">{label}</span>
        <span className="font-mono-stat font-semibold text-navy">
          {value}
          {unit}
        </span>
      </div>
      <div className="h-3 w-full rounded-full bg-cream overflow-hidden" role="presentation">
        <div
          className={`h-full rounded-full ${tone === "before" ? "bg-navy-light/60" : "bg-forest"}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
