"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { AlertOctagon } from "lucide-react";

export default function GlobalError({
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
    <html lang="en">
      <body className="bg-cream text-ink min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center py-20">
          <div className="mx-auto h-14 w-14 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <AlertOctagon size={26} className="text-red-600" aria-hidden="true" />
          </div>
          <h1 className="font-display text-2xl font-medium text-navy">
            Something went wrong
          </h1>
          <p className="mt-3 text-ink/75 leading-relaxed">
            We couldn&apos;t load this page. Please try again, or return to the
            homepage.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <Button onClick={reset} type="button">
              Try Again
            </Button>
            <Button href="/" variant="secondary">
              Return Home
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
