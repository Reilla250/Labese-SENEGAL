import Button from "@/components/ui/Button";
import WeaveDivider from "@/components/ui/WeaveDivider";

type CTAButton = { label: string; href: string; variant?: "primary" | "on-dark" | "secondary" | "ghost" };

type Props = {
  headline: string;
  text: string;
  buttons: CTAButton[];
};

export default function CTASection({ headline, text, buttons }: Props) {
  return (
    <section className="bg-forest-dark text-white">
      <WeaveDivider onDark />
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight">
          {headline}
        </h2>
        <p className="mt-4 text-white/85 text-lg leading-relaxed max-w-2xl mx-auto">
          {text}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {buttons.map((b) => (
            <Button key={b.label} href={b.href} variant={b.variant ?? "on-dark"}>
              {b.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
