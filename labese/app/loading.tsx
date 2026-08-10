export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="h-9 w-9 rounded-full border-2 border-forest/25 border-t-forest animate-spin"
          aria-hidden="true"
        />
        <span className="text-sm text-ink/60">Loading…</span>
      </div>
    </div>
  );
}
