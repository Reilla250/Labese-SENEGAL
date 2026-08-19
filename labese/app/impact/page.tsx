import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionHeading from "@/components/ui/SectionHeading";
import ImpactChart from "@/components/sections/ImpactChart";
import CTASection from "@/components/sections/CTASection";
import { getImpactData } from "@/lib/db";
import { CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "LABESE publishes verified results, including reach figures from the KOSI programme and mental-health outcomes from the MMHEI proof of concept.",
  alternates: { canonical: "/impact" },
};

export default async function ImpactPage() {
  const { impactPageStats, impactCharts, impactChartsFootnote } = await getImpactData();

  return (
    <>
      <PageHeader
        eyebrow="Impact"
        title="Our Impact"
        description="We publish verified results and use community feedback to improve our work."
      />
      <Breadcrumb current="Impact" />

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {impactPageStats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-white p-6">
              <p className="font-mono-stat text-4xl font-semibold text-forest-dark">{s.value}</p>
              <p className="mt-2 text-sm text-ink/75 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHARTS */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="MMHEI Proof of Concept"
            title="Mental health knowledge, stigma and help-seeking, before and after"
            description="Results are shown with exact figures so no one needs to rely only on colour to interpret them."
          />
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {impactCharts.map((chart) => (
              <ImpactChart key={chart.title} chart={chart} />
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3 rounded-xl bg-forest-light px-5 py-4 max-w-xl">
            <CheckCircle2 size={20} className="text-forest-dark shrink-0" aria-hidden="true" />
            <p className="text-sm text-navy font-medium">{impactChartsFootnote}</p>
          </div>
        </div>
      </section>

      <CTASection
        headline="Help us reach more schools and communities."
        text="Partner with LABESE to expand programmes that are already showing measurable results."
        buttons={[
          { label: "Partner with Us to Expand the Impact", href: "/get-involved" },
          { label: "Contact Us", href: "/contact", variant: "secondary" },
        ]}
      />
    </>
  );
}
