import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, logout } from "@/lib/auth";
import {
  LayoutDashboard,
  Settings,
  Home,
  FileText,
  Briefcase,
  TrendingUp,
  Scale,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Mail,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const handleLogout = async () => {
    "use server";
    await logout();
    redirect("/admin/login");
  };

  const navLinks = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/site", label: "Site Info", icon: Settings },
    { href: "/admin/home", label: "Home Page", icon: Home },
    { href: "/admin/about", label: "About Page", icon: FileText },
    { href: "/admin/programmes", label: "Programmes", icon: Briefcase },
    { href: "/admin/initiatives", label: "Initiatives", icon: TrendingUp },
    { href: "/admin/impact", label: "Impact Metrics", icon: TrendingUp },
    { href: "/admin/advocacy", label: "Advocacy Lists", icon: Scale },
    { href: "/admin/images", label: "Image Library", icon: ImageIcon },
  ];

  return (
    <div className="flex min-h-screen bg-cream/30 text-ink">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-navy text-white shrink-0 border-r border-line/10">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex flex-col leading-tight group">
            <span className="font-display text-xl font-bold tracking-wide">
              LABESE
            </span>
            <span className="text-[10px] text-forest font-mono-stat uppercase tracking-wider mt-1">
              Admin Platform
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                <Icon size={18} className="shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 flex flex-col gap-2">
          <Link
            href="https://mail.larksuite.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Mail size={14} />
              Business Email
            </span>
            <ExternalLink size={12} />
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold text-sand bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink size={14} />
          </Link>
          <form action={handleLogout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content container */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-navy text-white px-6 py-4 flex items-center justify-between border-b border-white/5">
          <span className="font-display text-lg font-bold tracking-wide">
            LABESE Admin
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="https://mail.larksuite.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 hover:text-sky-100"
              title="Business Email"
            >
              <Mail size={18} />
            </Link>
            <Link href="/" target="_blank" className="text-sand">
              <ExternalLink size={18} />
            </Link>
            <form action={handleLogout}>
              <button type="submit" className="text-rose-300 hover:text-rose-100">
                <LogOut size={18} />
              </button>
            </form>
          </div>
        </header>

        {/* Mobile Sub navigation */}
        <div className="md:hidden flex overflow-x-auto bg-white border-b border-line px-4 py-2 gap-1.5 scrollbar-thin scrollbar-thumb-line scrollbar-track-cream">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-navy/80 hover:text-forest hover:bg-forest-light shrink-0 transition-colors"
              >
                <Icon size={13} />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
