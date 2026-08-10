import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import { getAboutData, getAdvocacyData } from "@/lib/db";
import { iconMap } from "@/lib/icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "LABESE is a youth-led, community-based organisation established in Dakar in 2016. Learn about our mission, vision, values and how we work.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const aboutData = await getAboutData();
  const advocacyData = await getAdvocacyData();

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="No young person should lose education, confidence, care or hope because of stigma."
        description="That belief is where LABESE began — and it still shapes how we work today."
      />
      <Breadcrumb current="About Us" />

      {/* OUR STORY */}
      <section className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-[1fr_1fr] gap-14 items-start">
        <div>
          <SectionHeading eyebrow="Our Story" title={aboutData.storyTitle} />
          <div className="relative mt-8 aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={aboutData.storyImage}
              alt={aboutData.storyImageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="space-y-4 text-ink/80 leading-relaxed pt-2 lg:pt-16">
          <p>{aboutData.storyParagraph1}</p>
          <p>{aboutData.storyParagraph2}</p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-forest-light p-8">
            <h2 className="font-display text-2xl font-medium text-navy">Our Mission</h2>
            <p className="mt-3 text-ink/80 leading-relaxed">
              {aboutData.mission}
            </p>
          </div>
          <div className="rounded-2xl bg-navy text-white p-8">
            <h2 className="font-display text-2xl font-medium">Our Vision</h2>
            <p className="mt-3 text-white/85 leading-relaxed">
              {aboutData.vision}
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow="Our Values" title="What guides our work" align="center" className="mx-auto" />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advocacyData.values.map((v) => (
            <div key={v.title} className="card-hover rounded-2xl border border-line bg-white p-6">
              <h3 className="font-display text-lg font-medium text-navy">{v.title}</h3>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading eyebrow="Who We Serve" title="Programmes that prioritise those facing the greatest barriers" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aboutData.whoWeServe.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || iconMap["Users2"];
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-xl bg-white border border-line px-5 py-4">
                  <Icon size={20} className="text-forest-dark shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium text-navy">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <SectionHeading eyebrow="How We Work" title="Our process, from community to service" />
        <ol className="mt-10 space-y-6">
          {advocacyData.howWeWork.map((step, i) => (
            <li key={step} className="flex gap-5">
              <span className="font-mono-stat text-sm text-white bg-forest rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <p className="text-ink/80 leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <CTASection
        headline="Get to know our full programme framework."
        text="See how our story translates into practical, community-led health work across Dakar."
        buttons={[
          { label: "Explore Our Programmes", href: "/programmes" },
          { label: "Contact Us", href: "/contact", variant: "secondary" },
        ]}
      />
    </>
  );
}
