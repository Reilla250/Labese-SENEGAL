import { getAboutData } from "@/lib/db";
import AboutForm from "./AboutForm";

export default async function AdminAboutPage() {
  const data = await getAboutData();
  return (
    <div className="space-y-6">
      <div>
        <span className="font-mono-stat text-xs font-semibold uppercase tracking-wider text-forest">Admin › About</span>
        <h1 className="mt-1 font-display text-4xl font-semibold text-navy">About Page Content</h1>
        <p className="mt-2 text-sm text-ink/70">Edit the story, mission, vision, and who-we-serve entries shown on the About page.</p>
      </div>
      <AboutForm initialData={data} />
    </div>
  );
}
