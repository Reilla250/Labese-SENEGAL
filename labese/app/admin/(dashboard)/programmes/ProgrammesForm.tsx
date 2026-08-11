"use client";

import { useState } from "react";
import { saveProgrammesAction } from "@/app/actions/admin";
import type { Programme } from "@/data/programmes";
import Button from "@/components/ui/Button";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface ProgrammesFormProps {
  initialProgrammes: Programme[];
  initialProgrammeIntro: string;
}

const iconOptions: Programme["icon"][] = [
  "megaphone",
  "scale",
  "heart-pulse",
  "brain",
  "baby",
  "shield-plus",
  "leaf",
  "hand-heart",
  "route",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProgrammesForm({
  initialProgrammes,
  initialProgrammeIntro,
}: ProgrammesFormProps) {
  const [programmes, setProgrammes] = useState<Programme[]>(initialProgrammes);
  const [programmeIntro, setProgrammeIntro] = useState(initialProgrammeIntro);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = <K extends keyof Programme>(idx: number, field: K, value: Programme[K]) => {
    setProgrammes((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const handleActivitiesChange = (idx: number, value: string) => {
    handleChange(
      idx,
      "activities",
      value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    );
  };

  const addProgramme = () => {
    const number = programmes.length + 1;
    setProgrammes((prev) => [
      ...prev,
      {
        number,
        slug: `programme-${Date.now()}`,
        title: "",
        shortTitle: "",
        description: "",
        activities: [],
        advocacyFocus: "",
        icon: "megaphone",
      },
    ]);
  };

  const removeProgramme = async (idx: number) => {
    const previousProgrammes = programmes;
    const nextProgrammes = previousProgrammes
      .filter((_, i) => i !== idx)
      .map((programme, i) => ({ ...programme, number: i + 1 }));

    setProgrammes(nextProgrammes);
    setLoading(true);
    setMessage(null);

    try {
      const res = await saveProgrammesAction({
        programmes: nextProgrammes,
        programmeIntro,
      });
      if (res.success) {
        setMessage({ type: "success", text: "Programme removed and saved." });
      } else {
        setProgrammes(previousProgrammes);
        setMessage({ type: "error", text: res.error || "Failed to save programmes." });
      }
    } catch (error) {
      setProgrammes(previousProgrammes);
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred while saving.",
      });
    } finally {
      setLoading(false);
    }
  };

  const move = (idx: number, dir: -1 | 1) => {
    setProgrammes((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next.map((programme, i) => ({ ...programme, number: i + 1 }));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await saveProgrammesAction({ programmes, programmeIntro });
      if (res.success) {
        setMessage({ type: "success", text: "Programmes saved successfully!" });
      } else {
        setMessage({ type: "error", text: res.error || "Failed to save programmes." });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred while saving.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "mt-1.5 block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest";

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

      <section className="bg-white border border-line rounded-2xl p-5 md:p-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
          Programmes Intro
        </label>
        <textarea
          value={programmeIntro}
          onChange={(e) => setProgrammeIntro(e.target.value)}
          rows={4}
          className={inputCls}
        />
      </section>

      {programmes.map((prog, idx) => (
        <div
          key={`${prog.slug}-${idx}`}
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
                aria-label="Move programme up"
              >
                <ChevronUp size={14} />
              </button>
              <button
                type="button"
                onClick={() => move(idx, 1)}
                disabled={idx === programmes.length - 1}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-line text-ink/50 hover:text-navy hover:border-navy/30 disabled:opacity-30 transition-colors"
                aria-label="Move programme down"
              >
                <ChevronDown size={14} />
              </button>
              <button
                type="button"
                onClick={() => void removeProgramme(idx)}
                disabled={loading}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-line text-rose-400 hover:text-rose-600 hover:border-rose-300 transition-colors"
                aria-label="Remove programme"
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
                onChange={(e) => {
                  const title = e.target.value;
                  handleChange(idx, "title", title);
                  if (!prog.slug || prog.slug.startsWith("programme-")) {
                    handleChange(idx, "slug", slugify(title));
                  }
                }}
                required
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Short Title
              </label>
              <input
                type="text"
                value={prog.shortTitle}
                onChange={(e) => handleChange(idx, "shortTitle", e.target.value)}
                required
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Slug
              </label>
              <input
                type="text"
                value={prog.slug}
                onChange={(e) => handleChange(idx, "slug", slugify(e.target.value))}
                required
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Icon
              </label>
              <select
                value={prog.icon}
                onChange={(e) => handleChange(idx, "icon", e.target.value as Programme["icon"])}
                className={inputCls}
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Description
              </label>
              <textarea
                value={prog.description}
                onChange={(e) => handleChange(idx, "description", e.target.value)}
                rows={4}
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Activities
              </label>
              <textarea
                value={prog.activities.join("\n")}
                onChange={(e) => handleActivitiesChange(idx, e.target.value)}
                rows={5}
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy">
                Advocacy Focus
              </label>
              <textarea
                value={prog.advocacyFocus}
                onChange={(e) => handleChange(idx, "advocacyFocus", e.target.value)}
                rows={3}
                className={inputCls}
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
