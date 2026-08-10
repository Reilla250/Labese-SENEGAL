import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getSiteData } from "@/lib/db";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Health Disclaimer",
  description:
    "LABESE is not a hospital, clinic or emergency service. Read our health and emergency disclaimer.",
  alternates: { canonical: "/disclaimer" },
};

export default async function DisclaimerPage() {
  const site = await getSiteData();
  return (
    <>
      <PageHeader eyebrow="Health Disclaimer" title="Health and Emergency Disclaimer" />
      <Breadcrumb current="Health Disclaimer" />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-sand/50 bg-sand/10 p-8 flex gap-4">
          <AlertTriangle size={24} className="text-sand-dark shrink-0 mt-1" aria-hidden="true" />
          <p className="text-navy leading-relaxed text-lg">{site.healthDisclaimer}</p>
        </div>

        <div className="mt-10 space-y-4 text-ink/80 leading-relaxed">
          <p>
            LABESE&apos;s role is education, advocacy, non-clinical community
            support and referral. Where a programme involves a health topic,
            it is designed to help people understand information, recognise
            warning signs, and find their way to appropriate services — not
            to replace the judgement of a licensed health professional.
          </p>
          <p>
            If you or someone you know needs urgent care, please go to the
            nearest qualified health facility or contact the appropriate
            emergency or protection service in your area without delay.
          </p>
        </div>
      </section>
    </>
  );
}
