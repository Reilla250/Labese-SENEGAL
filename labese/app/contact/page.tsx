import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContactForm from "@/components/forms/ContactForm";
import { getSiteData } from "@/lib/db";
import { MapPin, Mail, Phone, Globe, FileBadge } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact La Belle Étoile du Sénégal (LABESE) in Dakar, Senegal for programme enquiries, partnership proposals or media questions.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const site = await getSiteData();

  const details = [
    { icon: MapPin, label: site.location },
    { icon: FileBadge, label: `Registration Number: ${site.registrationNumber}` },
    { icon: Mail, label: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: site.phone, href: `tel:${site.phoneHref}` },
    { icon: Globe, label: "www.labese.org", href: site.url },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch with LABESE"
        description="We welcome questions, partnership proposals, programme enquiries and invitations to collaborate."
      />
      <Breadcrumb current="Contact" />

      <section className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-[0.9fr_1.3fr] gap-12">
        <div>
          <h2 className="font-display text-2xl font-medium text-navy">
            {site.fullName}
          </h2>
          <ul className="mt-6 space-y-4">
            {details.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-ink/80">
                <span className="h-9 w-9 rounded-full bg-forest-light text-forest-dark flex items-center justify-center shrink-0">
                  <Icon size={16} aria-hidden="true" />
                </span>
                {href ? (
                  <a href={href} className="hover:text-forest font-medium">
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl bg-cream border border-line px-5 py-4 text-xs text-ink/65 leading-relaxed">
            We never ask for HIV status, mental-health diagnoses, or details
            of violence through this form. If your enquiry involves an urgent
            safety concern, please contact the nearest qualified service
            directly — see our{" "}
            <a href="/disclaimer" className="underline hover:text-forest">
              health and emergency disclaimer
            </a>
            .
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
