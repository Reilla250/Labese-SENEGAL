import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { footerExplore, footerInvolved } from "@/data/site";

interface FooterProps {
  site: {
    name: string;
    tagline: string;
    location: string;
    email: string;
    phone: string;
    phoneHref: string;
    fullName: string;
  };
}

export default function Footer({ site }: FooterProps) {
  return (
    <footer className="bg-navy text-white">
      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand block */}
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-2xl font-semibold">{site.name}</p>
          <p className="mt-2 text-sand text-sm font-mono-stat uppercase tracking-wide">
            {site.tagline}
          </p>
          <p className="mt-4 flex items-start gap-2 text-white/75 text-sm">
            <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            {site.location}
          </p>
        </div>

        {/* Explore nav */}
        <nav aria-label="Explore">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">
            Explore
          </h3>
          <ul className="space-y-2.5">
            {footerExplore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/85 hover:text-sand text-sm transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Get Involved nav */}
        <nav aria-label="Get Involved">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">
            Get Involved
          </h3>
          <ul className="space-y-2.5">
            {footerInvolved.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/85 hover:text-sand text-sm transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">
            Contact
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-white/85 hover:text-sand transition-colors break-all"
              >
                <Mail size={16} className="shrink-0" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phoneHref}`}
                className="flex items-center gap-2 text-white/85 hover:text-sand transition-colors"
              >
                <Phone size={16} className="shrink-0" aria-hidden="true" />
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-white/50">
          {/* Left: copyright */}
          <p className="shrink-0">
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>

          {/* Right: policy links + admin */}
          <nav
            aria-label="Legal and admin links"
            className="flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            <Link href="/privacy" className="hover:text-sand transition-colors">
              Privacy
            </Link>
            <span aria-hidden="true" className="opacity-30">|</span>
            <Link href="/safeguarding" className="hover:text-sand transition-colors">
              Safeguarding
            </Link>
            <span aria-hidden="true" className="opacity-30">|</span>
            <Link href="/disclaimer" className="hover:text-sand transition-colors">
              Health Disclaimer
            </Link>
            <span aria-hidden="true" className="opacity-30">|</span>
            <Link href="/contact" className="hover:text-sand transition-colors">
              Contact
            </Link>
            <span aria-hidden="true" className="opacity-30">|</span>
            {/* Admin link — subtle but accessible */}
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-white/30 hover:text-forest transition-colors"
              title="Admin Login"
            >
              <ShieldCheck size={12} aria-hidden="true" />
              <span>Admin</span>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

