import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import InitiativeCard from "@/components/sections/InitiativeCard";
import CTASection from "@/components/sections/CTASection";
import { getInitiativesData } from "@/lib/db";
import { AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Initiatives",
  description:
    "LABESE clearly separates documented results from proposed or under-review initiatives, including KOSI, MMHEI and School Shield 24.",
  alternates: { canonical: "/initiatives" },
};

export default async function InitiativesPage() {
  const initiatives = await getInitiativesData();

  return (
    <>
      <PageHeader
        eyebrow="Initiatives"
        title="Documented, proposed and under review — clearly labelled"
        description="LABESE clearly separates what has been implemented from what is proposed or awaiting funding decisions."
      />
      <Breadcrumb current="Initiatives" />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-xl border border-sand/50 bg-sand/10 px-6 py-5 flex gap-4 max-w-4xl">
          <AlertCircle size={22} className="text-sand-dark shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-ink/80 leading-relaxed">
            Each initiative below carries a status badge. Proposed initiatives
            are not yet completed projects, and proposed reach figures have
            not yet been achieved. Please read the status before the
            description.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 space-y-8">
        {initiatives.map((initiative) => (
          <InitiativeCard key={initiative.slug} initiative={initiative} />
        ))}
      </section>

      <CTASection
        headline="Help move a proposed initiative into implementation."
        text="Funding, technical partnership and referral networks help LABESE scale tested approaches responsibly."
        buttons={[
          { label: "Support a Programme", href: "/get-involved" },
          { label: "See Documented Impact", href: "/impact", variant: "secondary" },
        ]}
      />
    </>
  );
}
