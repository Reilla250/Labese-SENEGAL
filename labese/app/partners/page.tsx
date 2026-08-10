import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import { whoWeWorkWith, waysToPartner } from "@/data/advocacy";
import { site } from "@/data/site";
import { Handshake, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "LABESE welcomes partnerships that combine community trust with technical quality and sustainable services in Dakar, Senegal.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Partnerships"
        description="LABESE welcomes partnerships that combine community trust with technical quality and sustainable services."
      />
      <Breadcrumb current="Partners" />

      {/* WHO WE WORK WITH */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow="Who We Work With" title="Our partnership community" />
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whoWeWorkWith.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl bg-white border border-line px-5 py-4">
              <Handshake size={20} className="text-forest-dark shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm text-ink/80 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* WAYS TO PARTNER */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading eyebrow="Ways to Partner" title="Areas where partners add the most value" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {waysToPartner.map((w) => (
              <div key={w.title} className="card-hover rounded-2xl border border-line bg-cream p-6">
                <h3 className="font-display text-lg font-medium text-navy">{w.title}</h3>
                <p className="mt-2 text-sm text-ink/75 leading-relaxed">{w.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-navy text-white px-8 py-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
            <div>
              <p className="font-display text-xl font-medium">Ready to talk partnership?</p>
              <p className="text-white/75 mt-1 text-sm">We respond to enquiries as soon as possible.</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sand hover:underline">
                <Mail size={16} aria-hidden="true" /> {site.email}
              </a>
              <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2 text-sand hover:underline">
                <Phone size={16} aria-hidden="true" /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Every partnership starts with a conversation."
        text="Tell us about your organisation, and we'll follow up about how we might work together."
        buttons={[{ label: "Contact LABESE", href: "/contact" }]}
      />
    </>
  );
}
