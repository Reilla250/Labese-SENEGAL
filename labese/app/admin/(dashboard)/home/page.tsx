import { getHomeData } from "@/lib/db";
import HomeForm from "./HomeForm";

export default async function AdminHomePage() {
  const data = await getHomeData();
  return (
    <div className="space-y-6">
      <div>
        <span className="font-mono-stat text-xs font-semibold uppercase tracking-wider text-forest">Admin › Home</span>
        <h1 className="mt-1 font-display text-4xl font-semibold text-navy">Homepage Content</h1>
        <p className="mt-2 text-sm text-ink/70">Edit the hero text, about block, and gallery image URLs shown on the homepage.</p>
      </div>
      <HomeForm initialData={data} />
    </div>
  );
}
