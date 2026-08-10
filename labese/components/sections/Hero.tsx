import Image from "next/image";
import Button from "@/components/ui/Button";
import WeaveDivider from "@/components/ui/WeaveDivider";

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function Hero({
  title,
  subtitle = "Dakar, Senegal • Est. 2016",
  description,
  imageSrc = "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1200&auto=format&fit=crop",
  imageAlt = "A community health education session with young people gathered together in discussion, representing the kind of peer-led dialogue LABESE facilitates.",
}: HeroProps) {
  return (
    <section className="relative bg-navy text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <p className="font-mono-stat text-xs uppercase tracking-[0.2em] text-sand mb-5">
            {subtitle}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] font-medium">
            {title}
          </h1>
          <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-xl">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/programmes" variant="on-dark">
              Explore Our Programmes
            </Button>
            <Button href="/get-involved" variant="secondary" className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/60">
              Partner with LABESE
            </Button>
            <Button href="/contact" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>

        <div className="relative animate-fade-in-up">
          <div className="relative aspect-[4/5] sm:aspect-[5/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden sm:block bg-sand text-navy rounded-xl px-5 py-4 shadow-xl max-w-[220px]">
            <p className="font-mono-stat text-2xl font-semibold">687</p>
            <p className="text-xs leading-snug mt-1">
              learners &amp; out-of-school adolescents reached with stigma-free
              HIV education
            </p>
          </div>
        </div>
      </div>
      <WeaveDivider onDark />
    </section>
  );
}
