import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import { getAdvocacyData } from "@/lib/db";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Advocacy",
  description:
    "LABESE uses community experience, anonymised evidence and constructive dialogue to advocate for stigma-free, confidential and inclusive health services in Senegal.",
  alternates: { canonical: "/advocacy" },
};

export default async function AdvocacyPage() {
  const { advocacyPriorities, howWeAdvocate } = await getAdvocacyData();

  return (
    <>
      <PageHeader
        eyebrow="Advocacy"
        title="Our Advocacy"
        description="LABESE believes that good health requires both services and systems that respect people. We use community experience, anonymised evidence and constructive dialogue to promote change."
      />
      <Breadcrumb current="Advocacy" />

      {/* PRIORITIES */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow="Advocacy Priorities" title="What we push for" />
        <ul className="mt-10 grid sm:grid-cols-2 gap-4">
          {advocacyPriorities.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl bg-white border border-line px-5 py-4">
              <CheckCircle size={20} className="text-forest shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm text-ink/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* HOW WE ADVOCATE */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <SectionHeading eyebrow="How We Advocate" title="Our process" tone="light" />
          <ol className="mt-10 space-y-5">
            {howWeAdvocate.map((step, i) => (
              <li key={step.title} className="flex gap-5 items-start">
                <span className="font-mono-stat text-sm bg-sand text-navy rounded-full h-8 w-8 flex items-center justify-center shrink-0 font-semibold">
                  {i + 1}
                </span>
                <p className="text-white/85 leading-relaxed pt-1">{step.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        headline="Bring community evidence into your decisions."
        text="LABESE welcomes dialogue with schools, health providers, local authorities and other decision-makers."
        buttons={[
          { label: "Partner with Us", href: "/get-involved" },
          { label: "Contact LABESE", href: "/contact", variant: "secondary" },
        ]}
      />
    </>
  );
}
