import { AlertTriangle } from "lucide-react";
import { site } from "@/data/site";

export default function HealthDisclaimerBanner() {
  return (
    <div className="rounded-xl border border-sand/50 bg-sand/10 px-6 py-5 flex gap-4">
      <AlertTriangle
        size={22}
        className="text-sand-dark shrink-0 mt-0.5"
        aria-hidden="true"
      />
      <div>
        <p className="text-sm font-semibold text-navy mb-1">Health and emergency disclaimer</p>
        <p className="text-sm text-ink/80 leading-relaxed">{site.healthDisclaimer}</p>
      </div>
    </div>
  );
}
