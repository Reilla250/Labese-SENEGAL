import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getSiteData } from "@/lib/db";
import { Lock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How LABESE collects, uses and protects personal information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyPage() {
  const site = await getSiteData();
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy" />
      <Breadcrumb current="Privacy" />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-line bg-white p-8 flex gap-4">
          <Lock size={22} className="text-forest-dark shrink-0 mt-1" aria-hidden="true" />
          <p className="text-ink/80 leading-relaxed">{site.privacyStatement}</p>
        </div>

        <div className="mt-10 space-y-6 text-ink/80 leading-relaxed">
          <div>
            <h2 className="font-display text-xl font-medium text-navy mb-2">
              What we collect through this website
            </h2>
            <p>
              Our contact form asks for your full name, email address, and a
              message describing your enquiry. Organisation and telephone
              number are optional. We ask you to confirm consent before any
              information is submitted. We do not ask for sensitive health
              information, such as HIV status, mental-health diagnoses, or
              details of violence, through this form.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-medium text-navy mb-2">
              Why we collect it
            </h2>
            <p>
              Information submitted through the contact form is used to
              respond to your enquiry, consider partnership proposals, or
              support programme coordination. Information collected through
              our programmes may also be used to monitor results or support
              safe referral, as described to participants at the point of
              collection.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-medium text-navy mb-2">
              How we protect it
            </h2>
            <p>
              Personal information is handled confidentially, shared only
              when authorised or required for safety, and stored for no
              longer than necessary. We do not publish or expose contact-form
              submissions.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-medium text-navy mb-2">
              Questions about this page
            </h2>
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-forest-dark" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="text-forest hover:underline font-medium">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
