import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getSiteData } from "@/lib/db";
import { ShieldCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Safeguarding",
  description:
    "LABESE's commitment to the safety and dignity of children, adolescents and adults who take part in our work.",
  alternates: { canonical: "/safeguarding" },
};

export default async function SafeguardingPage() {
  const site = await getSiteData();
  return (
    <>
      <PageHeader eyebrow="Safeguarding" title="Safeguarding" />
      <Breadcrumb current="Safeguarding" />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-forest/30 bg-forest-light p-8 flex gap-4">
          <ShieldCheck size={24} className="text-forest-dark shrink-0 mt-1" aria-hidden="true" />
          <p className="text-navy leading-relaxed text-lg">{site.safeguardingStatement}</p>
        </div>

        <div className="mt-10 space-y-6 text-ink/80 leading-relaxed">
          <div>
            <h2 className="font-display text-xl font-medium text-navy mb-2">Consent and assent</h2>
            <p>
              Participation in LABESE activities is based on informed consent
              and, for children and adolescents, appropriate assent
              alongside caregiver or guardian consent where required. No one
              is pressured to take part or to disclose personal information.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-medium text-navy mb-2">
              Confidentiality and disclosure
            </h2>
            <p>
              No person is required to disclose HIV status, mental health
              experience, disability, violence or other sensitive
              information publicly. Personal information shared with LABESE
              is handled confidentially and shared only when authorised or
              necessary for safety.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-medium text-navy mb-2">
              Raising a concern
            </h2>
            <p>
              LABESE maintains child-safe feedback and complaint channels.
              If you have a safeguarding concern related to our work, please
              contact us using the details below.
            </p>
            <p className="mt-3 flex items-center gap-2">
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
