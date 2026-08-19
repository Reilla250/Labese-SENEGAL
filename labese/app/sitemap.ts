import type { MetadataRoute } from "next";
import { getSiteData } from "@/lib/db";

const routes = [
  "",
  "about",
  "programmes",
  "impact",
  "advocacy",
  "partners",
  "get-involved",
  "contact",
  "privacy",
  "safeguarding",
  "disclaimer",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteData();
  const now = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route ? `/${route}` : ""}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
