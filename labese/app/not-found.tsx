import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import WeaveDivider from "@/components/ui/WeaveDivider";
import { Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for may have moved or may no longer exist.",
};

export default function NotFound() {
  return (
    <section className="bg-navy text-white min-h-[70vh] flex flex-col">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center flex-1 flex flex-col items-center justify-center">
        <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center mb-6">
          <Compass size={26} className="text-sand" aria-hidden="true" />
        </div>
        <p className="font-mono-stat text-sand text-sm tracking-[0.2em] uppercase mb-3">404</p>
        <h1 className="font-display text-3xl sm:text-4xl font-medium">Page Not Found</h1>
        <p className="mt-4 text-white/80 max-w-md leading-relaxed">
          The page you are looking for may have moved or may no longer exist.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="on-dark">
            Return Home
          </Button>
          <Button href="/contact" variant="secondary" className="bg-transparent text-white border-white/30 hover:bg-white/10">
            Contact LABESE
          </Button>
        </div>
      </div>
      <WeaveDivider onDark />
    </section>
  );
}
