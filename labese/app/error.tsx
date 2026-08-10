"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto max-w-md px-6 py-24 text-center">
      <div className="mx-auto h-14 w-14 rounded-full bg-sand/15 flex items-center justify-center mb-6">
        <AlertTriangle size={26} className="text-sand-dark" aria-hidden="true" />
      </div>
      <h1 className="font-display text-2xl font-medium text-navy">
        This page hit a problem
      </h1>
      <p className="mt-3 text-ink/75 leading-relaxed">
        Please try again. If the problem continues, contact LABESE and we
        will look into it.
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Button onClick={reset} type="button">
          Try Again
        </Button>
        <Button href="/contact" variant="secondary">
          Contact LABESE
        </Button>
      </div>
    </section>
  );
}
