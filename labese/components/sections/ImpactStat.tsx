export default function ImpactStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-sand pl-5 py-1">
      <p className="font-mono-stat text-4xl sm:text-5xl font-semibold text-white">
        {value}
      </p>
      <p className="mt-2 text-sm text-white/75 leading-snug max-w-[22ch]">{label}</p>
    </div>
  );
}
