import type { Metadata } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/600.css";
import "@fontsource/public-sans/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteData } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} | ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description:
      "LABESE is a youth-led community-based organisation in Dakar, Senegal working on health education, stigma reduction, advocacy, psychosocial support, referral and community-led health solutions.",
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${site.name} | ${site.tagline}`,
      description:
        "LABESE is a youth-led community-based organisation in Dakar, Senegal working on health education, stigma reduction, advocacy, psychosocial support, referral and community-led health solutions.",
      url: site.url,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} | ${site.tagline}`,
      description:
        "LABESE is a youth-led community-based organisation in Dakar, Senegal working on health education, stigma reduction, advocacy, psychosocial support and referral.",
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSiteData();
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.fullName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    slogan: site.tagline,
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dakar",
      addressCountry: "SN",
    },
  };

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header site={site} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer site={site} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
