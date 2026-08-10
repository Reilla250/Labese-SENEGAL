import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-mono-stat text-xs uppercase tracking-[0.18em] mb-3",
            tone === "dark" ? "text-forest" : "text-sand"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl leading-tight font-medium",
          tone === "dark" ? "text-navy" : "text-white"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            tone === "dark" ? "text-ink/75" : "text-white/80"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
