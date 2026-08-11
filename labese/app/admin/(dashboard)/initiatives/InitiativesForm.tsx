"use client";

import { useState } from "react";
import { saveInitiativesAction } from "@/app/actions/admin";
import type { Initiative, InitiativeStat } from "@/data/initiatives";
import Button from "@/components/ui/Button";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const statusTones: Initiative["statusTone"][] = ["proposed", "review", "proof"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function statsToText(stats: InitiativeStat[] = []) {
  return stats.map((stat) => `${stat.value} | ${stat.label}`).join("\n");
}

function textToStats(value: string): InitiativeStat[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [statValue, ...labelParts] = line.split("|");
      return {
        value: statValue.trim(),
        label: labelParts.join("|").trim(),
      };
    })
    .filter((stat) => stat.value && stat.label);
}

export default function InitiativesForm({ initialData }: { initialData: Initiative[] }) {
  const [items, setItems] = useState<Initiative[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const update = <K extends keyof Initiative>(idx: number, field: K, value: Initiative[K]) =>
    setItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });

  const move = (idx: number, dir: -1 | 1) =>
    setItems((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });

  const add = () =>
    setItems((prev) => [
      ...prev,
      {
        slug: `initiative-${Date.now()}`,
        title: "",
        shortName: "",
        status: "",
        statusTone: "proposed",
        description: "",
        stats: [],
        note: "",
      },
    ]);

  const remove = async (idx: number) => {
    const previousItems = items;
    const nextItems = previousItems.filter((_, i) => i !== idx);

    setItems(nextItems);
    setLoading(true);
    setMessage(null);

    try {
      const res = await saveInitiativesAction(nextItems);
      if (res.success) {
        setMessage({ type: "success", text: "Initiative removed and saved." });
      } else {
        setItems(previousItems);
        setMessage({ type: "error", text: res.error || "Save failed." });
      }
    } catch (error) {
      setItems(previousItems);
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Error saving.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await saveInitiativesAction(items);
      setMessage(
        res.success
          ? { type: "success", text: "Initiatives saved!" }
          : { type: "error", text: res.error || "Save failed." }
      );
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Error saving.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className={`rounded-xl px-5 py-4 border text-sm ${message.type === "success" ? "bg-forest-light/60 border-forest/20 text-navy" : "bg-sand/10 border-sand-dark/25 text-sand-dark"}`}>
          <p className="font-semibold">{message.type === "success" ? "Saved" : "Error"}</p>
          <p className="mt-0.5">{message.text}</p>
        </div>
      )}
      {items.map((item, idx) => (
        <div key={`${item.slug}-${idx}`} className="bg-white border border-line rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-stat uppercase tracking-wider text-ink/50">Initiative {idx + 1}</span>
            <div className="flex items-center gap-2">
              {([
                [-1, ChevronUp],
                [1, ChevronDown],
              ] satisfies Array<[dir: -1 | 1, Icon: LucideIcon]>).map(([dir, Icon]) => (
                <button key={dir} type="button" onClick={() => move(idx, dir)}
                  disabled={dir === -1 ? idx === 0 : idx === items.length - 1}
                  className="h-8 w-8 flex items-center justify-center rounded-lg border border-line text-ink/50 hover:text-navy disabled:opacity-30 transition-colors"
                  aria-label={dir === -1 ? "Move initiative up" : "Move initiative down"}>
                  <Icon size={14} />
                </button>
              ))}
              <button type="button" onClick={() => void remove(idx)} disabled={loading}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-line text-rose-400 hover:bg-rose-50 transition-colors"
                aria-label="Remove initiative">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Title</label>
              <input type="text" value={item.title} onChange={(e) => {
                const title = e.target.value;
                update(idx, "title", title);
                if (!item.slug || item.slug.startsWith("initiative-")) update(idx, "slug", slugify(title));
              }} className={inputCls} /></div>
            <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Short Name</label>
              <input type="text" value={item.shortName} onChange={(e) => update(idx, "shortName", e.target.value)} className={inputCls} /></div>
            <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Slug</label>
              <input type="text" value={item.slug} onChange={(e) => update(idx, "slug", slugify(e.target.value))} className={inputCls} /></div>
            <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Status Tone</label>
              <select value={item.statusTone} onChange={(e) => update(idx, "statusTone", e.target.value as Initiative["statusTone"])} className={inputCls}>
                {statusTones.map((tone) => <option key={tone} value={tone}>{tone}</option>)}
              </select></div>
            <div className="sm:col-span-2"><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Status Text</label>
              <input type="text" value={item.status} onChange={(e) => update(idx, "status", e.target.value)} className={inputCls} /></div>
            <div className="sm:col-span-2"><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Description</label>
              <textarea rows={4} value={item.description} onChange={(e) => update(idx, "description", e.target.value)} className={inputCls} /></div>
            <div className="sm:col-span-2"><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Stats</label>
              <textarea rows={4} value={statsToText(item.stats)} onChange={(e) => update(idx, "stats", textToStats(e.target.value))} className={inputCls} /></div>
            <div className="sm:col-span-2"><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Note</label>
              <textarea rows={3} value={item.note ?? ""} onChange={(e) => update(idx, "note", e.target.value)} className={inputCls} /></div>
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-dark">
        <Plus size={15} /> Add Initiative
      </button>
      <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save All Initiatives"}</Button>
    </form>
  );
}
