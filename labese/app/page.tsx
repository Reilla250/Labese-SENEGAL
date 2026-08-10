import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/sections/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";
import ImpactStat from "@/components/sections/ImpactStat";
import WeaveDivider from "@/components/ui/WeaveDivider";
import { iconMap } from "@/lib/icons";
import { getHomeData, getAdvocacyData, getProgrammesData, getImpactData, getSiteData } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();
  return {
    title: `${site.name} | ${site.tagline}`,
    description:
      "LABESE is a youth-led community-based organisation in Dakar, Senegal working on health education, stigma reduction, advocacy, psychosocial support, referral and community-led health solutions.",
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const homeData = await getHomeData();
  const advocacyData = await getAdvocacyData();
  const programmesData = await getProgrammesData();
  const impactData = await getImpactData();

  return (
    <>
      <Hero
        title={homeData.heroTitle}
        subtitle={`${homeData.heroSubtitle} • Est. 2016`}
        description={homeData.heroDescription}
      />

      {/* WHO WE ARE */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-start">
          <SectionHeading eyebrow="Who We Are" title={homeData.aboutTitle} />
          <div className="space-y-4 text-ink/80 leading-relaxed">
            <p>{homeData.aboutParagraph1}</p>
            <p>{homeData.aboutParagraph2}</p>
            <Button href="/about" variant="ghost" className="mt-2">
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading eyebrow="What We Do" title="Four ways we support communities" align="center" className="mx-auto" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {advocacyData.whatWeDo.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || iconMap["megaphone"];
              return (
                <div key={item.title} className="card-hover rounded-2xl bg-white border border-line p-6">
                  <div className="h-11 w-11 rounded-full bg-forest-light text-forest-dark flex items-center justify-center">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-medium text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink/75 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROGRAMME AREAS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Programme Areas"
            title="Nine areas of community health work"
            description="Our programme framework spans awareness, rights, disease-specific support, mental health, maternal and child health, prevention, climate, safeguarding and referral."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {programmesData.programmes.map((p) => (
              <a
                key={p.slug}
                href={`/programmes#${p.slug}`}
                className="flex items-start gap-3 rounded-xl border border-line bg-cream/60 px-4 py-4 hover:border-forest hover:bg-forest-light transition-colors"
              >
                <span className="font-mono-stat text-xs text-forest-dark mt-0.5">
                  {String(p.number).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-navy leading-snug">{p.title}</span>
              </a>
            ))}
          </div>
          <div className="mt-9">
            <Button href="/programmes">Explore Our Programmes</Button>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="bg-navy text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Our Documented Reach"
            title="Results we can stand behind"
            tone="light"
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactData.homeImpactStats.map((s) => (
              <ImpactStat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
          <div className="mt-12">
            <Button href="/impact" variant="on-dark">
              See Our Impact
            </Button>
          </div>
        </div>
        <WeaveDivider onDark />
      </section>

      {/* SUPPORTING IMAGE STRIP */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16 grid sm:grid-cols-3 gap-4">
          {homeData.images.map((img) => (
            <div key={img.src} className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <CTASection
        headline="Healthy communities are built through trusted information, dignity and collective action."
        text="Partner with LABESE to expand health awareness, advocacy, referral and community-led solutions in Senegal."
        buttons={[
          { label: "Partner with Us", href: "/get-involved" },
          { label: "Support a Programme", href: "/get-involved" },
          { label: "Contact LABESE", href: "/contact", variant: "secondary" },
        ]}
      />
    </>
  );
}
