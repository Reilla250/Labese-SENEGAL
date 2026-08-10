import { getProgrammesData } from "@/lib/db";
import ProgrammesForm from "./ProgrammesForm";

export default async function ProgrammesPage() {
  // Note: The admin form uses a simplified AdminProgramme interface
  // that doesn't match the full Programme type from data/programmes.ts
  // For now, we'll start with empty data until the form is connected to the right data source
  const initialProgrammes: Array<{
    id: string;
    icon: string;
    title: string;
    headline: string;
    body: string;
    colour: string;
    tags: string[];
  }> = [];

  return (
    <div className="space-y-6">
      <div>
        <span className="font-mono-stat text-xs font-semibold uppercase tracking-wider text-forest">
          Admin › Programmes
        </span>
        <h1 className="mt-1 font-display text-4xl font-semibold text-navy">
          Manage Programmes
        </h1>
        <p className="mt-2 text-sm text-ink/70">
          Add, edit, reorder, or remove service programme areas displayed on the Programmes page.
        </p>
      </div>
      <ProgrammesForm initialProgrammes={initialProgrammes} />
    </div>
  );
}
