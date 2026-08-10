import { getSiteData } from "@/lib/db";
import SiteForm from "./SiteForm";

export default async function SiteSettingsPage() {
  const site = await getSiteData();

  const initialData = {
    name: site.name,
    fullName: site.fullName,
    tagline: site.tagline,
    location: site.location,
    registrationNumber: site.registrationNumber,
    email: site.email,
    phone: site.phone,
    phoneHref: site.phoneHref,
    url: site.url,
    founded: site.founded,
    healthDisclaimer: site.healthDisclaimer ?? "",
    safeguardingStatement: site.safeguardingStatement ?? "",
    privacyStatement: site.privacyStatement ?? "",
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="font-mono-stat text-xs font-semibold uppercase tracking-wider text-forest">
          Admin › Site Settings
        </span>
        <h1 className="mt-1 font-display text-4xl font-semibold text-navy">
          Global Site Information
        </h1>
        <p className="mt-2 text-sm text-ink/70">
          Edits here update the site name, contact details, legal statements and other global metadata.
        </p>
      </div>
      <SiteForm initialData={initialData} />
    </div>
  );
}
