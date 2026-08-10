"use client";

import { useState } from "react";
import { saveInitiativesAction } from "@/app/actions/admin";
import Button from "@/components/ui/Button";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface Initiative {
  id: string;
  title: string;
  school: string;
  description: string;
  status: string;
  year: string;
  tags: string[];
}

export default function InitiativesForm({ initialData }: { initialData: Initiative[] }) {
  const [items, setItems] = useState<Initiative[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const update = (idx: number, field: keyof Initiative, value: string | string[]) =>
    setItems((prev) => { const n = [...prev]; n[idx] = { ...n[idx], [field]: value }; return n; });

  const move = (idx: number, dir: -1 | 1) =>
    setItems((prev) => { const n = [...prev]; const t = idx + dir; if (t < 0 || t >= n.length) return prev; [n[idx], n[t]] = [n[t], n[idx]]; return n; });

  const add = () => setItems((prev) => [...prev, { id: `init-${Date.now()}`, title: "", school: "", description: "", status: "proposed", year: new Date().getFullYear().toString(), tags: [] }]);
  const remove = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await saveInitiativesAction(items as any);
      setMessage(res.success ? { type: "success", text: "Initiatives saved!" } : { type: "error", text: "Save failed." });
    } catch { setMessage({ type: "error", text: "Error saving." }); }
    finally { setLoading(false); }
  };

  const inputCls = "block w-full rounded-lg border border-line bg-cream/20 px-3.5 py-2 text-sm text-navy focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className={`rounded-xl px-5 py-4 border text-sm ${message.type === "success" ? "bg-forest-light/60 border-forest/20 text-navy" : "bg-sand/10 border-sand-dark/25 text-sand-dark"}`}>
          <p className="font-semibold">{message.type === "success" ? "✓ Saved" : "Error"}</p>
          <p className="mt-0.5">{message.text}</p>
        </div>
      )}
      {items.map((item, idx) => (
        <div key={item.id} className="bg-white border border-line rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-stat uppercase tracking-wider text-ink/50">Initiative {idx + 1}</span>
            <div className="flex items-center gap-2">
              {[[-1, ChevronUp], [1, ChevronDown]].map(([dir, Icon]: any) => (
                <button key={dir} type="button" onClick={() => move(idx, dir as -1|1)}
                  disabled={dir === -1 ? idx === 0 : idx === items.length - 1}
                  className="h-8 w-8 flex items-center justify-center rounded-lg border border-line text-ink/50 hover:text-navy disabled:opacity-30 transition-colors">
                  <Icon size={14} />
                </button>
              ))}
              <button type="button" onClick={() => remove(idx)}
                className="h-8 w-8 flex items-center justify-center rounded-lg border border-line text-rose-400 hover:bg-rose-50 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Title</label>
              <input type="text" value={item.title} onChange={(e) => update(idx, "title", e.target.value)} className={inputCls} /></div>
            <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">School / Location</label>
              <input type="text" value={item.school} onChange={(e) => update(idx, "school", e.target.value)} className={inputCls} /></div>
            <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Status (proposed/active/completed)</label>
              <select value={item.status} onChange={(e) => update(idx, "status", e.target.value)} className={inputCls}>
                <option value="proposed">Proposed</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select></div>
            <div><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Year</label>
              <input type="text" value={item.year} onChange={(e) => update(idx, "year", e.target.value)} className={inputCls} /></div>
            <div className="sm:col-span-2"><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Description</label>
              <textarea rows={3} value={item.description} onChange={(e) => update(idx, "description", e.target.value)} className={inputCls} /></div>
            <div className="sm:col-span-2"><label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1">Tags (comma-separated)</label>
              <input type="text" value={item.tags.join(", ")} onChange={(e) => update(idx, "tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))} className={inputCls} /></div>
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-dark">
        <Plus size={15} /> Add Initiative
      </button>
      <Button type="submit" disabled={loading}>{loading ? "Saving…" : "Save All Initiatives"}</Button>
    </form>
  );
}
