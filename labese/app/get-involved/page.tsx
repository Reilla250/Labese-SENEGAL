import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import { Handshake, HeartHandshake, GraduationCap, CalendarCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Partner with LABESE, support a programme, share technical expertise, or invite our team to a school, forum or partnership meeting.",
  alternates: { canonical: "/get-involved" },
};

const ways = [
  {
    icon: Handshake,
    title: "Partner with LABESE",
    description:
      "Work with us to design and deliver community health, awareness, advocacy, referral or learning activities.",
    cta: "Partner With Us",
  },
  {
    icon: HeartHandshake,
    title: "Support a Programme",
    description:
      "Financial and in-kind support can help LABESE reach more schools, families, young people and communities with trusted information and practical support.",
    cta: "Support a Programme",
  },
  {
    icon: GraduationCap,
    title: "Share Technical Expertise",
    description:
      "Health, education, safeguarding, disability, climate, communications, research and monitoring specialists can strengthen programme quality and sustainability.",
    cta: "Share Your Expertise",
  },
  {
    icon: CalendarCheck,
    title: "Invite LABESE",
    description:
      "Invite our team to a school, community forum, health campaign, training, policy dialogue or partnership meeting.",
    cta: "Contact LABESE",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get Involved"
        title="Four ways to work with LABESE"
        description="Whichever path fits your organisation, every enquiry reaches our team directly."
      />
      <Breadcrumb current="Get Involved" />

      <section className="mx-auto max-w-7xl px-6 py-16 grid sm:grid-cols-2 gap-6">
        {ways.map(({ icon: Icon, title, description, cta }) => (
          <div key={title} className="card-hover rounded-2xl border border-line bg-white p-8 flex flex-col">
            <div className="h-12 w-12 rounded-full bg-forest-light text-forest-dark flex items-center justify-center">
              <Icon size={22} aria-hidden="true" />
            </div>
            <h2 className="mt-5 font-display text-xl font-medium text-navy">{title}</h2>
            <p className="mt-3 text-sm text-ink/75 leading-relaxed flex-1">{description}</p>
            <Button href="/contact" className="mt-6 self-start" variant="ghost">
              {cta}
            </Button>
          </div>
        ))}
      </section>
    </>
  );
}
