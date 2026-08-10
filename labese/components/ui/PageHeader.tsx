import WeaveDivider from "./WeaveDivider";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        {eyebrow && (
          <p className="font-mono-stat text-xs uppercase tracking-[0.18em] text-sand mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl font-medium leading-tight max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg text-white/80 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <WeaveDivider onDark />
    </header>
  );
}
