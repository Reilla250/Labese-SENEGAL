import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 pt-6">
      <ol className="flex items-center gap-1.5 text-xs text-ink/60">
        <li>
          <Link href="/" className="hover:text-forest">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight size={12} />
        </li>
        <li aria-current="page" className="text-navy font-medium">
          {current}
        </li>
      </ol>
    </nav>
  );
}
