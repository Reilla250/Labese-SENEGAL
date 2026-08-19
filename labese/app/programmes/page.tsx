import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProgrammeCard from "@/components/sections/ProgrammeCard";
import HealthDisclaimerBanner from "@/components/sections/HealthDisclaimerBanner";
import CTASection from "@/components/sections/CTASection";
import { getProgrammesData } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "LABESE's nine programme areas span health awareness, rights and advocacy, HIV/TB/STI and SRHR, mental health, maternal and child health, disease prevention, climate and school health, safeguarding, and community referral.",
  alternates: { canonical: "/programmes" },
};

export default async function ProgrammesPage() {
  const { programmes, programmeIntro } = await getProgrammesData();

  return (
    <>
      <PageHeader
        eyebrow="Programmes"
        title="Nine programme areas, one community-centred approach"
        description="From health awareness to referral and health-system strengthening, every programme keeps dignity, safety and evidence at the centre."
      />
      <Breadcrumb current="Programmes" />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-xl bg-white border border-line px-6 py-5 text-sm text-ink/75 leading-relaxed max-w-4xl">
          {programmeIntro}
        </div>
      </section>

      {/* Quick jump nav */}
      <nav aria-label="Jump to programme" className="mx-auto max-w-7xl px-6 pb-10">
        <ul className="flex flex-wrap gap-2">
          {programmes.map((p) => (
            <li key={p.slug}>
              <a
                href={`#${p.slug}`}
                className="inline-block rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-navy hover:border-forest hover:text-forest"
              >
                {String(p.number).padStart(2, "0")} &middot; {p.shortTitle}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-16 grid md:grid-cols-2 gap-6">
        {programmes.map((p) => (
          <ProgrammeCard key={p.slug} programme={p} />
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <HealthDisclaimerBanner />
      </section>

      <CTASection
        headline="Partner with LABESE to expand community health impact."
        text="Learn how your support, funding or technical collaboration can extend health awareness, dignity and action across Senegal."
        buttons={[
          { label: "Partner with LABESE", href: "/get-involved" },
          { label: "Contact Us", href: "/contact", variant: "secondary" },
        ]}
      />
    </>
  );
}
