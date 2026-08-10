import Link from "next/link";
import { getSiteData, getProgrammesData, getInitiativesData } from "@/lib/db";
import { getUploadedImagesAction } from "@/app/actions/admin";
import {
  Briefcase,
  TrendingUp,
  Image as ImageIcon,
  Settings,
  Home,
  FileText,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const site = await getSiteData();
  const { programmes } = await getProgrammesData();
  const initiatives = await getInitiativesData();
  const images = await getUploadedImagesAction();

  const cards = [
    {
      title: "Programmes",
      description: "Manage the core areas of service and advocacy.",
      count: programmes.length,
      icon: Briefcase,
      color: "bg-forest-light text-forest-dark border-forest/15",
      href: "/admin/programmes",
    },
    {
      title: "Initiatives",
      description: "Proposed and completed school-based projects.",
      count: initiatives.length,
      icon: TrendingUp,
      color: "bg-amber-50 text-amber-700 border-amber-500/10",
      href: "/admin/initiatives",
    },
    {
      title: "Media Uploads",
      description: "Photos and visual assets stored on the system.",
      count: images.length,
      icon: ImageIcon,
      color: "bg-navy-light/10 text-navy border-navy/10",
      href: "/admin/images",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="font-mono-stat text-xs font-semibold uppercase tracking-wider text-forest">
          System Overview
        </span>
        <h1 className="mt-1 font-display text-4xl font-semibold text-navy leading-none">
          Welcome back to the Dashboard
        </h1>
        <p className="mt-2 text-ink/75">
          You are currently managing <strong className="text-navy">{site.fullName}</strong>. Updates made here will show up immediately.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`rounded-2xl border p-6 flex flex-col bg-white hover:shadow-lg hover:shadow-navy/5 transition-all`}
            >
              <div className="flex items-center justify-between">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center ${card.color}`}>
                  <Icon size={20} />
                </div>
                <span className="font-mono-stat text-3xl font-bold text-navy">
                  {card.count}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy">{card.title}</h3>
              <p className="mt-1 text-sm text-ink/70 leading-relaxed flex-1">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-dark"
              >
                <span>Manage {card.title}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Quick Links section */}
      <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-navy">
          Quick Content Access
        </h2>
        <p className="mt-1 text-sm text-ink/70">
          Select a page or feature to customize details in the system.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/site"
            className="flex items-center justify-between p-4 rounded-xl border border-line bg-cream/10 hover:bg-cream/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings size={18} className="text-forest" />
              <span className="text-sm font-semibold text-navy">Site Settings</span>
            </div>
            <ArrowRight size={14} className="text-ink/40" />
          </Link>

          <Link
            href="/admin/home"
            className="flex items-center justify-between p-4 rounded-xl border border-line bg-cream/10 hover:bg-cream/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Home size={18} className="text-forest" />
              <span className="text-sm font-semibold text-navy">Homepage Content</span>
            </div>
            <ArrowRight size={14} className="text-ink/40" />
          </Link>

          <Link
            href="/admin/about"
            className="flex items-center justify-between p-4 rounded-xl border border-line bg-cream/10 hover:bg-cream/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-forest" />
              <span className="text-sm font-semibold text-navy">About Page Texts</span>
            </div>
            <ArrowRight size={14} className="text-ink/40" />
          </Link>
        </div>
      </div>
    </div>
  );
}
