"use client";

import { useState } from "react";
import { saveProgrammesAction } from "@/app/actions/admin";
import Button from "@/components/ui/Button";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface Programme {
  id: string;
  icon: string;
  title: string;
  headline: string;
  body: string;
  colour: string;
  tags: string[];
}

interface ProgrammesFormProps {
  initialProgrammes: Programme[];
}

export default function ProgrammesForm({ initialProgrammes }: ProgrammesFormProps) {
  const [programmes, setProgrammes] = useState<Programme[]>(initialProgrammes);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (idx: number, field: keyof Programme, value: string | string[]) => {
    setProgrammes((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const handleTagChange = (idx: number, value: string) => {
    const tags = value.split(",").map((t) => t.trim()).filter(Boolean);
    handleChange(idx, "tags", tags);
  };

  const addProgramme = () => {
    setProgrammes((prev) => [
      ...prev,
      {
        id: `prog-${Date.now()}`,
        icon: "heart",
        title: "",
        headline: "",
        body: "",
        colour: "forest",
        tags: [],
      },
    ]);
  };

  const removeProgramme = (idx: number) => {
    setProgrammes((prev) => prev.filter((_, i) => i !== idx));
  };

  const move = (idx: number, dir: -1 | 1) => {
    setProgrammes((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await saveProgrammesAction({ programmes });
      if (res.success) {
        setMessage({ type: "success", text: "Programmes saved successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to save programmes." });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div
          className={`rounded-xl px-5 py-4 border text-sm ${
            message.type === "success"
              ? "bg-forest-light/60 border-forest/20 text-navy"
              : "bg-sand/10 border-sand-dark/25 text-sand-dark"
          }`}
        >
          <p className="font-semibold">{message.type === "success" ? "Success" : "Error"}</p>
          <p className="mt-0.5">{message.text}</p>
        </div>
      )}

      {programmes.map((prog, idx) => (
        <div
          key={prog.id}
          className="bg-white border border-line rounded-2xl p-5 md:p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-stat font-semibold uppercase tracking-wider text-ink/50">
              Programme {idx + 1}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => move(idx, -1)}
                disabled={idx === 0}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-line text-ink/50 hover:text-navy hover:border-navy/30 disabled:opacity-30 transition-colors"
              >
                <ChevronUp size={14} />
              </button>
              <button
                type="button"
                onClick={() => move(idx, 1)}
                disabled={idx === programmes.length - 1}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-line text-ink/50 hover:text-navy hover:border-navy/30 disabled:opacity-30 transition-colors"
              >
                <ChevronDown size={14} />
              </button>
              <button
                type="button"
                onClick={() => removeProgramme(idx)}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-line text-rose-400 hover:text-rose-600 hover:border-rose-300 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Title
              </label>
              <input
                type="text"
                value={prog.title}
                onChange={(e) => handleChange(idx, "title", e.target.value)}
                required
                className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Icon (e.g. heart, shield)
              </label>
              <input
                type="text"
                value={prog.icon}
                onChange={(e) => handleChange(idx, "icon", e.target.value)}
                className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Headline
              </label>
              <input
                type="text"
                value={prog.headline}
                onChange={(e) => handleChange(idx, "headline", e.target.value)}
                className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Body Text
              </label>
              <textarea
                value={prog.body}
                onChange={(e) => handleChange(idx, "body", e.target.value)}
                rows={3}
                className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Colour (e.g. forest, amber)
              </label>
              <input
                type="text"
                value={prog.colour}
                onChange={(e) => handleChange(idx, "colour", e.target.value)}
                className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={prog.tags.join(", ")}
                onChange={(e) => handleTagChange(idx, e.target.value)}
                className="mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addProgramme}
        className="flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-dark transition-colors"
      >
        <Plus size={16} />
        Add Programme
      </button>

      <div className="pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save All Programmes"}
        </Button>
      </div>
    </form>
  );
}
